const Card = require("../models/card");
const NotFoundError = require("../errors/not-found-err");

// Obtener todas las tarjetas
module.exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tarjetas", error });
  }
};

// Obtener una tarjeta por su ID
module.exports.getCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id).orFail(() => {
      throw new NotFoundError("No se encontró ningún usuario con ese ID");
    });
    return res.json(card);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Error al obtener la tarjeta" });
  }
};

// Crear una tarjeta
module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    if (!name || !link) {
      return res.status(400).json({
        message: "La solicitud no se puede procesar porque faltan elementos",
      });
    }
    const newCard = new Card({ name, link, owner: req.user._id });
    const newCardSave = await newCard.save();
    return res.status(201).json(newCardSave);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Error al obtener la tarjeta" });
  }
};

// Dar like a una tarjeta
module.exports.likeCard = async (req, res) => {
  try {
    console.log("Ruta recibida en el backend:", req.originalUrl);
    console.log("Parámetros recibidos en el backend:", req.params);
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail(() => handlerError());

    res.send(card);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .send({ message: err.message || "Error interno del servidor" });
  }
};

// Dar dislike a una tarjeta
module.exports.dislikeCard = async (req, res) => {
  console.log("Datos recibidos en req.params:", req.params);
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail(() => handlerError());

    res.send(card);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ message: err.message });
    } else if (err.statusCode === 404) {
      res.status(404).send({ message: err.message });
    } else {
      res
        .status(500)
        .send({ message: err.message || "error interno del servidor" });
    }
  }
};

// Eliminar una tarjeta
module.exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const card = await Card.findById(id).orFail();

    if (card.owner.toString() !== userId) {
      throw new Error("No puedes borrar tarjetas de otros usuarios");
    }

    const deletedCard = await Card.findByIdAndDelete(id);
    res.status(200).json(deletedCard);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ message: err.message });
    } else if (err.statusCode === 404) {
      res.status(404).json({ message: err.message });
    } else if (err.statusCode === 403) {
      res.status(403).json({ message: err.message });
    } else {
      res
        .status(500)
        .json({ message: err.message || "Error interno del servidor" });
    }
  }
};
