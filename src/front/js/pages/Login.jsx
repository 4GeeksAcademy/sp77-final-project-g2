import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {actions} = useContext(Context);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = () => {
        e.preventDefault();
        const dataToSend = {email, password};
        actions.logIn(dataToSend);
        navigate('/');
    }

    return (
        <div className="container d-flex align-items-center justify-content-center">
            <div className="row">
                <div className="col-md-4">
                    <img src="" alt="" />
                </div>
                <div className="col-md-8 login-cont d-flex justify-content-center">
                    <form onSubmit={handleLogIn}>
                        <h3>We are <span>InnovAI</span></h3>
                        <p>Welcome back! Log in to your account to view your ideas:</p>
                        <div className="floating-label">
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.targetvalue)} required />
                            <label htmlFor="email">Email</label>
                            <div className="icon">
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="floating-label">
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <label htmlFor="password">Password</label>
                                <div className="icon">
                                    <i className="fa-solid fa-lock"></i>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;