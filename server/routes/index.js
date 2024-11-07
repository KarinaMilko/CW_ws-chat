const { Router } = require("express");
const messageRouter = require("./messageRouter");

const router = Router();

router.use("/messages", messageRouter);

module.exports = router;
