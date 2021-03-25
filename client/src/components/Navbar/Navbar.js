import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Navbar = () => {
	return (
		<div className='container'>
			<nav className='navbar navbar-expand-lg navbar-light'>
				<Link to='/' className='navbar-brand'>
					Multi-Factor Authentication
				</Link>
				<div className='collpase navbar-collapse'>
					<ul className='navbar-nav mr-auto'>
						<li className='navbar-item'>
							<Link to='/' className='nav-link'>
								Home
							</Link>
						</li>
						<li className='navbar-item'>
							<Link to='/Student' className='nav-link'>
								Student
							</Link>
						</li>
						<li className='navbar-item'>
							<Link to='/Teacher' className='nav-link'>
								Teacher
							</Link>
						</li>
					</ul>
				</div>
			</nav>
			<br />
		</div>
	);
};

export default Navbar;
