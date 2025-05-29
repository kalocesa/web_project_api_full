const Card = require("../models/card");

// Obtener todas las tarjetas
module.exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tarjetas", error });
  }
};

//Obtener una tarjeta por su ID
module.exports.getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = 404;
      throw error;
    });
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener al usuario", error });
  }
};

// Crear una tarjeta
module.exports.createCard = async (req, res) => {
  try {
    const { name, link, owner } = req.body;
    if (!name || !link || !owner) {
      return res.status(400).json({
        message: "La solicitud no se puede procesar porque faltan elementos",
      });
    }
    const newCard = new Card({ name, link, owner });
    const newCardSave = await newCard.save();
    res.status(201).json(newCardSave);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la tarjeta", error: error.message });
  }
};

//Dar like a una tarjeta
module.exports.likeCard = async (req, res) => {
  const userId = "6801d0f2e8e47dcc76afa2cd";
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true }
    ).orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    });
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({
      message: "Error al dar like a la tarjeta",
      error: error.message,
    });
  }
};

//Dar dislike a una tarjeta
module.exports.dislikeCard = async (req, res) => {
  const userId = "6801d0f2e8e47dcc76afa2cd";
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } },
      { new: true }
    ).orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    });
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({
      message: "Error al quitar like de la tarjeta",
      error: error.message,
    });
  }
};

// Eliminar una tarjeta
module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.deleteOne({ _id: req.params.id });
    if (card.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Error al encontrar la tarjeta", error });
    }
    res.status(200).json({ message: "Tarjeta eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tarjeta", error });
  }
};
