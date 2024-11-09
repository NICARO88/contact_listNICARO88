const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
        },
        actions: {
            loadContacts: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/mcbk/contacts");
                    if (!response.ok) throw new Error ("Error al cargar los contactos")
                    const data = await response.json();
                    console.log ("Datos de contactos cargados", data)
                    setStore({ contacts: data.contacts });
                    console.log ("Estado actualizado de contacts:", getStore().contacts);

                } catch (error) {
                    console.error("Error loading contacts:", error);
                }
            },
            createAgenda: async () => { 
                try {
                    console.log("Intentando crear la agenda...");
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/mcbk', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (response.ok) {
                        console.log("Agenda creada con éxito.");
                    } else {
                        console.error("Error al crear la agenda, código de estado:", response.status);
                    }
                } catch (error) {
                    console.error("Error en la creación de la agenda:", error);
                }
            },
            createContact: async newContact => {
                const store = getStore();
                console.log("Creating contact with data:", newContact);

                const validContact = {
                    name: newContact.name,
                    phone: newContact.phone || null,
                    email: newContact.email || null,
                    address: newContact.address || null
                };
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/mcbk/contacts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(validContact)
                    });
                    const data = await response.json();
                    const currentContacts = Array.isArray(store.contacts) ? store.contacts : [];
                    setStore({ contacts: [...currentContacts, data] });
                    console.log("Contact added successfully:", data);
                } catch (error) {
                    console.error("Error creating contact:", error);
                }
            },
            updateContact: async (id, updatedContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/mcbk/contacts/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updatedContact)
                    });
            
                    if (!response.ok) {
                        throw new Error(`Error en la actualización: ${response.status}`);
                    }
            
                    const data = await response.json();
                    console.log("Datos de contacto actualizados:", data);
            
                    const updatedContacts = getStore().contacts.map(contact =>
                        contact.id === parseInt(id) ? data : contact
                    );
                    
                    setStore({ contacts: updatedContacts });
                    console.log("Contacto actualizado en el estado:", updatedContacts);
            
                } catch (error) {
                    console.error("Error updating contact:", error);
                }
            },

            deleteContact: async id => {
                try {
                    await fetch(`https://playground.4geeks.com/contact/agendas/mcbk/contacts/${id}`, {
                        method: "DELETE"
                    });
                    const updatedContacts = getStore().contacts.filter(contact => contact.id !== id);
                    setStore({ contacts: updatedContacts });
                } catch (error) {
                    console.error("Error deleting contact:", error);
                }
            }
        }
    };
};

export default getState;
