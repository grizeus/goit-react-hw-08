import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  name: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: INITIAL_STATE,
  reducers: {
    changeFilter: (_, action) => {
      return action.payload;
    },
    selectNameFilter: state => {
      return state.name;
    },
  },
});

export const { changeFilter, selectNameFilter } = filtersSlice.actions;

export default filtersSlice.reducer;