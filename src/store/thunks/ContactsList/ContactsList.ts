import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosAPI.ts";

export const addNewContactToTheList = createAsyncThunk<void, IContactsForm>(
  "contactsList/addNewContactToTheList",
  async (contactToAdd) => {
    await axiosAPI.post("contactsList.json", { ...contactToAdd });
  },
);
