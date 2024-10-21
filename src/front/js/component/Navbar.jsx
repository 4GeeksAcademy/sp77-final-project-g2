import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import logoInnovAI from '../../img/logo-entero.png'

export const Navbar = () => {
	// const {store, actions} = useContext(Context);
	// const navigate = useNavigate();

	return (
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
			</div>
		</nav>
	);
}