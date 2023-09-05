const ClothingItem = require("../models/clothingItem");
const {
  INVALID_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  ACCESS_DENIED,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
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

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      res.status(SERVER_ERROR.code).send({ message: SERVER_ERROR.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const { _id } = req.user;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== _id) {
        return res
          .status(ACCESS_DENIED.code)
          .send({ message: ACCESS_DENIED.code });
      }

      return ClothingItem.findByIdAndRemove(itemId).then((data) =>
        res.status(200).send({ data }),
      );
    })
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

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ item }))
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

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ item }))
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

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
