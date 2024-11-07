import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { ws } from "../api";

const store = configureStore({ reducer: rootReducer });

ws.initSocket(store);

export default store;
