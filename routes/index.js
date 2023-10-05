const router = require("express").Router();
const clothingItem = require("./clothingItem");
const user = require("./user");
const { createUser, login } = require("../controllers/user");
const { NotFoundError } = require("../errors/not-found-error");

router.use("/items", clothingItem);
router.use("/users", user);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(NotFoundError.statusCode).send({ message: NotFoundError.message });
});

module.exports = router;
