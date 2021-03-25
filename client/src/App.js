import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from 'react-router-dom';
import Home from './components/Home/Home';

import Student from './components/Studenthome/Studenthome';
import Teacher from './components/Teacherhome/Teacherhome';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Switch>
					{' '}
					<Route path='/' exact component={Home} />
					<Route path='/Student' exact component={Student} />
					<Route path='/Teacher' exact component={Teacher} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
