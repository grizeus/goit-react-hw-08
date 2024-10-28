import { createAsyncThunk } from "@reduxjs/toolkit";
import instanceContacts from "../../api/api";
import toast from "react-hot-toast";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await instanceContacts.get("/contacts");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await instanceContacts.post("/contacts", {
        name,
        number,
      });
      toast.success("Contact added!");
      return response.data;
    } catch (e) {
      toast.error(e.message);
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
      toast.success(`Contact ${field} updated!`);
      return response.data;
    } catch (e) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContactNumber = createAsyncThunk(
  "contacts/updateContactNumber",
  async ({ id, field, value }, thunkAPI) => {
    try {
      thunkAPI.dispatch({
        type: "contacts/updateContactNumber",
        payload: { id, field, value },
      });
      const response = await instanceContacts.patch(`/contacts/${id}`, {
        [field]: value
      });
      toast.success(`Contact ${field} updated!`);
      return response.data;
    } catch (e) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const response = await instanceContacts.delete(`/contacts/${id}`);
      return response.data;
    } catch (e) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
