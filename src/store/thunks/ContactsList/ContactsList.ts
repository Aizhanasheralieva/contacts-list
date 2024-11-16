import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosAPI.ts";

export const addNewContactToTheList = createAsyncThunk<void, IContactsForm>(
  "contactsList/addNewContactToTheList",
  async (contactToAdd) => {
    await axiosAPI.post("contactsList.json", { ...contactToAdd });
  },
);

export const fetchAllContactsFromTheFirebase = createAsyncThunk<IContacts[], void>(
    "contactsList/fetchAllContactsFromTheFirebase",
    async () => {
       const response: {data: IContactsAPI | null} = await axiosAPI<IContactsAPI | null>('contactsList.json');

       if (response.data) {
           const contactsInObjectFormat = response.data;
           const contactsInArrayFormat = Object.keys(contactsInObjectFormat).map((contactId) => {
               return {
                   ...contactsInObjectFormat[contactId],
                   id: contactId,
               };
           });
           return contactsInArrayFormat;
       }
       return [];
    },
);
