const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Obtener todos los usuarios
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener a los usuarios", error });
  }
};

//Obtener un usuario por ID
module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "No se ha encontrado ningún usuario con ese ID" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

//Crear un nuevo usuario
module.exports.createUser = async (req, res) => {
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
    res.status(400).json({ message: error.message });
  }
};

//actualizar un usuario
module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, about } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar al usuario", error });
  }
};

//actualizar el avatar de un usuario
module.exports.updateAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const { avatar } = req.body;
    const updateAvatar = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    });
    res.json(updateAvatar);
  } catch (error) {
    res.status(500).json({ message: "Error al actulizar al usuario", error });
  }
};

// Eliminar un usuario por su ID
module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne();
    if (user.deletedCount === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener al usuario", error });
  }
};

//Controlador de autenticación:
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      res.send(token);
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
