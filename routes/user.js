const router = require("express").Router();

const { createUser, getAllUsers, getUser } = require("../controllers/user");

// POST /users — creates a new user
router.post("/", createUser);
// GET /users — returns all users
router.get("/", getAllUsers);
// GET /users/:userId - returns a user by _id
router.get("/:userId", getUser);

module.exports = router;
