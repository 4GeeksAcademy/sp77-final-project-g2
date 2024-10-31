import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

const Dashboard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.isLoged) {
            actions.getFavoriteIdeas();
        }
    }, [store.isLoged]);

    if (!store.favoriteIdeas || store.favoriteIdeas.length === 0) {
        return <div className="container mt-5 text-center">No tienes ideas favoritas guardadas.</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Mis Ideas Favoritas</h2>
            <div className="row">
                {store.favoriteIdeas.map((idea, index) => (
                    <div className="col-md-6 mb-4" key={index}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{idea.title}</h5>
                                <p className="card-text">{idea.description}</p>
                                <ul className="list-unstyled">
                                    <li><strong>Presupuesto:</strong> {idea.budget}€</li>
                                    <li><strong>País:</strong> {idea.country}</li>
                                    <li><strong>Área:</strong> {idea.area}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

