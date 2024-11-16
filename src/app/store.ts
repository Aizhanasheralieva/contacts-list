import { configureStore } from "@reduxjs/toolkit";
import { contactsListReducer } from "../store/slices/contactsListSlice.ts";

export const store = configureStore({
  reducer: {
    contactsList: contactsListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
