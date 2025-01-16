import { createAsyncThunk } from "@reduxjs/toolkit";
import instanceContacts from "../../api/api";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (
    { page = 1, perPage = 10, sortBy = "name", sortOrder = "asc" },
    thunkAPI
  ) => {
    try {
      const res = await instanceContacts.get("/contacts", {
        params: {
          page,
          perPage,
          sortBy,
          sortOrder,
        },
      });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (payload, thunkAPI) => {
    try {
      const response = await instanceContacts.post("/contacts", payload);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContactName = createAsyncThunk(
  "contacts/updateContactName",
  async ({ id, field, value }, thunkAPI) => {
    try {
      thunkAPI.dispatch({
        type: "contacts/updateContactName",
        payload: { id, field, value },
      });

      const response = await instanceContacts.patch(`/contacts/${id}`, {
        [field]: value,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContactPhoneNumber = createAsyncThunk(
  "contacts/updateContactPhoneNumber",
  async ({ id, field, value }, thunkAPI) => {
    try {
      thunkAPI.dispatch({
        type: "contacts/updateContactPhoneNumber",
        payload: { id, field, value },
      });
      const response = await instanceContacts.patch(`/contacts/${id}`, {
        [field]: value,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContactEmail = createAsyncThunk(
  "contacts/updateContactEmail",
  async ({ id, field, value }, thunkAPI) => {
    try {
      thunkAPI.dispatch({
        type: "contacts/updateContactEmail",
        payload: { id, field, value },
      });
      const response = await instanceContacts.patch(`/contacts/${id}`, {
        [field]: value,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (_id, thunkAPI) => {
    try {
      const response = await instanceContacts.delete(`/contacts/${_id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
