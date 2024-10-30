import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext.js";
import '../../styles/Ideas.css';

const IdeasGenerator = () => {
    const { store, actions } = useContext(Context);
    const [country, setCountry] = useState('');
    const [budget, setBudget] = useState(1000);
    const [area, setArea] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.getIdeas(budget, country, area);
    };

    const handleFavorite = (item) => {
        actions.addFavoriteIdea(item);
    };

    const handleSliderChange = (e) => {
        setBudget(e.target.value);
    };

    return (
        <div className="ideas-generator container d-flex flex-column flex-md-row">
            <div className="left-column col-12 col-md-4">
                <h1>Business Ideas Generator</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-5 budget-display">
                    <label htmlFor="budget" className="floating-label">Budget</label>
                        <div className="range-slider-container">
                            <div className="budget-display">
                                <p className="budget-value">{Number(budget).toLocaleString()} €</p>
                            </div>
                            <input type="range" min="0" max="30000" step="2500" value={budget} onChange={handleSliderChange} className="range-slider"
                                style={{
                                    background: `linear-gradient(90deg, #1e90ff ${(budget / 30000) * 100}%, #d3d3d3 ${(budget / 30000) * 100}%)`
                                }}
                            />
                        </div>
                    </div>
                    <div className="my-4">
                        <label htmlFor="country" className="floating-label-outside">Country</label>
                        <div className="text-input-container">
                            <span className="input-icon"><i className="fas fa-globe"></i></span>
                            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="text-input" placeholder="Country" id="country" required/>
                        </div>
                    </div>
                    <div className="mb-4">
                    <label htmlFor="area" className="floating-label-outside">Area of Interest</label>
                        <div className="text-input-container">
                            <span className="input-icon"><i className="fas fa-briefcase"></i></span>
                            <input type="text" value={area} onChange={(e) => setArea(e.target.value)} className="text-input" placeholder="Area of Interest" id="area" required/>
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn generate-btn">Generate</button>
                    </div>
                </form>
            </div>

            <div className="right-column col-12 col-md-8">
                {store.ideas.length > 0 && (
                    <div>
                        <h2>Ideas for You</h2>
                        <div className="row">
                            {store.ideas.map((item, index) => (
                                <div className="col-md-12" key={index}>
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                            <button className="btn btn-light" onClick={() => actions.addFavoriteIdea(item)}>
                                                {/* <i className="fas fa-lightbulb"></i> */}
                                                <i className={`fas fa-lightbulb ${handleFavorite(item) ? 'is-favorite' : ''}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IdeasGenerator;

