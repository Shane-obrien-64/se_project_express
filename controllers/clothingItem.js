const ClothingItem = require("../models/clothingItem");
const { INVALID_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
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

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      res.status(SERVER_ERROR.code).send({ message: SERVER_ERROR.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndRemove(itemId)
    .orFail()
    .then(() => res.status(200).send({}))
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

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then(() => res.status(200).send({}))
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

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then(() => res.status(200).send({}))
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

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
