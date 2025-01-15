import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import contactsReducer from "./contacts/slice";
import filtersReducer from "./filters/slice";
import authReducer from "./auth/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const reducers = combineReducers({
  auth: persistedAuthReducer,
  contacts: contactsReducer,
  filters: filtersReducer,
});


export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
    },
  }),
});

export const persistor = persistStore(store);
