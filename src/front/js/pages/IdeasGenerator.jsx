import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext.js";

const IdeasGenerator = () => {
    const {store, actions} = useContext(Context);

    const [country, setCountry] = useState('');
    const [budget, setBudget] = useState(1000);
    const [area, setArea] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.getIdeas(budget, country, area);
    }


    return (
        <div className="container">
            <h1>Business Ideas Generator</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="customRange3" className="form-label">Budget</label>
                    <div className="input-group">
                        {/* <span className="input-group-text" id="addon-wrapping"><i className="fas fa-dollar-sign"></i></span> */}
                        <span className="input-group-text">{budget} €</span>
                        <input type="range" className="form-range" min="0" max="30000" step="2500" id="customRange3" value={budget} onChange={(e) => setBudget(e.target.value)}  required/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor='country' className="form-label">Country</label>
                    <div className="input-group">
                        <span className="input-group-text" id="addon-wrapping"><i className="fas fa-globe"></i></span>
                        <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)}  placeholder="Country" id="country" required/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor='area' className="form-label">Area</label>
                    <div className="input-group">
                        <span className="input-group-text" id="addon-wrapping"><i className="fas fa-briefcase"></i></span>
                        <input type="text" className="form-control" value={area} onChange={(e) => setArea(e.target.value)}  placeholder="Area of Interest" id="area" required/>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success">Generate</button>
            </div>
            </form>
            {store.ideas.length > 0 && (
                <div>
                    <h2>Ideas for You</h2>
                    <div className="row">
                        {store.ideas.map((item, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h5>{item.title}</h5>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default IdeasGenerator;