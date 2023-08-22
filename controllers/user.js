const user = require("../models/user");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  user
    .create({ name, avatar })
    .then((item) => {
      console.log(item);
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
    .catch((e) => {
      res.status(SERVER_ERROR.code).send({ message: SERVER_ERROR.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  user
    .findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      if (e.name === INVALID_REQUEST.name || e.name === "CastError") {
        res
          .status(INVALID_REQUEST.code)
          .send({ message: INVALID_REQUEST.message });
      } else if (e.name === NOT_FOUND.name) {
        res.status(NOT_FOUND.code).send({ message: NOT_FOUND.code });
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
