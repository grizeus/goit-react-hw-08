import { createAsyncThunk } from "@reduxjs/toolkit";
import instanceContacts from "../../api/api";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (
    { page = 1, perPage = 10, sortBy = "name", sortOrder = "asc" },
    thunkAPI
  ) => {
    try {
      const { data: wrap } = await instanceContacts.get("/contacts", {
        params: {
          page,
          perPage,
          sortBy,
          sortOrder,
        },
      });
      return wrap.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (payload, thunkAPI) => {
    try {
      if (payload.has("photo")) {
        const { data: wrap } = await instanceContacts.post(
          "/contacts",
          payload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        return wrap.data;
      }
      const { data: wrap } = await instanceContacts.post("/contacts", payload);
      return wrap.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateField = createAsyncThunk(
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
      return thunkAPI.rejectWithValue(e.response.data.data.errors[0]?.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      await instanceContacts.delete(`/contacts/${id}`);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
