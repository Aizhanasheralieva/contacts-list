import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
  selectAddContactToTheListLoading,
  selectFetchContactToTheListLoading
} from "../../store/slices/contactsListSlice.ts";
import {
  addNewContactToTheList,
  receiveOneContactById,
  editContactInfo
} from "../../store/thunks/ContactsList/ContactsList.ts";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner.tsx";
import {useNavigate, useParams} from "react-router-dom";
import { IContactsForm} from "../../types";

interface Props {
  contactToEdit?: IContactsForm;
}
const initialStateForForm = {
  name: "",
  email: "",
  phone: "",
  photo: "",
};

const AddNewContactForm: React.FC<Props> = ({ contactToEdit }) => {
  const contactsAddLoading = useAppSelector(selectAddContactToTheListLoading);
  const contactsFetchLoading = useAppSelector(selectFetchContactToTheListLoading);
  const [contacts, setContacts] = useState<IContactsForm>(initialStateForForm);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (contactToEdit) {
      setContacts(contactToEdit);
    } else if (id) {
      dispatch(receiveOneContactById(id));
    }
  }, [contactToEdit]);

  const onChangeContactsInputInfo = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setContacts((prevState) => {
      const { name, value } = event.target;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmitContacts = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactToEdit) {
      await dispatch(editContactInfo({ ...contacts, id: contactToEdit.id }));
    } else {
      await dispatch(addNewContactToTheList({ ...contacts }));
    }

    navigate("/");
  };

  return (
    <div className="container mb-5">
      <h1 className="my-4">{contactToEdit ? "Edit" : "Add New"} Contact</h1>
      <div className="d-flex justify-content-lg-start">
        <form
          onSubmit={onSubmitContacts}
          className="p-4 w-50 border rounded shadow-lg bg-light "
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={contacts.name}
              onChange={onChangeContactsInputInfo}
              className="form-control"
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={contacts.phone}
              onChange={onChangeContactsInputInfo}
              className="form-control"
              placeholder="Enter phone number"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contacts.email}
              onChange={onChangeContactsInputInfo}
              className="form-control"
              placeholder="Enter email address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">
              Photo
            </label>
            <input
              type="photo"
              id="photo"
              name="photo"
              value={contacts.photo}
              onChange={onChangeContactsInputInfo}
              className="form-control"
              placeholder="Enter photo URL"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photoPreview" className="form-label">
              Photo preview
            </label>
            {contacts.photo && (
              <img
                src={contacts.photo}
                alt="Photo preview"
                className="rounded"
                style={{ maxWidth: "100px" }}
              />
            )}
          </div>
          <div className="d-flex justify-content-left">
            <button
              disabled={contactsAddLoading}
              type="submit"
              className="btn btn-primary me-3"
            >
              Save
            </button>
            {contactsAddLoading || contactsFetchLoading ? <ButtonSpinner /> : null}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => navigate("/")}
            >
              Back to contacts
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewContactForm;
