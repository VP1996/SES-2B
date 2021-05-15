import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useStore } from "../../stores/helpers/UseStore";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import './BlueNavBar.scss'

function BlueNavBar(props) {
    const { studentAuth } = useStore();
    const { teacherAuth } = useStore();
    const history = useHistory();

    const logout = () => {
        studentAuth.logout(() => {
            history.push('/')
        });
        teacherAuth.logout(() => {
            history.push('/')
        });
    }

    return (
        <div className="blue-navbar">
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href={props.dashboardURL}>[authenticateUTS]</Navbar.Brand>
                <div className="nav-menu">
                    <Nav className="mr-auto">
                        <Nav.Link href={props.dashboardURL}>Dashboard</Nav.Link>
                        <Nav.Link href={props.profileURL}>Profile</Nav.Link>
                        <Nav.Link href={props.classesURL}>Classes</Nav.Link>
                        <Nav.Link href='/'><div className="logout-icon" onClick={logout}></div></Nav.Link>
                    </Nav>
                </div>
            </Navbar>
        </div>
    )

}

export default observer(BlueNavBar);