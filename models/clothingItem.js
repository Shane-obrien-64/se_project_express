const mongoose = require("mongoose");
const validator = require("validator");

const ClothingItem = new mongoose.Schema({
  name: {
    type: String,
    reqired: true,
  },
  weather: {
    type: String,
    reqired: true,
  },
  imageUrl: {
    type: String,
    reqired: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not valid",
    },
  },
});

module.exports = mongoose.model("clothingItems", ClothingItem);
