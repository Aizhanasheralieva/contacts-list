import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  addNewContactToTheList,
  deleteContactById,
  editContactInfo,
  fetchAllContactsFromTheFirebase,
  receiveOneContactById,
} from "../thunks/ContactsList/ContactsList.ts";
import {RootState} from "../../app/store.ts";
import {IContacts, IContactsAPI} from "../../types";

interface contactsListState {
  contacts: IContacts[];
  oneContact: IContacts | null;
  loadings: {
    contactsFetching: boolean;
    addContactsFetching: boolean;
    deleteContact: boolean;
    isEditLoading: boolean;
  };
}

const initialState: contactsListState = {
  contacts: [],
  oneContact: null,
  loadings: {
    contactsFetching: false,
    addContactsFetching: false,
    deleteContact: false,
    isEditLoading: false,
  },
};

export const selectAddContactToTheListLoading = (state: RootState) =>
  state.contactsList.loadings.addContactsFetching;
export const selectFetchContactToTheListLoading = (state: RootState) =>
  state.contactsList.loadings.contactsFetching;
export const selectDeleteContactLoading = (state: RootState) =>
  state.contactsList.loadings.deleteContact;
export const selectEditContactLoading = (state: RootState) => state.contactsList.loadings.isEditLoading;
export const selectAllContactsList = (state: RootState) =>
  state.contactsList.contacts;
export const selectOneContact = (state: RootState) =>
  state.contactsList.oneContact;


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
      .addCase(
        fetchAllContactsFromTheFirebase.fulfilled,
        (state, action: PayloadAction<IContacts[]>) => {
          state.loadings.contactsFetching = false;
          state.contacts = action.payload;
        },
      )
      .addCase(fetchAllContactsFromTheFirebase.rejected, (state) => {
        state.loadings.contactsFetching = false;
      })
      .addCase(deleteContactById.pending, (state) => {
        state.loadings.deleteContact = true;
      })
      .addCase(deleteContactById.fulfilled, (state) => {
        state.loadings.deleteContact = false;
      })
      .addCase(deleteContactById.rejected, (state) => {
        state.loadings.deleteContact = false;
      })
      .addCase(receiveOneContactById.pending, (state) => {
        state.loadings.contactsFetching = true;
        state.oneContact = null;
      })
      .addCase(
        receiveOneContactById.fulfilled,
        (state, action: PayloadAction<IContactsAPI | null>) => {
          state.loadings.contactsFetching = false;
          state.oneContact = action.payload;
        },
      )
      .addCase(receiveOneContactById.rejected, (state) => {
        state.loadings.contactsFetching = false;
      })
      .addCase(editContactInfo.pending, (state) => {
        state.loadings.isEditLoading = true;
      })
      .addCase(
          editContactInfo.fulfilled,
        (state) => {
          state.loadings.isEditLoading = false;
          state.oneContact = null;
        },
      )
      .addCase(editContactInfo.rejected, (state) => {
        state.loadings.isEditLoading = false;
      });
  },
});

export const contactsListReducer = contactsListSlice.reducer;
