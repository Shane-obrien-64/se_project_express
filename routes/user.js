const router = require("express").Router();

const { createUser, getAllUsers, getUser } = require("../controllers/user");

router.post("/", createUser);

router.get("/", getAllUsers);

router.get("/:userId", getUser);

module.exports = router;
