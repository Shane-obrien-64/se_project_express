const router = require("express").Router();
const clothingItem = require("./clothingItem");
const user = require("./user");
const { createUser, login } = require("../controllers/user");
const { NOT_FOUND } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", user);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(NOT_FOUND.code).send({ message: NOT_FOUND.message });
});

module.exports = router;
