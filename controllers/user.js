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
      res.status(500).send({ message: "Error from createUser", e });
    });
};

const getAllUsers = (req, res) => {
  user
    .find({})
    .orFail()
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getAllUsers" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  user
    .findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      res.status(500).send({ message: "Error from getAllUsers" });
    });
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
};
