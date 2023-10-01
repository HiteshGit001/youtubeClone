import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import videoDetailsSlice from "./slice/videoDetailsSlice";
import searchSlice from "./slice/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    videoDetails: videoDetailsSlice,
    search: searchSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;