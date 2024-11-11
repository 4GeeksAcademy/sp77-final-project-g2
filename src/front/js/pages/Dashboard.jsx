import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import '../../styles/Dashboard.css';

const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        actions.isLogged();
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
                                        <div className="card-actions mt-3">
                                            <button className="btn btn-success btn-sm" onClick={() => actions.processIdea(idea)}>Empezar</button>
                                            <button className="btn btn-danger btn-sm m-2" onClick={() => actions.removeFavoriteIdea(idea.id)}>Remove Idea</button>
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

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Consejos para empezar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {tips.length > 0 ? (
                        <ul>
                            {tips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Cargando consejos...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;