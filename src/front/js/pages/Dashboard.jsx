import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

const Dashboard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        const userId = store.currentUser?.id;
        if (userId) {
            actions.getFavoriteIdeas(userId);
        }
    }, [store.currentUser]);

    if (!store.favoriteIdeas || store.favoriteIdeas.length === 0) {
        return <div>No tienes ideas favoritas guardadas.</div>;
    }

    return (
        <div>
            <h2>Mis Ideas Favoritas</h2>
            <ul>
                {store.favoriteIdeas.map((idea) => (
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
