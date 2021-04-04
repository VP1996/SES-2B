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
import StudentHome from "./views/StudentHome/StudentHome";

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Switch>
					{' '}
					<Route path='/' exact component={Home} />
					<Route path='/student-login' exact component={StudentLogin} />
					<Route path='/teacher-login' exact component={TeacherLogin} />
					<Route path='/student-home' exact component={StudentHome} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
