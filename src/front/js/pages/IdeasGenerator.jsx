import React, { useState } from 'react';


const IdeasGenerator = () => {
    const [country, setCountry] = useState('');
    const [budget, setBudget] = useState('');
    const [area, setArea] = useState('');
    // const []

    return (
        <div className="container">
            <h1>Business Ideas Generator</h1>
            <form>
                <div className="mb-3">
                    <label for="customRange3" className="form-label">Budget</label>
                    <div className="input-group">
                        <span className="input-group-text" id="addon-wrapping"><i className="fas fa-user"></i></span>
                        <input type="range" class="form-range" min="0" max="5" step="0.5" id="customRange3" />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor='phone' className="form-label">Country</label>
                    <div className="input-group">
                        <span className="input-group-text" id="addon-wrapping"><i className="fas fa-phone"></i></span>
                        <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)}  placeholder="Phone" id="phone" required/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor='phone' className="form-label">Area</label>
                    <div className="input-group">
                        <span className="input-group-text" id="addon-wrapping"><i className="fas fa-phone"></i></span>
                        <input type="text" className="form-control" value={area} onChange={(e) => setArea(e.target.value)}  placeholder="Phone" id="phone" required/>
                    </div>
                </div>
            </form>
            {/* {ideas.length &&} */}
        </div>
    );
}

export default IdeasGenerator;