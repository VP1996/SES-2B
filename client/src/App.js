import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<nav className='navbar navbar-expand-lg navbar-light bg-light'>
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
			</Router>
		);
	}
}

export default App;
