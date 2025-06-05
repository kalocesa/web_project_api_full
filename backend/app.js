// 1. Importaciones y configuración inicial
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
require("dotenv").config();
const cors = require("cors");
const auth = require("./middlewares/auth");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/users");
const app = express();
const { PORT = 3000 } = process.env;
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const allowedOrigins = [
  "http://localhost:3001",
  "https://aroundmx.mooo.com",
  "https://api.aroundmx.mooo.com",
  "https://www.aroundmx.mooo.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(
        new Error("CORS policy does not allow access from this origin"),
        false
      );
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use((req, res, next) => {
  console.log(req);
  next();
});

app.use(express.json()); // Para manejar JSON correctamente

mongoose
  .connect("mongodb://127.0.0.1:27017/aroundb")
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

//app.use(cors(corsOptions)); // Aplicar CORS
app.use(cors());
app.options("*", cors());
app.use(requestLogger); // Log de cada petición

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post("/signin", login); // La ruta de login debe estar **antes** del middleware de autenticación
app.post("/signup", createUser);

// 9. Rutas protegidas (Requieren autenticación)
app.use("/", auth, usersRouter);
app.use("/cards", auth, cardsRouter);

// 10. Manejo de errores y respuestas uniformes
app.use(errorLogger);
app.use(errors()); // Manejo de errores de Celebrate
app.use(errorHandler);

// 11. Manejo de rutas inexistentes (Debe estar al final)
app.use((req, res, next) => {
  const error = new Error("Recurso solicitado no encontrado");
  error.statusCode = 404;
  next(error);
});

// 12. Inicio del servidor
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
