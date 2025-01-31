import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContactName,
  updateContactNumber,
} from "./operations";
import { logOut } from "../auth/operations";

const INITIAL_STATE = {
  items: [],
  loading: false,
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
  reducers: {
    updateContactName(state, action) {
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
        state.items[index].name = action.payload.value;
    },
    updateContactNumber(state, action) {
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index].number = action.payload.number;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(updateContactName.pending, handlePending)
      .addCase(updateContactName.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateContactName.rejected, handleRejected)
      .addCase(updateContactNumber.pending, handlePending)
      .addCase(updateContactNumber.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateContactNumber.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.loading = false;
      });
  },
});

export default contactsSlice.reducer;
