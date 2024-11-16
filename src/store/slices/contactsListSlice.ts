import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewContactToTheList } from "../thunks/ContactsList/ContactsList.ts";
import { RootState } from "../../app/store.ts";

interface contactsListState {
  contacts: IContacts[];
  loadings: {
    contactsFetching: boolean;
    addContactsFetching: boolean;
  };
}

const initialState: contactsListState = {
  contacts: [],
  loadings: {
    contactsFetching: false,
    addContactsFetching: false,
  },
};

export const selectAddContactToTheListLoading = (state: RootState) =>
  state.contactsList.loadings.addContactsFetching;
export const selectFetchContactToTheListLoading = (state: RootState) =>
  state.contactsList.loadings.contactsFetching;

export const contactsListSlice = createSlice({
  name: "contactsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewContactToTheList.pending, (state) => {
        state.loadings.addContactsFetching = true;
      })
      .addCase(addNewContactToTheList.fulfilled, (state) => {
        state.loadings.addContactsFetching = false;
      })
      .addCase(addNewContactToTheList.rejected, (state) => {
        state.loadings.addContactsFetching = false;
      });
  },
});

export const contactsListReducer = contactsListSlice.reducer;
// export const {} = contactsListSlice.actions;
