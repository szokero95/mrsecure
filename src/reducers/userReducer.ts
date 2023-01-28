import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user";

const initialState: IUser = {
  displayName: "",
  uid: "",
  email: "",
  photoURL: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => (state = action.payload),
    resetUser: (state) => (state = initialState),
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
