const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getAllUsers,
  deleteUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

// ruta de todos los usuarios
router.get("/", getAllUsers);

// ruta para actualizar un usuario (name, about)
router.patch(
  "/:id",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).default("Jacques Cousteau"),
      about: Joi.string().min(2).max(30).default("Explorador"),
    }),
  }),
  updateUser
);

// ruta para actualizar un avatar del usuario
router.patch(
  "/:id/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .uri()
        .default(
          "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg"
        ),
    }),
  }),
  updateAvatar
);

// ruta para eliminar un usuario
router.delete("/:id", deleteUser);

module.exports = router;
