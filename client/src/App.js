import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from 'react-router-dom';
import Home from './views/Home/Home';

import StudentLogin from './views/StudentLogin/StudentLogin';
import TeacherLogin from './views/TeacherLogin/TeacherLogin';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Switch>
					{' '}
					<Route path='/' exact component={Home} />
					<Route path='/student-login' exact component={StudentLogin} />
					<Route path='/teacher-login' exact component={TeacherLogin} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
