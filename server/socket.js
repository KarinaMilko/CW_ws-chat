const { Server } = require("socket.io");
const { Message } = require("./models");
const {
  SOCKET_SERVER_EVENTS: {
    NEW_MESSAGE,
    NEW_MESSAGE_SUCCESS,
    NEW_MESSAGE_ERROR,
    DELETE_MESSAGE,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_ERROR,
  },
} = require("./constants");

const cors = { origin: "*" };

function initSocket(httpServer) {
  const wsServer = new Server(httpServer, { cors });

  wsServer.on("connection", (socket) => {
    console.log("Connection established");

    socket.on(NEW_MESSAGE, async (payload) => {
      try {
        // закинути повідомлення в базу
        const createdMessage = await Message.create(payload);
        // успіх - відправити повідомлення всім
        wsServer.emit(NEW_MESSAGE_SUCCESS, createdMessage);
      } catch (error) {
        // помилка - відправити помилку собі
        socket.emit(NEW_MESSAGE_ERROR, error);
      }
    });

    socket.on(DELETE_MESSAGE, async (payload) => {
      try {
        await Message.findByIdAndDelete(payload);
        wsServer.emit(DELETE_MESSAGE_SUCCESS, payload);
      } catch (error) {
        socket.emit(DELETE_MESSAGE_ERROR, error);
      }
    });
  });
}

module.exports = initSocket;
