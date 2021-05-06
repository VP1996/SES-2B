import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Calendar from 'react-calendar';

import './StudentProfile.scss';
import 'react-calendar/dist/Calendar.css';
import NavBar from '../../components/Navbar/BlueNavBar';

class StudentProfile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="profile-view">
                <NavBar dashboardURL='/student/dashboard' profileURL='/student/profile' classesURL='/student/classes' />
                <h4 style={{ paddingTop: '20px' }}>Student Profile</h4>
                <Card className="profile-container">

                    <div className="information-section">
                        <div className="profile-img"></div>
                        <div className="right-information">
                            <div className="heading">
                            <h3>Kate Wilson</h3>
                                <Button variant="outline-danger" style={{ borderRadius: '20px', width: '100px' }} href="/student/profile-edit"> Edit</Button>
                                </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies maximus mauris, id fringilla massa consequat et. Nam vitae massa scelerisque quam convallis cursus a non libero. Nullam aliquam vehicula porttitor. Proin in nibh nec magna dignissim vestibulum. Phasellus rutrum dolor facilisis justo cursus aliquet. In hac habitasse platea dictumst. Nulla semper mauris a justo vulputate, ac lacinia mauris bibendum. Nullam pretium pharetra nisi, ut tincidunt quam elementum eu.</p>
                            <div className="details">
                                <h6> | Sydney, Australia |</h6>
                                <h6> | katewilson@student.uts.edu.au |</h6>
                                <h6>| Student for 1 year |</h6>
                                <h6>| 152560 |</h6>
                            </div>
                        </div>

                    </div>

                    <div className="profile-bottom">
                        <Card className="bottom-cards">
                            <h6 style={{ margin: '15px', color: 'grey' }}>Class Time Distribution</h6>
                            <div className="graph-img"></div>
                        </Card>
                        <Card className="bottom-cards">
                            <h6 style={{ margin: '15px', color: 'grey' }}>Classes Allocated</h6>
                            <ListGroup variant="flush" style={{ height: '100%' }}>
                                <ListGroup.Item>Mathematical Modelling 1</ListGroup.Item>
                                <ListGroup.Item>Engineering Communications</ListGroup.Item>
                                <ListGroup.Item>Programming Fundamentals</ListGroup.Item>
                                <ListGroup.Item>Data Structures and Algorithms</ListGroup.Item>
                            </ListGroup>
                        </Card>
                        <Card className="bottom-cards">
                            <h6 style={{ margin: '15px', color: 'grey', marginBottom: '0px' }}>Calender</h6>
                            <Calendar />
                        </Card>
                    </div>
                </Card>


            </div>
        )
    }
}

export default StudentProfile;