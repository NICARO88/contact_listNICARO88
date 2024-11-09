import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Edit = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    // Estado local para almacenar los datos del contacto
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // Cargar datos del contacto al montar el componente
    useEffect(() => {
        const contact = store.contacts.find(contact => contact.id === parseInt(id));
        if (contact) {
            setContactData(contact);
        }
    }, [id, store.contacts]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData({ ...contactData, [name]: value });
    };

    // Guardar cambios y redirigir
    const handleSave = () => {
        console.log("Datos guardados:", contactData);
        actions.updateContact(id, contactData);
        navigate("/"); 
    };

    return (
        <div className="container">
            <h1 className="text-center">Edit Contact</h1>
            <div className="form-group">
                <label htmlFor="fullNameInput" className="form-label col-md-6"><strong>Full Name</strong></label>
                <input
                    type="text"
                    className="form-control col-md-6"
                    id="fullNameInput"
                    name="name"
                    placeholder="Full name"
                    value={contactData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="emailInput" className="form-label col-md-6"><strong>Email</strong></label>
                <input
                    type="email"
                    className="form-control col-md-6"
                    id="emailInput"
                    name="email"
                    placeholder="Enter email"
                    value={contactData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneInput" className="form-label col-md-6"><strong>Phone</strong></label>
                <input
                    type="tel"
                    className="form-control col-md-6"
                    id="phoneInput"
                    name="phone"
                    placeholder="Enter phone"
                    value={contactData.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="addressInput" className="form-label col-md-6"><strong>Address</strong></label>
                <input
                    type="text"
                    className="form-control col-md-6"
                    id="addressInput"
                    name="address"
                    placeholder="Enter address"
                    value={contactData.address}
                    onChange={handleChange}
                />
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-primary mt-3" type="button" onClick={handleSave}>Save</button>
            </div>
            <div><Link to="/" className="text-decoration-underline">or get back to contacts</Link></div>
        </div>
    );
};

export default Edit;
