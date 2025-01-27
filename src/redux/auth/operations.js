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
    const { name, email, password } = credentials;
    try {
      await instanceContacts.post("auth/register", {
        name,
        email,
        password,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (credentials, thunkAPI) => {
    try {
      await instanceContacts.post("auth/register", );
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

const navigate = url => {
  window.location.href = url;
};

export const getLoginOAuth = createAsyncThunk(
  "auth/getLoginGoogle",
  async (_, thunkAPI) => {
    try {
      const { data: wrap } = await instanceContacts.post("/auth/oauth");
      navigate(wrap.data.url);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const loginOAuth = createAsyncThunk(
  "auth/loginGoogle",
  async (_, thunkAPI) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const oauthData = JSON.parse(
        decodeURIComponent(urlParams.get("oauthData"))
      );

      if (oauthData?.data?.accessToken) {
        setAuthHeader(oauthData.data.accessToken);
        return oauthData.data;
      }
      throw new Error("No access token received");
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
      await instanceContacts.post(
        "/auth/send-reset-email",
        credentials
      );
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const resetPwd = createAsyncThunk(
  "auth/resetPwd",
  async (credentials, thunkAPI) => {
    try {
      const { data: wrap } = await instanceContacts.post(
        "/auth/reset-pwd",
        credentials
      );
       setAuthHeader(wrap.data.accessToken);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
