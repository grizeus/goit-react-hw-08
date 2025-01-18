import { createAsyncThunk } from "@reduxjs/toolkit";
import instanceContacts from "../../api/api";

const setAuthHeader = token => {
  instanceContacts.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  instanceContacts.defaults.headers.common["Authorization"] = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data: wrap } = await instanceContacts.post(
        "auth/register",
        credentials
      );
      setAuthHeader(wrap.data.accessToken);
      return wrap.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data: wrap } = await instanceContacts.post(
        "/auth/login",
        credentials
      );
      setAuthHeader(wrap.data.accessToken);
      return wrap.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await instanceContacts.post("/auth/logout");
    clearAuthHeader();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedUser = state.auth.user;
    const persistedToken = state.auth.accessToken;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      const { data: wrap } = await instanceContacts.post("/auth/refresh");
      setAuthHeader(wrap.data.accessToken);
      return persistedUser;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const resetEmail = createAsyncThunk(
  "auth/resetEmail",
  async (credentials, thunkAPI) => {
    try {
      const res = await instanceContacts.post(
        "/auth/send-reset-email",
        credentials
      );
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const resetPwd = createAsyncThunk(
  "auth/resetPwd",
  async (credentials, thunkAPI) => {
    try {
      const res = await instanceContacts.post("/auth/reset-pwd", credentials);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
