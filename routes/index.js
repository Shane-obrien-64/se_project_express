const router = require("express").Router();
const clothingItem = require("./clothingItem");
const user = require("./user");
const { createUser, login } = require("../controllers/user");
const NotFoundError = require("../errors/not-found-error");
const { validateUser, validateLogin } = require("../middlewares/validation");

router.use("/items", clothingItem);
router.use("/users", user);

router.post("/signin", validateLogin, login);
router.post("/signup", validateUser, createUser);

router.use((req, res, next) => {
  const err = new NotFoundError("Route not found");
  next(err);
});

module.exports = router;
