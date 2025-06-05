const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require("../errors/not-found-err");

// Obtener todos los usuarios
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Obtener un usuario por ID
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      throw new NotFoundError("No se encontró ningún usuario con ese ID");
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Crear un nuevo usuario
module.exports.createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
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
    next(error);
  }
};

// actualizar un usuario
module.exports.updateUser = async (req, res, next) => {
  try {
    console.log("ID recibido:", req.params.id);
    const userId = req.user._id;
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    ).orFail(() => {
      throw new NotFoundError("No se encontró ningún usuario con ese ID");
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// actualizar el avatar de un usuario
module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;

    const updateAvatar = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true }
    ).orFail(() => {
      throw new NotFoundError("No se encontró ningún usuario con ese ID");
    });

    res.json(updateAvatar);
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("Correo electrónico o contraseña incorrectos");
      error.statusCode = 401;
      throw error;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const error = new Error("Correo electrónico o contraseña incorrectos");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
      { expiresIn: "7d" }
    );
    res.send({ token });
  } catch (err) {
    next(err);
  }
};
