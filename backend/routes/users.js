const users = require("express").Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

//ruta GET para obtener a todos los usuarios
users.get("/users", getAllUsers);

//ruta GET para obtener a un usuario registrado
users.get("/users/me", (req, res, next) =>
  getUser({ ...req, params: { id: req.user._id } }, res, next)
);

//ruta GET para  obtener un usuario
users.get("/users/:id", getUser);

// ruta PATCH para actualizar un usuario (name, about)
users.patch("/users/me", updateUser);

// ruta PATCH para actualizar un avatar del usuario
users.patch("/users/me/avatar", updateAvatar);

module.exports = users;
