import React, { useState, useEffect } from "react";
import getState from "./flux.js";
export const Context = React.createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
            // Verificar si la agenda ya existe en la API
            const checkAgendaExists = async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/mcbk/contacts");
                    if (response.ok) {
                        console.log("Agenda ya existe en la API.");
                        state.actions.loadContacts();
                    } else if (response.status === 404) {
                        console.log("Agenda no existe, intentando crearla...");
                        await state.actions.createAgenda(); 
                        state.actions.loadContacts(); 
                    }
                } catch (error) {
                    console.error("Error al verificar la existencia de la agenda:", error);
                }
            };

            // Llamar a checkAgendaExists una vez al iniciar
            checkAgendaExists();
        }, []); 

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;



