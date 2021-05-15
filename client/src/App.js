import React, { useEffect } from 'react';
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
import AdminClasses from "./views/AdminHome/classes";
import StudentClasses from "./views/StudentClasses/StudentClasses";
import TeacherClasses from "./views/TeacherClasses/TeacherClasses";
import StudentProfile from "./views/StudentProfile/StudentProfile";
import TeacherProfile from "./views/TeacherProfile/TeacherProfile";
import StudentEditProfile from "./views/StudentEditProfile/StudentEditProfile";
import TeacherEditProfile from "./views/TeacherEditProfile/TeacherEditProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "react-router-dom";
import { useStore } from "./stores/helpers/UseStore";
import { observer } from "mobx-react-lite";
import StudentRoute from "./utils/StudentRoute";
import UnprotectedRoute from "./utils/UnprotectedRoute";
import TeacherRoute from "./utils/TeacherRoute";

const App = () => {
	const { studentAuth } = useStore(); //MobX persisted store
	const { teacherAuth } = useStore(); //MobX persisted store

	//Check if the authentication state is valid on page mount
	console.log(JSON.stringify(studentAuth));
	console.log(JSON.stringify(teacherAuth));

	useEffect(() => {
		studentAuth.validateToken();
		teacherAuth.validateToken();
	}, []);

	return (
		<div id='App'>
			<UnprotectedRoute path='/' exact component={Home}/>
			<UnprotectedRoute path='/student/login' exact component={StudentLogin} client='student'/>
			<UnprotectedRoute path='/teacher/login' exact component={TeacherLogin} />
			<UnprotectedRoute path='/admin/login' exact component={AdminLogin} />
			
			{studentAuth.loggedIn || teacherAuth.loggedIn}
			<div className="component-wrapper">
				<StudentRoute path='/student/dashboard' exact component={StudentDashboard} />
				<TeacherRoute path='/teacher/dashboard' exact component={TeacherDashboard}/>
				<UnprotectedRoute path='/admin/dashboard' exact component={AdminDashboard}/>
				<UnprotectedRoute path='/admin/teachers' exact component={AdminTeachers}/>
				<UnprotectedRoute path='/admin/students' exact component={AdminStudents}/>
				<UnprotectedRoute path='/admin/classes' exact component={AdminClasses}/>
				<StudentRoute path='/student/classes' exact component={StudentClasses}/>
				<TeacherRoute path='/teacher/classes' exact component={TeacherClasses}/>
				<StudentRoute path='/student/profile' exact component={StudentProfile}/>
				<TeacherRoute path='/teacher/profile' exact component={TeacherProfile}/>
				<StudentRoute path='/student/profile-edit' exact component={StudentEditProfile}/>
				<TeacherRoute path='/teacher/profile-edit' exact component={TeacherEditProfile}/>
			</div>
			{/* <ToastContainer
				position="top-center"
				autoClose={3000}
				pauseOnHover
			/> */}
		</div>
	);
};

export default withRouter(observer(App));
