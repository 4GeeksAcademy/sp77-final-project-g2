import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import '../../styles/Dashboard.css';

const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.isLoged) {
            navigate("/login");
        } else {
            actions.getFavoriteIdeas();
        }
    }, [store.isLoged]);

    return (
        <div className="container dashboard-container">
            <h2 className="dashboard-title">Mis Ideas Favoritas</h2>
            <p className="dashboard-subtitle">Explora y administra las ideas de negocio que has guardado</p>
            <button className="btn btn-primary" onClick={() => actions.startCheckoutSession()}>Become a Premium user</button>

            <div className="row mt-4">
                {store.favoriteIdeas && store.favoriteIdeas.length > 0 ? (
                    store.favoriteIdeas.map((idea, index) => (
                        idea && idea.title ? (
                            <div className="col-md-6 mb-4" key={index}>
                                <div className="card shadow-sm h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{idea.title}</h5>
                                        <p className="card-text">{idea.description}</p>
                                        <div className="detail-tags">
                                            <span className="detail-tag"> <i className="fas fa-euro-sign"></i> {idea.budget}€</span>
                                            <span className="detail-tag"><i className="fas fa-map-marker-alt"></i> {idea.country}</span>
                                            <span className="detail-tag"><i className="fas fa-briefcase"></i> {idea.area}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ))
                ) : (
                    <p>No tienes ideas favoritas guardadas.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;