const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const {
  INVALID_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  CONFLICT_ERROR,
  AUTHORIZATION_ERROR,
} = require("../utils/errors");

const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    user
      .create({ name: name, avatar: avatar, email: email, password: hash })
      .then((item) => {
        const userData = {
          data: {
            name: item.name,
            avatar: item.avatar,
            email: item.email,
          },
        };
        res.send(userData);
      })
      .catch((e) => {
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

  user
    .findUserByCredentials(email, password)
    .then((data) => {
      const token = jwt.sign({ _id: data._id }, JWT_SECRET, {
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
  const { _id } = req.user;

  user
    .findById(_id)
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
  const { _id } = req.user;
  const { name, avatar } = req.body;

  user
    .findByIdAndUpdate(
      _id,
      { name, avatar },
      { new: true, runValidators: true },
    )
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
