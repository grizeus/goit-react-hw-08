import { createSlice } from "@reduxjs/toolkit";
import INITIAL_STATE from "../data/contacts.json";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: { items: INITIAL_STATE },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const selectContacts = state => state.contacts.items;
export const { addContact, deleteContact } =
  contactsSlice.actions;

export default contactsSlice.reducer;
