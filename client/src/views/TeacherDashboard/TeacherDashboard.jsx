import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Calendar from 'react-calendar';
import axios from 'axios';

import './TeacherDashboard.scss';
import 'react-calendar/dist/Calendar.css';
import NavBar from '../../components/Navbar/BlueNavBar';

class TeacherDasboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: [],
            teacher: ''
        }
    }

    async componentDidMount() {
        let classesRes = await axios.get("http://localhost:5000/api/class/teacher-classes", { teacherID: JSON.parse(localStorage.getItem("teacherData")).userid })
        this.setState({ classes: classesRes.data.classes })

        try {
            const response = await axios.post("http://localhost:5000/api/teacher/profile", { teacherID: JSON.parse(localStorage.getItem("teacherData")).userid })
            // console.log(response)
            this.setState({ teacher: response.data })

            //get classes from backend
        } catch (e) {
            console.log(e);
        }
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
                                {this.state.teacher.description}

                    </Card.Text>
                            <div className="links">
                                <Button className="profile-btn" size="large" href="/teacher/profile">Profile &gt;</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    {/* // card#2 */}
                    <Card style={{ width: '28%', height: '19.5rem' }}>
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