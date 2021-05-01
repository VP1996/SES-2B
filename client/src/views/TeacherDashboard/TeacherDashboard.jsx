import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Calendar from 'react-calendar';

import './TeacherDashboard.scss';
import 'react-calendar/dist/Calendar.css';
import NavBar from '../../components/Navbar/BlueNavBar';

class TeacherDasboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dashboard-view">
                <NavBar dashboardURL='/teacher/dashboard' profileURL='/teacher/profile' classesURL='/teacher/classes'/>
                <h4 style={{paddingTop:'20px'}}>Dashboard</h4>
                <div className="horizontal-cards">
                    {/* // card #1 */}
                    <Card style={{ width: '38%', height: '19.5rem' }}>
                        <Card.Body>
                            <Card.Title>Your Teacher Profile</Card.Title>
                            <Card.Text>
                                Hi Kate, you can view/update your personal information by visiting
                                your profile. For facial recognition you can also add your images which
                                can be used to match later. Lorem ipsum dolor sit amet, consectetur
                                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua.

                    </Card.Text>
                            <div className="links">
                                <Button className="profile-btn" size="large" href="/teacher/profile">Profile &gt;</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    {/* // card#2 */}
                    <Card style={{ width: '28%', height: '19.5rem' }}>
                        <Card.Body>
                            <Card.Title>Today's Classes</Card.Title>
                            <Card.Text>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Mathematical Modelling 1</ListGroup.Item>
                                    <ListGroup.Item>Engineering Communications</ListGroup.Item>
                                    <ListGroup.Item>Programming Fundamentals</ListGroup.Item>
                                    <ListGroup.Item>Data Structures and Algorithms</ListGroup.Item>
                                </ListGroup>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    {/* // card #3 */}
                    <Card style={{ width: '28%', height: '19.5rem' }}>
                        <Card.Body>
                            <Card.Title style={{ marginBottom: '0px' }}>Calendar</Card.Title>
                            <Calendar />
                        </Card.Body>
                    </Card>
                </div>

                <div className="dropdown-divider">
                    <Dropdown.Divider />
                </div>
                <h5>Recent Classes Taught</h5>
                <div className="recent-classes-cards">
                    {/* // card #1 */}
                    <Card style={{ width: '20rem' , backgroundColor: 'rgb(0,128,128, 0.2)'}}>
                        <Card.Body>
                            <Card.Title>EPP2</Card.Title>
                            <div className="card-body-items">
                                <Card.Text className="recent-class-text">Engineering Practice Preparation 2</Card.Text>
                                <div className="lecture-img"></div>
                            </div>
                        </Card.Body>
                    </Card>
                    {/* // card#2 */}
                    <Card style={{ width: '20rem' , backgroundColor: 'rgb(255,0,0, 0.3)'}}>
                        <Card.Body>
                            <Card.Title>MM1</Card.Title>
                            <div className="card-body-items">
                                <Card.Text className="recent-class-text">Mathematical Modelling 1</Card.Text>
                                <div className="lecture-img"></div>
                            </div>

                        </Card.Body>
                    </Card>
                    {/* // card #3 */}
                    <Card style={{ width: '20rem' , backgroundColor: 'rgb(128,0,128, 0.2)'}}>
                        <Card.Body>
                            <Card.Title>BRM12</Card.Title>
                            <div className="card-body-items">
                                <Card.Text className="recent-class-text">Business Requirements Modelling</Card.Text>
                                <div className="lecture-img"></div>
                            </div>
                        </Card.Body>
                    </Card>
                    {/* // card #4 */}
                    <Card style={{ width: '20rem', backgroundColor: 'rgb(255,255, 0, 0.3)' }}>
                        <Card.Body>
                            <Card.Title>EPR1</Card.Title>
                            <div className="card-body-items">

                                <Card.Text className="recent-class-text">Engineering Practice Reflection 1</Card.Text>
                                <div className="lecture-img"></div>
                            </div>

                        </Card.Body>
                    </Card>
                </div>
                <div className=""></div>
            </div>
        )
    }
}

export default TeacherDasboard;