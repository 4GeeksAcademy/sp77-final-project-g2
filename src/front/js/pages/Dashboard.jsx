import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Dashboard = () => {
    const { store, actions } = useContext(Context);

    // Obtener las ideas favoritas del usuario al montar el componente
    useEffect(() => {
        const userId = store.currentUser?.id;  // Asegúrate de tener el ID del usuario
        if (userId) {
            actions.getFavoriteIdeas(userId);
        }
    }, [store.currentUser]);

    // Verificar si store.favorites está definido y no es null
    if (!store.favorites || store.favorites.length === 0) {
        return <div>No tienes ideas favoritas guardadas.</div>;
    }

    return (
        <div>
            <h2>Mis Ideas Favoritas</h2>
            <ul>
                {store.favorites.map((idea) => (
                    <li key={idea.id}>
                        <h3>{idea.title}</h3>
                        <p>{idea.description}</p>
                        <p><strong>Presupuesto:</strong> {idea.budget}€</p>
                        <p><strong>País:</strong> {idea.country}</p>
                        <p><strong>Área:</strong> {idea.area}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
