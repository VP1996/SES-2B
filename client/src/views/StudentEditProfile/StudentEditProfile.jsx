import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import axios from 'axios';

import './StudentEditProfile.scss';
import 'react-calendar/dist/Calendar.css';
import NavBar from '../../components/Navbar/BlueNavBar';

class StudentEditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: '',
            studentID: '',
            studentPassword: '',
            studentName: '',
            studentYear: '',
            studentCourse: '',
            studentEmail: '',
            studentLocation: '',
            studentDescription: ''
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.post("http://localhost:5000/api/student/profile", { studentID: JSON.parse(localStorage.getItem("studentData")).userid })
            console.log(response)
            this.setState({ student: response.data })
            this.setState({ studentID: this.state.student.userid })
            this.setState({ studentPassword: this.state.student.password })
            this.setState({ studentName: this.state.student.name })
            this.setState({ studentYear: this.state.student.studyYear })
            this.setState({ studentCourse: this.state.student.course })
            this.setState({ studentEmail: this.state.student.email })
            this.setState({ studentLocation: this.state.student.campusLocation })
            this.setState({ studentDescription: this.state.student.description })
        } catch (e) {
            console.log(e);
        }
    }

    onChange = (e) => {
        if (e.target.value !== "") {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    onSave = async (e) => {
        e.preventDefault();
        console.log(this.state);
        try {
            let response = await axios.post('http://localhost:5000/api/student/edit', this.state)
            console.log(response.data.message);
        } catch (e) {
            console.log("Could not update student");
            console.log(e.message);

        }
    }

    render() {
        return (
            <div className="profile-view">
                <NavBar dashboardURL='/student/dashboard' profileURL='/student/profile' classesURL='/student/classes' />
                <h4 style={{ paddingTop: '20px' }}>Edit Student Profile</h4>
                <Card className="profile-container">
                    <div className="information-section">
                        <div>
                            <div className="profile-img"></div>
                            <Button variant="outline-secondary" style={{marginLeft:'40%', borderRadius:'20px', width: '32%'}}>Change</Button>
                        </div>
                        <div className="right-information">
                            <div className="heading">
                                <h3>Student Profile</h3>
                                <Button variant="outline-danger" style={{ borderRadius: '20px', width: '100px', backgroundColor: '#FED8B1' }} onClick={this.onSave}> Save</Button>
                            </div>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder={this.state.student.name}
                                            disabled={true} name="studentName"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Student ID</Form.Label>
                                        <Form.Control type="text" placeholder={this.state.student.userid} disabled={true} name="studentID" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" placeholder={this.state.student.description} style={{ height: '150px' }} name="studentDescription" onChange={this.onChange} style={{ height: '150px' }} />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Year of Study</Form.Label>
                                        <Form.Control type="text" placeholder={this.state.student.studyYear} name="studentYear" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Course</Form.Label>
                                        <Form.Control type="text" placeholder={this.state.student.course} name="studentCourse" onChange={this.onChange}  />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" placeholder={this.state.student.email} name="studentEmail" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="email" placeholder={this.state.student.campusLocation} name="studentLocation" onChange={this.onChange}  />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </div>

                    </div>
                </Card>
            </div>
        )
    }
}

export default StudentEditProfile;