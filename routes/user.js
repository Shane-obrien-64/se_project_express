const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const { getCurrentUser, updateProfile } = require("../controllers/user");

router.use(auth);

router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);

module.exports = router;
