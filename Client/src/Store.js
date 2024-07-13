import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./ReduxToolKit/authSlice";
import todoSlice from "./ReduxToolKit/todoSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
    todo: todoSlice,
  },
});

export default store;
