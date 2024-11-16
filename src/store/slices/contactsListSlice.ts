import {createSlice} from "@reduxjs/toolkit";

interface contactsListState {
    contacts: IContacts[],
    loadings: {
        contactsFetching: boolean;
        addContactsFetching: boolean;
    }
}

const initialState: contactsListState = {
    contacts: [],
    loadings: {
        contactsFetching: false,
        addContactsFetching: false,
    }
};

export const contactsListSlice = createSlice({
    name: 'contactsList',
    initialState,
    reducers: {}
});

export const contactsListReducer = contactsListSlice.reducer;
// export const {} = contactsListSlice.actions;