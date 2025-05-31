const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

// Obtener todas las tarjetas
module.exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tarjetas', error });
  }
};

// Obtener una tarjeta por su ID
module.exports.getCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id).orFail(() => {
      throw new NotFoundError('No se encontró ningún usuario con ese ID');
    });
    return res.json(card);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: 'Error al obtener la tarjeta' });
  }
};

// Crear una tarjeta
module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    if (!name || !link) {
      return res.status(400).json({
        message: 'La solicitud no se puede procesar porque faltan elementos',
      });
    }
    const newCard = new Card({ name, link, owner: req.user._id });
    const newCardSave = await newCard.save();
    return res.status(201).json(newCardSave);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: 'Error al obtener la tarjeta' });
  }
};

// Dar like a una tarjeta
module.exports.likeCard = async (req, res, next) => {
  const userId = '6801d0f2e8e47dcc76afa2cd';
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail(() => {
      throw new NotFoundError('No se encontró ningún usuario con ese ID');
    });
    res.json(updatedCard);
  } catch (error) {
    next(error);
  }
};

// Dar dislike a una tarjeta
module.exports.dislikeCard = async (req, res) => {
  const userId = '6801d0f2e8e47dcc76afa2cd';
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).orFail(() => {
      throw new NotFoundError('No se encontró ningún usuario con ese ID');
    });
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({
      message: 'Error al quitar like de la tarjeta',
      error: error.message,
    });
  }
};

// Eliminar una tarjeta
module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.deleteOne({ _id: req.params.id });
    if (card.deletedCount === 0) {
      throw new NotFoundError('No se encontró ningún usuario con ese ID');
    }
    res.status(200).json({ message: 'Tarjeta eliminada' });
  } catch (error) {
    next(error);
  }
};
