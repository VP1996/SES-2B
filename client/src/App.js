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
import StudentDashboard from "./views/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./views/TeacherDashboard/TeacherDashboard";
import StudentClasses from "./views/StudentClasses/StudentClasses";
import TeacherClasses from "./views/StudentClasses/StudentClasses";

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Switch>
					{' '}
					<Route path='/' exact component={Home} />
					<Route path='/student-login' exact component={StudentLogin} />
					<Route path='/teacher-login' exact component={TeacherLogin} />
					<Route path='/student-dashboard' exact component={StudentDashboard} />
					<Route path='/teacher-dashboard' exact component={TeacherDashboard} />
					<Route path='/student-classes' exact component={StudentClasses} />
					<Route path='/teacher-classes' exact component={TeacherClasses} />

				</Switch>
			</Router>
		</div>
	);
};

export default App;
