import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './views/Home/Home';
import StudentLogin from './views/StudentLogin/StudentLogin';
import TeacherLogin from './views/TeacherLogin/TeacherLogin';
import AdminLogin from './views/AdminLogin/AdminLogin';
import StudentDashboard from "./views/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./views/TeacherDashboard/TeacherDashboard";
import AdminDashboard from "./views/AdminDashboard/AdminDashboard";
import AdminStudents from "./views/AdminHome/students";
import AdminTeachers from "./views/AdminHome/teachers";
import StudentClasses from "./views/StudentClasses/StudentClasses";
import TeacherClasses from "./views/TeacherClasses/TeacherClasses";
import StudentProfile from "./views/StudentProfile/StudentProfile";
import TeacherProfile from "./views/TeacherProfile/TeacherProfile";
import StudentEditProfile from "./views/StudentEditProfile/StudentEditProfile";
import TeacherEditProfile from "./views/TeacherEditProfile/TeacherEditProfile";


const App = () => {
	return (
		<div className='App'>
			<Router>
				<Switch>
					{' '}
					<Route path='/' exact component={Home} />
					<Route path='/student/login' exact component={StudentLogin} />
					<Route path='/teacher/login' exact component={TeacherLogin} />
					<Route path='/admin/login' exact component={AdminLogin} />
					<Route path='/student/dashboard' exact component={StudentDashboard} />
					<Route path='/teacher/dashboard' exact component={TeacherDashboard} />
					<Route path='/admin/dashboard' exact component={AdminDashboard} />
					<Route path='/admin/teachers' exact component={AdminTeachers} />
					<Route path='/admin/students' exact component={AdminStudents} />
					<Route path='/student/classes' exact component={StudentClasses} />
					<Route path='/teacher/classes' exact component={TeacherClasses} />
					<Route path='/student/profile' exact component={StudentProfile} />
					<Route path='/teacher/profile' exact component={TeacherProfile} />
					<Route path='/student/profile-edit' exact component={StudentEditProfile} />
					<Route path='/teacher/profile-edit' exact component={TeacherEditProfile} />


				</Switch>
			</Router>
		</div>
	);
};

export default App;
