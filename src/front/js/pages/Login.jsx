import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import '../../styles/Login.css';
import IconoInnovAI from '../../img/icono-innovai.png';

const Login = () => {
    const {actions} = useContext(Context);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = (e) => {
        e.preventDefault();
        const dataToSend = {email, password};
        actions.logIn(dataToSend);
        navigate('/dashboard');
    }

    return (
        <div className="container">
            <div className="login-container">
                <div className="login-left">
                    {/* <img src={IconoInnovAI} alt="Icono InnovAI" /> */}
                </div>
                <form onSubmit={handleLogIn} className="login-right">
                    <h4>We are <span>INNOVAI</span></h4>
                    <p>Welcome back! Log in to your account to view your favorite ideas:</p>
                    <div className="floating-label">
                        <input type="email" id="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                        {/* <label htmlFor="email">Email:</label> */}
                        <div className="icon"><i className="fa-solid fa-envelope"></i></div>
                    </div>
                    <div className="floating-label">
                        <input type="password" id="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        {/* <label htmlFor="email">Password:</label> */}
                        <div className="icon"><i className="fa-solid fa-lock"></i></div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;