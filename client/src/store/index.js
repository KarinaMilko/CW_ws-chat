import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { initSocket } from "../api";

const store = configureStore({ reducer: rootReducer });

initSocket(store);

export default store;
