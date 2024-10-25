import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import logoInnovAI from '../../img/logo-entero.png';
import '../../styles/navbar.css';


export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<div className="container-fluid">
				<div className="logo-container">
					<Link className="navbar-brand" to="/">
						<img src={logoInnovAI} alt="InnovAI Logo" height="40" />
					</Link>
				</div>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<div className="menu ms-auto">
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
								<Link className="dropdown-item" to={store.isLoged ? '/dashboard' : '/login'}>
									{store.isLoged ? 'Dashboard' : 'Log In'}
								</Link>
							</li>
							<li>
								{store.isLoged ? (
									<span className="dropdown-item" onClick={() => actions.logOut()}>Log Out</span>
								) : (
									<Link className="dropdown-item" to="/signup">Sign Up</Link>
								)}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
}
