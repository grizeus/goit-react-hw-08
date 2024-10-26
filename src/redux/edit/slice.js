import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  name: "",
  number: "",
  isEditing: false,
};

const editSlice = createSlice({
  name: "edit",
  initialState: INITIAL_STATE,
  reducers: {
    updateEditedName: (state, action) => {
      state.name = action.payload.name;
    },
    updateEditedNumber: (state, action) => {
      state.number = action.payload.number;
      },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
});

export const { updateEditedName, updateEditedNumber, setEditing } = editSlice.actions;

export default editSlice.reducer;
