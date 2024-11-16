import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectAllContactsList, selectFetchContactToTheListLoading} from "../../store/slices/contactsListSlice.ts";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner.tsx";
import {useEffect} from "react";
import {fetchAllContactsFromTheFirebase} from "../../store/thunks/ContactsList/ContactsList.ts";

const TheListOfContacts = () => {
  const dispatch = useAppDispatch();
  const allContactsList = useAppSelector(selectAllContactsList);
  const contactsFetchLoading = useAppSelector(selectFetchContactToTheListLoading);

  useEffect(() => {
    dispatch(fetchAllContactsFromTheFirebase());
  }, [dispatch]);
  return (
      <>
        <div>
          {contactsFetchLoading ? <ButtonSpinner/> :
              <>
                {allContactsList.length === 0 ? <p>There are any contacts yet added!</p> :
                    <>
                      {allContactsList.map((contact) => (
                          <div key={contact.id} className="card p-4 mb-3 w-50 mx-auto">
                            <div className="card-body d-flex justify-content-between align-items-center">
                              {contact.photo && <img src={contact.photo} alt="contact" className="card-image me-4"
                                 style={{maxWidth: "100px"}}/>}
                              <h5 className="card-title">{contact.name}</h5>
                            </div>
                          </div>
                      ))}
                    </>
                }
              </>
          }
        </div>
      </>
  );
};

export default TheListOfContacts;
