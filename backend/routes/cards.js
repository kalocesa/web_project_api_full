const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const { createCardValidation } = require("../middlewares/validation");

// ruta para obtener todas las tarjetas
router.get("/", getAllCards);

// ruta para crear una tarjeta
router.post("/", createCardValidation, createCard);

// ruta para eliminar una tarjeta
router.delete(
  "/:id",
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().alphanum() }) }),
  deleteCard
);

// ruta para dar like a una tarjeta
router.put(
  "/:cardId/likes",
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().alphanum() }) }),
  likeCard
);

// ruta para dar dislike a una tarjeta
router.delete(
  "/:cardId/likes",
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().alphanum() }) }),
  dislikeCard
);

module.exports = router;
