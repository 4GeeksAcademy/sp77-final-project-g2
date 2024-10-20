import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";

const News = () => {
    const { store, actions } = useContext(Context);


    const [category, setCategory] = useState("");

    const handleSearch = () => {
        if (!category) {
            alert("Por favor, selecciona una categoría.");
            return;
        }
        actions.getNews(category);
    };

    return (
        <div className="container">
            <h1>Noticias Destacadas</h1>
            <div className="row mb-3">
                <div className="col-md-6">
                    <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Selecciona una categoría</option>
                        <option value="technology">Tecnología</option>
                        <option value="sports">Deportes</option>
                        <option value="business">Negocios</option>
                        <option value="entertainment">Entretenimiento</option>
                        <option value="health">Salud</option>
                        <option value="science">Ciencia</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary" onClick={handleSearch}>Buscar Noticias</button>
                </div>
            </div>

            <div className="row">
                {store.news.length === 0 ? (
                    <p>No se encontraron noticias.</p>
                ) : (
                    store.news.map((item, index) => (
                        <div key={index} className="col-md-3">
                            <div className="card">
                                {item.image && (
                                    <img src={item.image} className="card-img-top" alt={item.title} style={{ aspectRatio: '3 / 2', overflow: 'hidden' }}/>
                                )}
                                <div className="card-body">
                                    <h5>{item.title}</h5>
                                    <p><strong>Fecha:</strong> {new Date(item.date).toLocaleDateString()}</p>
                                    <p>{item.description}</p>
                                    <a href={item.url} className="btn btn-dark" target="_blank" rel="noopener noreferrer">Ver Más</a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default News;
