import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectAllContactsList, selectFetchContactToTheListLoading} from "../../store/slices/contactsListSlice.ts";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner.tsx";
import {useCallback, useEffect, useState} from "react";
import {fetchAllContactsFromTheFirebase} from "../../store/thunks/ContactsList/ContactsList.ts";
import {IContacts} from "../../types";
import ContactDetailsModal from "../UI/ContactDetailsModal/ContactDetailsModal.tsx";

const TheListOfContacts = () => {
  const dispatch = useAppDispatch();
  const allContactsList = useAppSelector(selectAllContactsList);
  const contactsFetchLoading = useAppSelector(selectFetchContactToTheListLoading);
  const [isContactDetailsModalOpen, setIsContactDetailsModalOpen] = useState(false);
  const [chosenContactFromTheList, setChosenContactFromTheList] = useState<IContacts | null>(null);

  const fetchContacts = useCallback(async () => {
      await dispatch(fetchAllContactsFromTheFirebase());
  }, [dispatch]);

  useEffect(() => {
   void fetchContacts();
  }, [fetchContacts]);

  const openContactDetailsModal = (contactDetails: IContacts) => {
      setChosenContactFromTheList(contactDetails);
      setIsContactDetailsModalOpen(true);
  };

  const closeContactDetailsModal = () => {
      setIsContactDetailsModalOpen(false);
      setChosenContactFromTheList(null);
  };
  return (
      <>
        <div>
          {contactsFetchLoading ? <ButtonSpinner/> :
              <>
                {allContactsList.length === 0 ? <p>There are any contacts yet added!</p> :
                    <>
                      {allContactsList.map((contact) => (
                          <div
                              key={contact.id}
                              onClick={() => openContactDetailsModal(contact)}
                              style={{cursor: "pointer"}}
                              className="card p-4 mb-3 w-50 d-flex flex-column align-items-lg-start">
                            <div className="card-body d-flex justify-content-center align-items-center ">
                              {contact.photo && <img src={contact.photo} alt="contact" className="card-image me-4"
                                 style={{maxWidth: "100px"}}/>}
                              <h5 className="card-title">{contact.name}</h5>
                            </div>
                          </div>
                      ))}
                    </>
                }
                  {isContactDetailsModalOpen && (
                      <ContactDetailsModal
                          show={isContactDetailsModalOpen}
                          contactDetails={chosenContactFromTheList}
                          closeModal={closeContactDetailsModal}/>
                  )}

              </>
          }
        </div>
      </>
  );
};

export default TheListOfContacts;
