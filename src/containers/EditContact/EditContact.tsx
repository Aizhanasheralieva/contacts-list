import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectEditContactLoading,
  selectFetchContactToTheListLoading,
  selectOneContact,
} from "../../store/slices/contactsListSlice.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import {editContactInfo, receiveOneContactById} from "../../store/thunks/ContactsList/ContactsList.ts";
import ButtonSpinner from "../../components/UI/ButtonSpinner/ButtonSpinner.tsx";
import AddNewContactForm from "../../components/AddNewContactForm/AddNewContactForm.tsx";

const EditContact = () => {
  const contactsFetchLoading = useAppSelector(
    selectFetchContactToTheListLoading,
  );
  const editLoading = useAppSelector(selectEditContactLoading);
  const contact = useAppSelector(selectOneContact);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const receiveContactById = useCallback(async () => {
    if (id) {
      dispatch(receiveOneContactById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    void receiveContactById();
  }, [id, receiveContactById]);

  const edit = async () => {
    if (id && contact) {
      await dispatch(editContactInfo({contactId: id, contact}));
      navigate("/");
      // toast.success('Contact edited successfully');
    }
  };

  return (
    <div>
      {contactsFetchLoading ? (
        <ButtonSpinner />
      ) : (
        <>{contact ? <AddNewContactForm addNewContact={edit} isLoading={editLoading || contactsFetchLoading} contactToEdit={contact} /> : navigate("/")}</>
      )}
    </div>
  );
};

export default EditContact;
