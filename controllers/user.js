const user = require("../models/user");
const { INVALID_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  user
    .create({ name, avatar })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === INVALID_REQUEST.name || e.name === "CastError") {
        res
          .status(INVALID_REQUEST.code)
          .send({ message: INVALID_REQUEST.message });
      } else {
        res.status(SERVER_ERROR.code).send({ message: SERVER_ERROR.message });
      }
    });
};

const getAllUsers = (req, res) => {
  user
    .find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      res.status(SERVER_ERROR.code).send({ message: SERVER_ERROR.message });
    });
};

const getUser = (req, res) => {
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

module.exports = {
  createUser,
  getAllUsers,
  getUser,
};
