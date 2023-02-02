import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISecret } from "../interfaces/secret";

const initialState: ISecret[] = [];

const secretSlice = createSlice({
  name: "secret",
  initialState,
  reducers: {
    setAllSecrets: (state, action: PayloadAction<ISecret[]>) =>
      (state = action.payload),
  },
});

export const { setAllSecrets } = secretSlice.actions;
export default secretSlice.reducer;
