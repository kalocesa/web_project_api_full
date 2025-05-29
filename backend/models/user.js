const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, `El nombre del usuario es requerido`],
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, `El acerca del usuario es requerido`],
  },
  avatar: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(v);
      },
      message: (props) => `${props.value} no es una URL valida`,
    },
    required: [true, `El avatar del usuario es requerido`],
  },
});

module.exports = mongoose.model("user", userSchema);
