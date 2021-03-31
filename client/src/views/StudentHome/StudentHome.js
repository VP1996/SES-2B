import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/Navbar/Navbar';

const Student = () => {
	return (
		<div className='container'>
			<NavBar />
			<h1>Student Profile</h1>
			<br />
		</div>
	);
};

export default Student;
