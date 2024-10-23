import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';

const SignUp = () => {
    const { actions } = useContext(Context);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await actions.signUp(formData);
        
        if (response) {
            setMessage('Registrado/a correctamente');
            setMessageType('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });
        } else {
            setMessage('Error en el registro. Inténtalo de nuevo.');
            setMessageType('error');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="border p-4 rounded">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </label>
                    </div>
                    <div className="mb-3">
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </label>
                    </div>
                    <div className="mb-3">
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </label>
                    </div>
                    <div className="mb-3">
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                {message && (
                    <div className={`alert mt-3 ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUp;