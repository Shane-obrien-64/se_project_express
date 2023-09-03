const { mongo } = require("mongoose");
const user = require("../models/user");
const {
  INVALID_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  CONFLICT_ERROR,
} = require("../utils/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    user
      .create({ name: name, avatar: avatar, email: email, password: hash })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((e) => {
        console.log(e.name);
        if (e.name === INVALID_REQUEST.name || e.name === "CastError") {
          res
            .status(INVALID_REQUEST.code)
            .send({ message: INVALID_REQUEST.message });
        } else if (e.name === CONFLICT_ERROR.name) {
          res
            .status(CONFLICT_ERROR.code)
            .send({ message: CONFLICT_ERROR.message });
        } else {
          res.status(SERVER_ERROR.code).send({ message: SERVER_ERROR.message });
        }
      }),
  );
};

const login = (req, res) => {
  const { email, password } = req.body;

  return user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      res
        .status(AUTHORIZATION_ERROR.code)
        .send({ message: AUTHORIZATION_ERROR.message });
    });
};

const getCurrentUser = (req, res) => {
  const { userId } = req.params;

  user
    .findById(userId)
    .orFail()
    .then((data) => res.status(200).send(data))
    .catch((e) => {
      if (e.name === INVALID_REQUEST.name || e.name === "CastError") {
        res
          .status(INVALID_REQUEST.code)
          .send({ message: INVALID_REQUEST.message });
      } else if (e.name === NOT_FOUND.name) {
        res.status(NOT_FOUND.code).send({ message: NOT_FOUND.message });
      } else {
        res.status(SERVER_ERROR.code).send({ message: SERVER_ERROR.message });
      }
    });
};

const updateProfile = (req, res) => {
  const { userId } = req.params;

  findByIdAndUpdate(userId, req.body, { new: true, runValidators: true })
    .orFail()
    .then((data) => res.status(200).send(data))
    .catch((e) => {
      if (e.name === INVALID_REQUEST.name || e.name === "CastError") {
        res
          .status(INVALID_REQUEST.code)
          .send({ message: INVALID_REQUEST.message });
      } else if (e.name === NOT_FOUND.name) {
        res.status(NOT_FOUND.code).send({ message: NOT_FOUND.message });
      } else {
        res.status(SERVER_ERROR.code).send({ message: SERVER_ERROR.message });
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
