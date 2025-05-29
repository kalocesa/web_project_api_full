const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

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

// Utilizar rutas
app.use(express.json());
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Manejar rutas no existentes
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.use((req, res, next) => {
  req.user = {
    _id: "6801d0f2e8e47dcc76afa2cd", // pega el _id del usuario de prueba que creamos en el paso anterior
  };

  next();
});
