import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import axios from 'axios';

import './TeacherEditProfile.scss';
import 'react-calendar/dist/Calendar.css';
import NavBar from '../../components/Navbar/BlueNavBar';

class TeacherEditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teacher: '',
            teacherID: '',
            tecaherPassword: '',
            teacherName: '',
            teacherYear: '',
            teacherFaculty: '',
            teacherEmail: '',
            teacherLocation: '',
            teacherDescription: ''
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.post("http://localhost:5000/api/teacher/profile", { teacherID: JSON.parse(localStorage.getItem("teacherData")).userid })
            // console.log(response)
            this.setState({ teacher: response.data })
            this.setState({ teacherID: this.state.teacher.userid })
            this.setState({ tecaherPassword: this.state.teacher.password })
            this.setState({ teacherName: this.state.teacher.name })
            this.setState({ teacherYear: this.state.teacher.teachingYear })
            this.setState({ teacherFaculty: this.state.teacher.faculty })
            this.setState({ teacherEmail: this.state.teacher.email })
            this.setState({ teacherLocation: this.state.teacher.campusLocation })
            this.setState({ teacherDescription: this.state.teacher.description })
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
        // console.log(this.state);
        try {
            let response = await axios.post('http://localhost:5000/api/teacher/edit', this.state)
            console.log(response.data.message);
        } catch (e) {
            console.log("Could not update teacher");
            console.log(e.message);

        }
    }

    render() {
        return (
            <div className="profile-view">
                <NavBar dashboardURL='/teacher/dashboard' profileURL='/teacher/profile' classesURL='/teacher/classes' />
                <h4 style={{ paddingTop: '20px' }}>Edit Teacher Profile</h4>
                <Card className="profile-container">
                    <div className="information-section">
                        <div>
                            <div className="profile-img"></div>
                            <Button variant="outline-secondary" style={{ marginLeft: '40%', borderRadius: '20px', width: '32%' }}>Change</Button>
                        </div>
                        <div className="right-information">
                            <div className="heading">
                                <h3>Teacher Profile</h3>
                                <Button variant="outline-danger" style={{ borderRadius: '20px', width: '100px', backgroundColor: '#FED8B1' }} onClick={this.onSave}>Save</Button>
                            </div>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder={this.state.teacher.name}
                                            disabled={true} name="teacherName" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Teacher ID</Form.Label>
                                        <Form.Control type="text" placeholder={this.state.teacher.userid} disabled={true} name="teacherID" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" placeholder={this.state.teacher.description} style={{ height: '150px' }} name="teacherDescription" onChange={this.onChange} />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="email" placeholder='********' name="teacherPassword" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" placeholder={this.state.teacher.email} name="teacherEmail" onChange={this.onChange} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Years at UTS </Form.Label>
                                        <Form.Control type="text" placeholder={this.state.teacher.teachingYear} name="teacherYear" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Faculty</Form.Label>
                                        <Form.Control type="text" placeholder={this.state.teacher.faculty} name="teacherFaculty" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="text" placeholder={this.state.teacher.campusLocation} name="teacherLocation" onChange={this.onChange} />
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

export default TeacherEditProfile;