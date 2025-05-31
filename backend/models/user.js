const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(v);
      },
      message: (props) => `${props.value} no es una URL valida`,
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} no es un email válido`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

// estamos añadiendo los métodos findUserByCredentials al esquema User
// tendrá dos parámetros, email y password
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Email o contraseña incorrectos"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Email o contraseña incorrectos"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
