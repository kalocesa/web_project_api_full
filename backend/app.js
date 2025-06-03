const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");
const app = express();
const port = 3000;
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("cors");

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

app.use(cors());
app.options("*", cors());
// Importar rutas
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login, getUserById } = require("./controllers/users");

app.use(requestLogger);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
    }),
  }),
  createUser
);
app.post("/signin", login);

// autorización
app.use(auth);
app.use("/users", usersRouter);

app.get("/users/me", auth, getUserById);
app.use("/cards", auth, cardsRouter);

// Manejar rutas no existentes
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

//logger de errores
app.use(errorLogger);

// Middleware para errores.
app.use(errors());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
