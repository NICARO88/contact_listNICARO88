import React, { useEffect, useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import Card from '../componentes/Card';
import DeleteConfirmationModal from '../componentes/DeleteConfirmationModal';

const Home = () => {
  const { store, actions } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    if (store.contacts.length === 0) {
      actions.loadContacts();
    }
  }, [store.contacts, actions]);

  // Función para abrir el modal y configurar el contacto que se eliminará
  const openModal = (contact) => {
    console.log("Contacto seleccionado para eliminar:", contact); 
    setIsModalOpen(true);
    setContactToDelete(contact);
  };

  // Función para confirmar la eliminación
  const confirmDelete = () => {
    if (contactToDelete) {
      console.log("ID del contacto a eliminar:", contactToDelete.id); 
      actions.deleteContact(contactToDelete.id);
    }
    setIsModalOpen(false);
    setContactToDelete(null);
  };

  // Función para cerrar el modal sin eliminar
  const cancelDelete = () => {
    setIsModalOpen(false);
    setContactToDelete(null);
  };

  return (
    <>
      <div className="d-flex justify-content-end btn-pos mt-4">
        <Link to="/create" className="btn btn-success">Add new contact</Link>
      </div>

      {/* Modal de confirmación */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Pasar openModal como prop a Card */}
      <Card contacts={store.contacts} onDelete={openModal} />
    </>
  );
};

export default Home;



