const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, "El nombre de la tarjeta es requerido"],
  },
  link: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(v);
      },
      message: (props) => `${props.value} no es un URL valido`,
    },
    required: [true, "El link de la tarjeta es requerido"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "El autor de la tarjeta es requerido"],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
