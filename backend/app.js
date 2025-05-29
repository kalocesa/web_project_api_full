const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const auth = require("./middleware/auth");

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
  });

// Importar rutas
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login, getUserById } = require("./controllers/users");

// Utilizar rutas
app.use(express.json());

app.post("/signup", createUser);
app.post("/signin", login);

//autorización
app.use(auth);
app.use("/users", usersRouter);
app.get("/users/me", auth, getUserById);
app.use("/cards", auth, cardsRouter);

// Manejar rutas no existentes
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
