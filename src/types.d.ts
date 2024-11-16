interface IContacts {
  name: string;
  email: string;
  phone: string;
  photo: string;
  // preview: string,
  id?: string;
}

interface IContactsForm {
  name: string;
  email: string;
  phone: string;
  photo: string;
  // preview: string,
}

interface IContactsAPI {
  [id: string]: IContacts;
}
