import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import data from "../data.json";
import { Board } from "../global";

const boardsSlice = createSlice({
  name: "boards",
  initialState: data.boards,
  reducers: {
    createBoard: (state, action: PayloadAction<Omit<Board, "isActive">>) => {
      const isActive = state.length > 0 ? false : true;
      const newBoard = {
        id: action.payload.id,
        name: action.payload.name,
        columns: action.payload.columns,
        isActive: isActive,
      };
      state.push(newBoard);
    },
  },
});

export const { createBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
