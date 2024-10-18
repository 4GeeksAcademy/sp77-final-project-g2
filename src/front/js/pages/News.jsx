import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";

const News = () => {
    const { store, actions } = useContext(Context);

    // Estados locales para los filtros
    const [country, setCountry] = useState("");
    const [category, setCategory] = useState("");

    // Función para aplicar los filtros
    const applyFilters = () => {
        actions.getNews(country, category);  // Pasamos los filtros al backend
    };

    return (
        <div className="container">
            <h1>Noticias Destacadas</h1>

            {/* Filtros de país y categoría */}
            <div className="filters mb-4">
                <input
                    type="text"
                    placeholder="País (ej: us)"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    placeholder="Categoría (ej: technology)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control mb-2"
                />
                <button className="btn btn-primary" onClick={applyFilters}>
                    Aplicar Filtros
                </button>
            </div>

            {/* Mostrar noticias */}
            <div className="row">
                {store.news.map((item, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            {item.image && (
                                <img src={item.image} className="card-img-top" alt="news" />
                            )}
                            <div className="card-body">
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                                <small className="text-muted">{item.date}</small>
                                <p className="text-muted">
                                    Categorías: {item.categories.join(", ")}
                                </p>
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                                    Ver Más
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
