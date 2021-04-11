import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './BlueNavBar.scss'

class BlueNavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="common-navbar">
                    <Navbar bg="primary" variant="dark">
                        <Navbar.Brand href="#home">[authenticateUTS]</Navbar.Brand>
                        <div className="nav-menu">
                            <Nav className="mr-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#profile">Profile</Nav.Link>
                                <Nav.Link href="#classes">Classes</Nav.Link>
                            </Nav>
                        </div>
                    </Navbar>
                </div>
        )
    }
}

export default BlueNavBar;