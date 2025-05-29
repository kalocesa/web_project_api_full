const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

//ruta de todos los usuarios
router.get("/", getAllUsers);

//ruta de usuario por id
router.get("/:id", getUserById);

//ruta para actualizar un usuario (name, about)
router.patch("/:id", updateUser);

//ruta para actualizar un avatar del usuario
router.patch("/:id/avatar", updateAvatar);

//ruta para eliminar un usuario
router.delete("/:id", deleteUser);

module.exports = router;
