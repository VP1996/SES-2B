import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import NavBar from '../../components/Navbar/GreyNavBar';
import Carousel from 'react-bootstrap/Carousel';


const Home = () => {
	return (
		<div className='homepage-view'>
			<NavBar />
			<Carousel style={{ width: '90%', margin: 'auto', marginTop: '20px' }}>
				<Carousel.Item interval={3000}>
					<div className="img-1"></div>
					<Carousel.Caption>
						<p>UTS Library</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item interval={3000}>
					<div className="img-2"></div>
					<Carousel.Caption>
						<p>UTS</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item interval={3000}>
					<div className="img-3"></div>
					<Carousel.Caption>
						<p>Reading Room, Building 2</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
			<p style={{fontSize:'x-large', textAlign:'center', marginTop: '20px'}}>The easy way of attending class!</p>
			
			<p className="information">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

		</div>
	);
};

export default Home;
