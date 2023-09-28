const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");
const ForbiddenError = require("../errors/forbidden-error");
const NotFoundError = require("../errors/not-found-error");
// const {
//   INVALID_REQUEST,
//   NOT_FOUND,
//   SERVER_ERROR,
//   CONFLICT_ERROR,
//   AUTHORIZATION_ERROR,
// } = require("../utils/errors");

const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    user
      .create({ name, avatar, email, password: hash })
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
        if (e.name === ValidationError || e.name === "CastError") {
          next(new BadRequestError("Invaild request"));
        } else if (e.name === "MongoServerError") {
          next(new ConflictError("This email is already in use"));
        } else {
          next(e);
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
      next(new ForbiddenError("You do not have permission to access"));
    });
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;

  user
    .findById(_id)
    .orFail()
    .then((data) => res.status(200).send(data))
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
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
