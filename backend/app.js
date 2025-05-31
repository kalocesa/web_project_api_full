const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
  });

// Utilizar rutas
app.use(express.json());

// Importar rutas
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login, getUserById } = require("./controllers/users");

app.post("/signup", createUser);
app.post("/signin", login);

//autorización
app.use(auth);
app.use("/users", usersRouter);

app.get("/users/me", auth, getUserById);
app.use("/cards", auth, cardsRouter);

// Manejar rutas no existentes
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

//Middleware para errores.
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
