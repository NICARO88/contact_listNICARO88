import React from 'react';
import { Link } from "react-router-dom";

const Card = ({ contacts, onDelete }) => {
  if (!Array.isArray(contacts)) {
    return null;
  }

  return (
    <div className="container">
      {contacts.map(contact => (
        <div key={contact.id} className="card mb-3" style={{ maxWidth: '80%' }}>
          <div className="row g-0">
            <div className="col-md-9">
              <div className="row g-0">
                <div className="col-md-5">
                  <img src="https://via.placeholder.com/150" className="img-fluid rounded-circle mt-3 ms-5" alt="Profile" style={{ width: '150px', height: '150px' }} />
                </div>
                <div className="col-md-7 d-flex align-items-center ps-0">
                  <div className="card-body card-style">
                    <h3 className="card-title">{contact.name}</h3>
                    <p className="card-text"><i className="fa-solid fa-location-dot"></i> {contact.address}</p>
                    <p className="card-text"><i className="fa-solid fa-phone"></i> {contact.phone}</p>
                    <p className="card-text"><i className="fa-solid fa-envelope mb-3"></i> {contact.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-items-start justify-content-end mt-4 pe-5">
              <Link to={`/edit/${contact.id}`} className="me-5">
                <i className="fa-solid fa-pencil clrpen"></i>
              </Link>
              <Link to="#" onClick={() => onDelete(contact)}>
                <i className="fa-solid fa-trash-can clrtrash"></i>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;


