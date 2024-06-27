
const { Router } = require("express");

const {signup, signin, updateUser, changePassword, bulkUser} = require("../controllers/user.controller")
const authHeader = require("../middlewares/auth.middleware");

const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/update").put(authHeader, updateUser);
router.route("/change-password").put(changePassword);
router.route("/bulk").get(bulkUser);

module.exports = router;