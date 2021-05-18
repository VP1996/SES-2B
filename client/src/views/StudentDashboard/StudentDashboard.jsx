import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Calendar from 'react-calendar';
import axios from 'axios';

import './StudentDashboard.scss';
import 'react-calendar/dist/Calendar.css';
import NavBar from '../../components/Navbar/BlueNavBar';

class StudentDasboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: [],
            student: '',
        }
    }

    async componentDidMount() {
        let classesRes = await axios.post("http://localhost:5000/api/class/student-classes", { studentID: JSON.parse(localStorage.getItem("studentData")).userid })
        this.setState({ classes: classesRes.data.classes })

        axios.post("http://localhost:5000/api/student/profile", { studentID: JSON.parse(localStorage.getItem("studentData")).userid }).then(response => { this.setState({ student: response.data }) });
    }

    render() {
        return (
            <div className="dashboard-view">
                <NavBar dashboardURL='/student/dashboard' profileURL='/student/profile' classesURL='/student/classes' />
                <h4 style={{ paddingTop: '20px' }}>Dashboard</h4>
                <div className="horizontal-cards">
                    {/* // card #1 */}
                    <Card style={{ width: '35rem', height: '19.5rem' }}>
                        <Card.Body>
                            <Card.Title>Your Student Profile</Card.Title>
                            <Card.Text style={{ height: '100%' }}>
                                {this.state.student.description}
                            </Card.Text>
                            <div className="links">
                                <Button className="profile-btn" size="large" href="/student/profile">Profile &gt;</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    {/* // card#2 */}
                    <Card style={{ width: '25rem', height: '19.5rem' }}>
                        <Card.Body>
                            <Card.Title>Your Classes</Card.Title>
                            <Card.Text>
                                <ListGroup variant="flush">
                                    {this.state.classes.map(aClass => (
                                    <ListGroup.Item>{aClass.className}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    {/* // card #3 */}
                    <Card style={{ width: '25rem', height: '19.5rem' }}>
                        <Card.Body>
                            <Card.Title style={{ marginBottom: '0px' }}>Calendar</Card.Title>
                            <Calendar />
                        </Card.Body>
                    </Card>
                </div>

                <div className="dropdown-divider">
                    <Dropdown.Divider />
                </div>
                <h5>Recently Attended Classes</h5>
                <div className="recent-classes-cards">
                    {/* // card #1 */}
                    <Card style={{ width: '20rem', backgroundColor: 'rgb(0,128,128, 0.2)' }}>
                        <Card.Body>
                            <Card.Title>EPP2</Card.Title>
                            <div className="card-body-items">
                                <Card.Text className="recent-class-text">Engineering Practice Preparation 2</Card.Text>
                                <div className="lecture-img"></div>
                            </div>
                        </Card.Body>
                    </Card>
                    {/* // card#2 */}
                    <Card style={{ width: '20rem', backgroundColor: 'rgb(255,0,0, 0.3)' }}>
                        <Card.Body>
                            <Card.Title>MM1</Card.Title>
                            <div className="card-body-items">
                                <Card.Text className="recent-class-text">Mathematical Modelling 1</Card.Text>
                                <div className="lecture-img"></div>
                            </div>

                        </Card.Body>
                    </Card>
                    {/* // card #3 */}
                    <Card style={{ width: '20rem', backgroundColor: 'rgb(128,0,128, 0.2)' }}>
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

export default StudentDasboard;