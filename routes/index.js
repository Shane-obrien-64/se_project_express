const router = require("express").Router();
const ClothingItem = require("./clothingItem");
const user = require("./user");

router.use("/items", ClothingItem);
router.use("/users", user);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
