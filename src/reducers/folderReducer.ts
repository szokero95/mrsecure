import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFolder } from "../interfaces/folder";

const initialState: IFolder[] = [];

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setAllFolders: (state, action: PayloadAction<IFolder[]>) =>
      (state = action.payload),
  },
});

export const { setAllFolders } = folderSlice.actions;
export default folderSlice.reducer;
