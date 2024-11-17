import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addNewContactToTheList, fetchAllContactsFromTheFirebase} from "../thunks/ContactsList/ContactsList.ts";
import {RootState} from "../../app/store.ts";
import {IContacts} from "../../types";

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
export const selectAllContactsList = (state: RootState) => state.contactsList.contacts;

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
      })
        .addCase(fetchAllContactsFromTheFirebase.pending, (state) => {
            state.loadings.contactsFetching = true;
        })
        .addCase(fetchAllContactsFromTheFirebase.fulfilled, (state, action: PayloadAction<IContacts[]>) => {
            state.loadings.contactsFetching = false;
            state.contacts = action.payload;
        })
        .addCase(fetchAllContactsFromTheFirebase.rejected, (state) => {
            state.loadings.contactsFetching = false;
        });
  },
});

export const contactsListReducer = contactsListSlice.reducer;
// export const {} = contactsListSlice.actions;
