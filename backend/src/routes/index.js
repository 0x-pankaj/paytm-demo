

const {Router} = require("express");

const router  = Router();
const userRouter = require("./user.route");
const balanceRouter = require("./balance.route");

router.use("/user", userRouter);

router.use("/account", balanceRouter );



module.exports = router;