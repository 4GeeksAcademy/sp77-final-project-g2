import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import logo from '../../img/logo-entero.png';

export const Navbar = () => {
	return (
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
                        <Nav.Link as={Link} to="/advisor">ChatAI</Nav.Link>
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