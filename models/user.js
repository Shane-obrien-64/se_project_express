const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Invalid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: "Invalid Email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

user.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((data) => {
      if (!data) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, data.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return data;
      });
    });
};

module.exports = mongoose.model("users", user);
