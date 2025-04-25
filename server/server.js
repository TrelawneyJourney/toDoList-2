//defino puerto
const PORT = process.env.PORT ?? 8000;
//importar express
const express = require("express");
//creo la app
const app = express();
const pool = require("./db/db");
const cors = require("cors");

app.use(cors());

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

//inicio el servidor
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
