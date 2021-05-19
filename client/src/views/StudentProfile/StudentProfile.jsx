import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Calendar from 'react-calendar';
import axios from 'axios';

import './StudentProfile.scss';
import 'react-calendar/dist/Calendar.css';
import NavBar from '../../components/Navbar/BlueNavBar';

class StudentProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: '',
            classes: []
        }
    }

    componentDidMount() {
        this.fetchUserProfile();
    }

    fetchUserProfile = async () => {
        const body = {
            studentID: JSON.parse(localStorage.getItem("studentData")).userid
        }
        try {
            const response = await axios.post("http://localhost:5000/api/student/profile", body)
            this.setState({ student: response.data })
            console.log(this.state);
        } catch (e) {
            console.log(e);
        }
        let classesRes = await axios.post("http://localhost:5000/api/class/student-classes", { studentID: JSON.parse(localStorage.getItem("studentData")).userid })
        this.setState({ classes: classesRes.data.classes })
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
                            <h3>{this.state.student.name}</h3>
                                <Button variant="outline-danger" style={{ borderRadius: '20px', width: '100px' }} href="/student/profile-edit"> Edit</Button>
                                </div>
                            <p>{this.state.student.description}</p>
                            <div className="details">
                                <h6> | {this.state.student.campusLocation}, Australia |</h6>
                                <h6> | {this.state.student.email} |</h6>
                                <h6>| Study Year: {this.state.student.studyYear} |</h6>
                                <h6>| {this.state.student.userid} |</h6>
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
                            {this.state.classes.map(aClass => (
                                        <ListGroup.Item>{aClass.className}</ListGroup.Item>
                                    ))}
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