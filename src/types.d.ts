interface IContacts {
    name: string,
    email: string,
    phone: string,
    address: string,
    photoPreview: string,
    id?: string,
}

interface IContactsAPI {
   [id: string]: IContacts
}