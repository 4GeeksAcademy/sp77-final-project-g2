import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


const News = () => {
    const {store, actions} = useContext(Context);

    return (
        <div className="container">
            <h1>Noticias Destacadas</h1>
            <div className="row">
                {store.news.map((item, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card">
                            {item.urlToImage && (
                                <img src={item.urlToImage} className="card-img-top" />
                            )}
                            <div className="card-body">
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                                <button type="button" className="btn btn-dark">Ver Más</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;