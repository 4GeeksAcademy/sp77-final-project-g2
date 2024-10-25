import React from "react";
import { Link } from "react-router-dom";
import logo from '../../img/innovai_logo_bg-blank-white-letters.png';

export const Footer = () => {
    return (
        <footer className="bg-dark text-light mt-auto py-2">
            <div className="container-fluid px-3">
                <div className="row align-items-center">
                    <div className="col text-start">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Logo"
                                className="img-fluid"
                                style={{ maxHeight: '80px' }}
                            />
                        </Link>
                    </div>

                    <div className="col text-center">
                        <p className="mb-0" style={{ fontStyle: 'italic', fontSize: '1rem', padding: '0 15px' }}>
                            "Dream big, start small"
                        </p>
                    </div>

                    <div className="col text-end">
                        <div className="footer-links" style={{ padding: '0 15px' }}>
                            <Link to="/" className="text-light d-block mb-0 text-decoration-none footer-link">Home</Link>
                            <Link to="/advisor" className="text-light d-block mb-0 text-decoration-none footer-link">ChatAI</Link>
                            <Link to="/news" className="text-light d-block mb-0 text-decoration-none footer-link">News</Link>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-1" style={{ padding: '0 15px' }}>
                    <p className="mb-0" style={{ fontSize: '0.875rem' }}>
                        &copy; {new Date().getFullYear()} Innovai. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};