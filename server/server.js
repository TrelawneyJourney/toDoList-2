//defino puerto
const PORT = process.env.PORT ?? 8000;
//importar express
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//creo la app
const app = express();
const pool = require("./db/db");

app.use(cors());
app.use(express.json());

//ruta de prueba
app.get("/", (req, res) => {
  res.send("Hello!");
});

//get all todos
app.get("/todos/:userEmail", async (req, res) => {
  try {
    console.log(req);
    const { userEmail } = req.params;
    // const todos = await pool.query("SELECT * FROM todos");
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    console.log(todos.rows);
    res.json(todos.rows);
  } catch (err) {
    console.log("ERROR EN /TODOS:", err);
    res.status(500).json({ error: err.message });
  }
});

//create a new todo
app.post("/todos", async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);
  const id = uuidv4();

  try {
    const newTodo = await pool.query(
      `INSERT INTO todos(id, user_email, title, progress, date) VALUES ($1,$2,$3,$4,$5)`,
      [id, user_email, title, progress, date]
    );
    res.json(newTodo);
  } catch (error) {
    console.error(error);
  }
});

//edit todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const editTodo = await pool.query(
      "UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;",
      [user_email, title, progress, date, id]
    );
    res.json(editTodo);
  } catch (error) {
    console.error(error);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = await pool.query("DELETE FROM todos WHERE id = $1;", [
      id,
    ]);
    res.json(deleteTodo);
  } catch (error) {
    console.error(error);
  }
});

//endpoint signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const signUp = await pool.query(
      ` INSERT INTO users (email, hashed_password) VALUES ($1, $2)`,
      [email, hashedPassword]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    //mando para el fronted
    res.json({ email, token });
  } catch (error) {
    console.error(error);
    if (error) {
      res.json({ detail: error.detail });
    }
  }
});

//endpoint login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (!users.rows.length) return res.json({ detail: "User does not exist!" });

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    if (success) {
      res.json({ email: users.rows[0].email, token });
    } else {
      res.json({ detail: "Login failed" });
    }
  } catch (error) {
    console.error(error);
  }
});

//inicio el servidor
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
