import React from "react";
import { IContacts } from "../../../types";
import Backdrop from "../Backdrop/Backdrop.tsx";
import "./modal.css";
import { useNavigate } from "react-router-dom";

interface Props extends React.PropsWithChildren {
  contactDetails: IContacts | null;
  closeModal: () => void;
  show: boolean;
  deleteContactFromTheList: (id: string) => void;
}
const ContactDetailsModal: React.FC<Props> = ({
  show,
  contactDetails,
  closeModal,
  deleteContactFromTheList,
}) => {
  const navigate = useNavigate();

  if (!contactDetails) return null;

  const controlEditClick = () => {
    navigate(`/edit/${contactDetails.id}`);
    closeModal();
  };

  return (
    <>
      <Backdrop show={show} onClick={closeModal} />
      <div
        className="modal"
        style={{
          display: show ? "block" : "none",
          width: "500px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="modal-content">
          <button onClick={closeModal} className="close-btn">
            X
          </button>
          <div className="modal-body">
            <div>
              <img
                src={contactDetails.photo}
                alt="contact"
                width="200"
                height="200"
              />
            </div>
            <div>
              <p>{contactDetails.name}</p>
              <p>{contactDetails.phone}</p>
              <p>{contactDetails.email}</p>
            </div>
          </div>
          <div className="d-flex justify-content-around align-items-center gap-3 mb-3">
            <button
              onClick={controlEditClick}
              className="btn btn-outline-light border-black text-black px-4"
            >
              Edit
            </button>
            <button
              onClick={() => deleteContactFromTheList(contactDetails.id!)}
              className="btn btn-outline-light border-black text-black px-3"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactDetailsModal;
