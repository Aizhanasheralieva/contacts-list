import React from 'react';
import {IContacts} from "../../../types";
import Backdrop from "../Backdrop/Backdrop.tsx";
import "./modal.css";

interface Props extends React.PropsWithChildren {
    contactDetails: IContacts | null;
    closeModal: () => void;
    show: boolean;
}
const ContactDetailsModal: React.FC<Props> = ({ show, contactDetails, closeModal}) => {
    if (!contactDetails) return null;
    return (
        <>
            <Backdrop show={show} onClick={closeModal} />
            <div className="modal" style={{
                display: show ? "block" : "none",
                width: "500px",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}>
                <div className="modal-content">
                        <button onClick={closeModal} className="close-btn">X</button>
                    <div className="modal-body">
                        <div>
                            <img src={contactDetails.photo} alt="contact" width="200" height="200"/>
                        </div>
                        <div>
                            <p>{contactDetails.name}</p>
                            <p>{contactDetails.phone}</p>
                            <p>{contactDetails.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ContactDetailsModal;