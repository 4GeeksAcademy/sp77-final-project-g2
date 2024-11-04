import React, { useState } from 'react';
import "../../styles/SignUp.css";
import IconoInnovAI from '../../img/icono-innovai.png';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password } = formData;

        const passwordValid = /(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/;

        if (!passwordValid.test(password)) {
            setErrorMessage('La contraseña debe contener al menos una letra y un signo especial.');
            return;
        }

        setErrorMessage('');
        console.log("Form data submitted:", formData);
        
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signup-container">
            <div className="signup-left">
                <img src={IconoInnovAI} alt="Icono InnovAI" />
            </div>
            <form onSubmit={handleSubmit} className="signup-right">
                <h4>Register</h4>
                <p>Create a new account to explore more features:</p>
                <div className="floating-label">
                    <div className="icon ms-1"><i className="fa-solid fa-font"></i></div>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} required/>
                </div>
                <div className="floating-label">
                    <div className="icon ms-1"><i className="fa-solid fa-b"></i></div>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} required/>
                </div>
                <div className="floating-label">
                    <div className="icon ms-1"><i className="fa-solid fa-envelope"></i></div>
                    <input type="email" id="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="floating-label">
                    <div className="icon ms-1"><i className="fa-solid fa-lock"></i></div>
                    <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} required />
                    <button type="button" onClick={togglePasswordVisibility} className="eye-icon">
                        <i className={`fa-solid fa-eye${showPassword ? '' : '-slash'}`}></i>
                    </button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="button-modern">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
