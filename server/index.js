const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");

const PORT = process.env.PORT ?? 5000;

const httpServer = http.createServer(app);

// ----------------
const cors = { origin: "*" };
const wsServer = new Server(httpServer, { cors });

wsServer.on("connection", (socket) => {
  console.log("Connection established");

  // надіслати новому під'єднаному сокету привітання
  socket.emit("HELLO_TO_ME");

  // сповіщення про те, що під'єднався новий учасник
  socket.broadcast.emit("NEW_PARTICIPANT");

  // сповістити всіх, що чат закінчує роботу
  wsServer.emit("CHAT_WILL_CLOSED");

  wsServer.on("SEND_TO_SERVER", (message) => {
    console.log("From client:", message);
  });
});
// --------------

httpServer.listen(PORT, () => {
  console.log(`Server is running!`);
});
