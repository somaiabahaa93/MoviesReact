import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./mediaSlice";

let store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export default store;
