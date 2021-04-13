import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './GreyNavBar.scss'

class GreyNavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="grey-navbar">
                    <Navbar style={{backgroundColor: 'lightgrey'}}>
                        <Navbar.Brand href="/">[authenticateUTS]</Navbar.Brand>
                        <div className="nav-menu">
                            <Nav className="mr-auto">
                                <Nav.Link href="/student-login">Student Login</Nav.Link>
                                <Nav.Link href="/teacher-login">Teacher Login</Nav.Link>
                            </Nav>
                        </div>
                    </Navbar>
                </div>
        )
    }
}

export default GreyNavBar;