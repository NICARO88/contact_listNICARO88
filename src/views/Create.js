import React, { useState } from "react";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';



const Create = () => {

    const { actions } = useContext(Context);
    const navigate = useNavigate(); 
    
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData({ ...contactData, [name]: value });
    };

    const handleSave = async () => {
       try{
        console.log("Contact data being sent:", contactData);
        await actions.createContact(contactData);
        navigate ("/");
       } catch (error) {
        console.error ("Error creating contact:", error)
       }
    };

    return (
        <div className="container">
            <h1 className="text-center">Add a new contact</h1>
            <div className="form-group">
                <label htmlFor="fullNameInput" className="form-label col-md-6"><strong>Full Name</strong></label>
                <input type="text" className="form-control col-md-6" id="fullNameInput" name="name" placeholder="Full name" value={contactData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="emailInput" className="form-label col-md-6"><strong>Email</strong></label>
                <input type="email" className="form-control col-md-6" id="emailInput" name="email" placeholder="Enter email" value={contactData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="phoneInput" className="form-label col-md-6"><strong>Phone</strong></label>
                <input type="tel" className="form-control col-md-6" id="phoneInput" name="phone" placeholder="Enter phone" value={contactData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="addressInput" className="form-label col-md-6"><strong>Address</strong></label>
                <input type="text" className="form-control col-md-6" id="addressInput" name="address" placeholder="Enter address" value={contactData.address} onChange={handleChange} />
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-primary mt-3" type="button" onClick={handleSave}>Save</button>
            </div>
            <div className="mt-3"><a href="/" className="text-decoration-underline">or get back to contacts</a></div>
        </div>
    );
};

export default Create;
