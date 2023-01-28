import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFolder } from "../interfaces/folder";

const initialState: IFolder[] = [];

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setAllFolders: (state, action: PayloadAction<IFolder[]>) =>
      (state = action.payload),
    addFolder: (state, action: PayloadAction<IFolder>) =>
      (state = [...state, action.payload]),
    removeFolder: (state, action: PayloadAction<string>) =>
      (state = state.filter((folder) => folder.id !== action.payload)),
    modifyFolder: (state, action: PayloadAction<IFolder>) =>
      (state = state.map((folder) =>
        folder.id === action.payload.id ? action.payload : folder
      )),
  },
});

export const { setAllFolders, addFolder, removeFolder, modifyFolder } =
  folderSlice.actions;
export default folderSlice.reducer;
