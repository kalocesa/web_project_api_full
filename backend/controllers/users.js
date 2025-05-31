const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

// Obtener todos los usuarios
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener a los usuarios', error });
  }
};

// Obtener un usuario por ID
module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      throw new NotFoundError('No se encontró ningún usuario con ese ID');
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Crear un nuevo usuario
module.exports.createUser = async (req, res) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    const saveNewUser = await newUser.save();
    res.status(201).json(saveNewUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// actualizar un usuario
module.exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, about } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => {
      throw new NotFoundError('No se encontró ningún usuario con ese ID');
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// actualizar el avatar de un usuario
module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { avatar } = req.body;
    const updateAvatar = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => {
      throw new NotFoundError('No se encontró ningún usuario con ese ID');
    });
    res.json(updateAvatar);
  } catch (error) {
    next(error);
  }
};

// Eliminar un usuario por su ID
module.exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.deleteOne();
    if (user.deletedCount === 0) {
      throw new NotFoundError('No se encontró ningún usuario con ese ID');
    }
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    next(error);
  }
};

// Controlador de autenticación:
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      res.send(token);
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
