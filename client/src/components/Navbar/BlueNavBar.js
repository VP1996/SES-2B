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
            <div className="blue-navbar">
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href={this.props.dashboardURL}>[authenticateUTS]</Navbar.Brand>
                    <div className="nav-menu">
                        <Nav className="mr-auto">
                            <Nav.Link href={this.props.dashboardURL}>Dashboard</Nav.Link>
                            <Nav.Link href={this.props.profileURL}>Profile</Nav.Link>
                            <Nav.Link href={this.props.classesURL}>Classes</Nav.Link>
                            <Nav.Link href='/'><div className="logout-icon"></div></Nav.Link>
                        </Nav>
                    </div>
                </Navbar>
            </div>
        )
    }
}

export default BlueNavBar;