export interface IContacts {
  name: string;
  email: string;
  phone: string;
  photo: string;
  id?: string;
}

export interface IContactsForm {
  name: string;
  email: string;
  phone: string;
  photo: string;
}

export interface IContactsAPI {
  [id: string]: IContacts;
}
