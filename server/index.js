const http = require("http");
const app = require("./app");

const initSocket = require("./socket");

const PORT = process.env.PORT ?? 5000;

const httpServer = http.createServer(app);

initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running!`);
});
