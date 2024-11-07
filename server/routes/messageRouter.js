const { Router } = require("express");
const { messageController } = require("../controllers");

const messageRouter = Router();

messageRouter.get("/", messageController.getMessages);

// messageRouter.post("/", messageController.createMessage);

module.exports = messageRouter;
