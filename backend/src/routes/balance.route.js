

const {Router} = require("express");
const { getFund, fundTransfer } = require("../controllers/accont.controller");
const authMiddleware = require("../middlewares/auth.middleware");


const router = Router();
router.use(authMiddleware);

router.route("/balance/:userId").get(getFund);

router.route("/transfer").post(fundTransfer);

module.exports = router;


