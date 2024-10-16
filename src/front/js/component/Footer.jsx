import React from "react";
import { Link } from "react-router-dom";
import logo from '../../img/innovai_logo_bg-blank-white-letters.png';

export const Footer = () => {
    return (
        <footer className="bg-dark text-light py-3">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col text-start">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Logo"
                                className="img-fluid"
                                style={{ maxHeight: '120px' }}
                            />
                        </Link>
                    </div>

                    <div className="col text-center mb-1">
                        <p className="mb-0" style={{ fontStyle: 'italic', fontSize: '1.25rem' }}>"Dream big, start small"</p>
                    </div>

                    <div className="col text-end">
                        <div>
                            <Link to="/" className="text-light d-block mb-1 text-decoration-none footer-link">Home</Link>
                            <Link to="/advisor" className="text-light d-block mb-1 text-decoration-none footer-link">ChatAI</Link>
                            <Link to="/news" className="text-light d-block mb-1 text-decoration-none footer-link">News</Link>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <p className="mb-0">&copy; {new Date().getFullYear()} Innovai. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};