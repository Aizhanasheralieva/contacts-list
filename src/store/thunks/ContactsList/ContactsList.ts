import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosAPI.ts";
import { IContacts, IContactsAPI, IContactsForm } from "../../../types";

export const addNewContactToTheList = createAsyncThunk<void, IContactsForm>(
  "contactsList/addNewContactToTheList",
  async (contactToAdd) => {
    await axiosAPI.post("contactsList.json", { ...contactToAdd });
  },
);

export const fetchAllContactsFromTheFirebase = createAsyncThunk<
  IContacts[],
  void
>("contactsList/fetchAllContactsFromTheFirebase", async () => {
  const response: { data: IContactsAPI | null } =
    await axiosAPI<IContactsAPI | null>("contactsList.json");

  if (response.data) {
    const contactsInObjectFormat = response.data;
    const contactsInArrayFormat = Object.keys(contactsInObjectFormat).map(
      (contactId) => {
        return {
          ...contactsInObjectFormat[contactId],
          id: contactId,
        };
      },
    );
    return contactsInArrayFormat;
  }
  return [];
});

export const deleteContactById = createAsyncThunk<void, string>(
  "contactsList/deleteContactById",
  async (contactId) => {
    await axiosAPI.delete(`contactsList/${contactId}.json`);
  },
);

export const receiveOneContactById = createAsyncThunk<
  IContactsAPI | null,
  string
>("contactsList/receiveOneContactById", async (contactId) => {
  const response = await axiosAPI<IContactsAPI | null>(
    `contactsList/${contactId}.json`,

  );
    console.log(response.data)
  return response.data || null;
});


export const editContactInfo = createAsyncThunk<void, {contactId: string, contact: IContactsAPI}>(
  "contactsList/updateContactById",
  async ({contactId, contact}) => {
    await axiosAPI.put(`contactsList/${contactId}.json`, { ...contact });
  },
);
