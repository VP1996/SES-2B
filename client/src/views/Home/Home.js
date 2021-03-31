import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import NavBar from '../../components/Navbar/Navbar';

const Home = () => {
	return (
		<div className='container'>
			<NavBar />
			<h1>Testing routing: HOME</h1>
		</div>
	);
};

export default Home;
