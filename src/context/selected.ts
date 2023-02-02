import React, { createContext } from "react";

interface ISelected {
  folder: string;
  secret: string;
}

export interface IAction {
  type: "SELECT_FOLDER" | "SELECT_SECRET";
  payload: string;
}

interface IContextType {
  selected: ISelected;
  dispatchSelected: React.Dispatch<IAction>;
}

const initialState: ISelected = { folder: "", secret: "" };

const selectedReducer = (state: ISelected, action: IAction) => {
  switch (action.type) {
    case "SELECT_FOLDER":
      return { ...state, folder: action.payload };

    case "SELECT_SECRET":
      return { ...state, secret: action.payload };
    default:
      return state;
  }
};

const SelectedContext = createContext<IContextType>({
  selected: initialState,
  dispatchSelected: () => null,
});

export { SelectedContext, selectedReducer, ISelected, initialState };
