const clothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/bad-request-error");
const ForbiddenError = require("../errors/forbidden-error");
const NotFoundError = require("../errors/not-found-error");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  console.log(req.user._id);
  console.log(name, weather, imageUrl);
  clothingItem
    .create({
      name: name,
      weather: weather,
      imageUrl: imageUrl,
      owner: req.user._id,
    })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      next(new BadRequestError("Invaild request"));
    });
};

const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      next(new BadRequestError("Invaild request"));
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const { _id } = req.user;

  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== _id) {
        throw new ForbiddenError("You do not have permission to access");
      }
      return clothingItem
        .findByIdAndRemove(itemId)
        .then((data) => res.status(200).send({ data }));
    })
    .catch((e) => {
      if (e.name === "ValidationError" || e.name === "CastError") {
        next(new BadRequestError("Invaild request"));
      } else if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(e);
      }
    });
};

const likeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((item) => res.status(200).send({ item }))
    .catch((e) => {
      if (e.name === "ValidationError" || e.name === "CastError") {
        next(new BadRequestError("Invaild request"));
      } else if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(e);
      }
    });
};

const dislikeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((item) => res.status(200).send({ item }))
    .catch((e) => {
      if (e.name === "ValidationError" || e.name === "CastError") {
        next(new BadRequestError("Invaild request"));
      } else if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(e);
      }
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
