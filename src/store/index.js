import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import eventReducer from "./slices/eventSlices";
import authReducer from "./slices/authSlice";

const eventPersistConfig = {
  key: "events",
  storage,
  whitelist: ["events"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

export const store = configureStore({
  reducer: {
    events: persistReducer(eventPersistConfig, eventReducer),
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
