import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import chatReducer from "./slices/chatSlice";
const reducer = {
  auth: authReducer,
  chat: chatReducer,
};

export const store = configureStore({
  reducer: reducer,
});
