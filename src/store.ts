import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import secretReducer from "./reducers/secretReducer";
import folderReducer from "./reducers/folderReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    secrets: secretReducer,
    folders: folderReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
