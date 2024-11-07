import { io } from "socket.io-client";
import {
  newMessageError,
  newMessageSuccess,
} from "../store/slices/messagesSlice";
// -------------------
const socketClient = io("ws://localhost:5000");
// socketClient.emit('connection', socketClient)
export const createMessage = (newMessage) => {
  socketClient.emit("NEW_MESSAGE", newMessage);
};
export const initSocket = (store) => {
  socketClient.on("NEW_MESSAGE_SUCCESS", (payload) => {
    store.dispatch(newMessageSuccess(payload));
  });
  socketClient.on("NEW_MESSAGE_ERROR", (payload) => {
    store.dispatch(newMessageError(payload));
  });
};
