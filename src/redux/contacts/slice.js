import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateField,
} from "./operations";
import { logOut } from "../auth/operations";

const INITIAL_STATE = {
  items: [],
  loading: false,
  paginationData: {
    hasNextPage: false,
    hasPreviousPage: false,
    page: 1,
    totalItems: 0,
    totalPages: 1,
    perPage: 20,
  },
  error: null,
};

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.data;
        state.paginationData = action.payload.paginationData;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(updateField.pending, handlePending)
      .addCase(updateField.fulfilled, (state, action) => {
        const updatedContact = action.payload.data;
        const index = state.items.findIndex(
          contact => contact._id === updatedContact._id
        );
        if (index !== -1) state.items[index] = updatedContact;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateField.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact._id === action.payload._id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.paginationData = {
          hasNextPage: false,
          hasPreviousPage: false,
          page: 1,
          totalItems: 0,
          totalPages: 1,
          perPage: 10,
        };
        state.error = null;
        state.loading = false;
      });
  },
});

export default contactsSlice.reducer;
