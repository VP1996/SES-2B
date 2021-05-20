import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Calendar from 'react-calendar';
import axios from 'axios';

import './TeacherProfile.scss';
import 'react-calendar/dist/Calendar.css';
import NavBar from '../../components/Navbar/BlueNavBar';

class TeacherProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teacher: '',
            classes: []
        }
    }

    componentDidMount() {
        this.fetchUserProfile();
    }

    fetchUserProfile = async () => {
        const body = {
            teacherID: JSON.parse(localStorage.getItem("teacherData")).userid
        }
        try {
            const response = await axios.post("http://localhost:5000/api/teacher/profile", body)
            this.setState({ teacher: response.data })
            console.log(this.state);
        } catch (e) {
            console.log(e);
        }
        let classesRes = await axios.post("http://localhost:5000/api/class/teacher-classes", { teacherID: JSON.parse(localStorage.getItem("teacherData")).userid })
        this.setState({ classes: classesRes.data.classes })
    }

    render() {
        return (
            <div className="profile-view">
                <NavBar dashboardURL='/teacher/dashboard' profileURL='/teacher/profile' classesURL='/teacher/classes' />
                <h4 style={{ paddingTop: '20px' }}>Teacher Profile</h4>
                <Card className="profile-container">

                    <div className="information-section">
                        <div className="profile-img"></div>
                        <div className="right-information">
                            <div className="heading">
                                <h3>{this.state.teacher.name}</h3>
                                <Button variant="outline-danger" style={{ borderRadius: '20px', width: '100px' }} href="/teacher/profile-edit"> Edit</Button>
                            </div>
                            <p>{this.state.teacher.description}</p>
                            <div className="details">
                                <h6> | {this.state.teacher.campusLocation}, Australia |</h6>
                                <h6> | {this.state.teacher.email} |</h6>
                                <h6>| Teaching Year: {this.state.teacher.teachingYear} |</h6>
                                <h6>| {this.state.teacher.userid} |</h6>
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

export default TeacherProfile;