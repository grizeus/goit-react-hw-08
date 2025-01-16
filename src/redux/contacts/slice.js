import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContactName,
  updateContactPhoneNumber,
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
    totalPages: 0,
    perPage: 10,
    sortBy: "name",
    sortOrder: "asc",
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
  reducers: {
    updateContactName(state, action) {
      const index = state.items.findIndex(
        contact => contact._id === action.payload._id
      );
      state.items[index].name = action.payload.value;
    },
    updateContactPhoneNumber(state, action) {
      const index = state.items.findIndex(
        contact => contact._id === action.payload._id
      );
      if (index !== -1) {
        state.items[index].phoneNumber = action.payload.phoneNumber;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.data.data;
        state.paginationData = action.payload.data.paginationData;
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
      .addCase(updateContactName.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateContactName.rejected, handleRejected)
      .addCase(updateContactPhoneNumber.pending, handlePending)
      .addCase(updateContactPhoneNumber.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateContactPhoneNumber.rejected, handleRejected)
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
        state.error = null;
        state.loading = false;
      });
  },
});

export default contactsSlice.reducer;
