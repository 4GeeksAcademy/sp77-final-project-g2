<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import logo from '../../img/logo-entero.png';
=======
import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import logoInnovAI from '../../img/logo-entero.png'
>>>>>>> develop

export const Navbar = () => {
	// const {store, actions} = useContext(Context);
	// const navigate = useNavigate();

	return (
<<<<<<< HEAD
		<BootstrapNavbar expand="lg" className="navbar-dark bg-dark">
			<Container>
				<Link to="/">
					<img
						src={logo}
						alt="Logo"
						style={{ maxHeight: '40px', width: 'auto' }}
						className="d-inline-block align-top"
					/>
				</Link>

				<BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

				<BootstrapNavbar.Collapse id="basic-navbar-nav">
				<Nav className="ms-auto">
                        <Nav.Link as={Link} to="/chatAI">ChatAI</Nav.Link>
                        <Nav.Link as={Link} to="/news">News</Nav.Link>
                    </Nav>

					<Nav>
						<Nav.Link as={Link} to="/login">LogIn</Nav.Link>
						<Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
					</Nav>
				</BootstrapNavbar.Collapse>
			</Container>
		</BootstrapNavbar>
	);
};
=======
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container d-flex justify-content-between">
				{/* Logo a la izquierda */}
				<div className="logo-container">
					<Link className="navbar-brand" to="/">
						<img src={logoInnovAI} alt="InnovAI Logo" height="40"/>
					</Link>
				</div>
				{/* Menu a la derecha */}
				<div className="menu">
					<ul className="navbar-nav d-flex flex-row">
						<li className="nav-item px-3">
							<Link className="nav-link" to="/advisor">ADVISOR</Link>
						</li>
						<li className="nav-item px-3">
							<Link className="nav-link" to="/news">NEWS</Link>
						</li>
						<li className="nav-item px-3">
							<Link className="nav-link" to="/converter">CONVERTER</Link>
						</li>
					</ul>
				</div>
				<div className="dropdown">
					<button className="btn btn-outline-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
						<i className="fas fa-user"></i>
					</button>
					<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
						<li>
							<Link className="dropdown-item" to="/login">Log In</Link>
						</li>
						<li>
							<Link className="dropdown-item" to="/signup">Sign Up</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
>>>>>>> develop
