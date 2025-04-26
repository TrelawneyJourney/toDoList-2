//defino puerto
const PORT = process.env.PORT ?? 8000;
//importar express
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
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
app.post("/todos", (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);
  const id = uuidv4();

  try {
    pool.query(
      `INSERT INTO todos(id, user_email, title, progress, date) VALUES ($1,$2,$3,$4,$5)`,
      [id, user_email, title, progress, date]
    );
  } catch (error) {
    console.error(error);
  }
});

//inicio el servidor
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
