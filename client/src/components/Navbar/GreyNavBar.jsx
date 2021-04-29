import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import './GreyNavBar.scss'

class GreyNavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="grey-navbar">
                <Navbar style={{ backgroundColor: 'lightgrey' }}>
                    <Navbar.Brand href="/">[authenticateUTS]</Navbar.Brand>
                    <div className="nav-menu">
                        <Nav className="mr-auto">
                            
                            <Button variant="outline-primary" style={{width:'90px', borderRadius: '20px'}} href='/student/login'>Login</Button>
                        </Nav>
                    </div>
                </Navbar>
            </div>
        )
    }
}

export default GreyNavBar;