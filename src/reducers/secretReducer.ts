import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISecret } from "../interfaces/secret";

const initialState: ISecret[] = [];

const secretSlice = createSlice({
  name: "secret",
  initialState,
  reducers: {
    setAllSecrets: (state, action: PayloadAction<ISecret[]>) =>
      (state = action.payload),
    addSecret: (state, action: PayloadAction<ISecret>) =>
      (state = [...state, action.payload]),
    removeSecret: (state, action: PayloadAction<string>) =>
      (state = state.filter((secret) => secret.id !== action.payload)),
    modifySecret: (state, action: PayloadAction<ISecret>) =>
      (state = state.map((secret) =>
        secret.id === action.payload.id ? action.payload : secret
      )),
    removeFolderId: (state, action: PayloadAction<string>) =>
      (state = state.map((secret) => {
        return secret.folderId === action.payload
          ? { ...secret, folderId: null }
          : secret;
      })),
  },
});

export const {
  setAllSecrets,
  addSecret,
  modifySecret,
  removeSecret,
  removeFolderId,
} = secretSlice.actions;
export default secretSlice.reducer;
