const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const { getCurrentUser, updateProfile } = require("../controllers/user");

router.get("/me", auth, getCurrentUser);

router.patch("/me", auth, updateProfile);

module.exports = router;
