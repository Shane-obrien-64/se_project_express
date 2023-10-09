const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const { validateUserUpdate } = require("../middlewares/validation");
const { getCurrentUser, updateProfile } = require("../controllers/user");

router.use(auth);

router.get("/me", getCurrentUser);
router.patch("/me", validateUserUpdate, updateProfile);

module.exports = router;
