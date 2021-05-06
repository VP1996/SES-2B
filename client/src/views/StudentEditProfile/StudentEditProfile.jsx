import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import './StudentEditProfile.scss';
import 'react-calendar/dist/Calendar.css';
import NavBar from '../../components/Navbar/BlueNavBar';

class StudentEditProfile extends Component {
    constructor(props) {
        super(props);
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
                                <Button variant="outline-danger" style={{ borderRadius: '20px', width: '100px', backgroundColor: '#FED8B1' }}> Save</Button>
                            </div>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter name" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Student ID</Form.Label>
                                        <Form.Control type="text" placeholder="Enter student ID" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" placeholder="Enter any highlights, details and information you don't mind being public. Inlcude interests and hobbies." style={{ height: '150px' }} />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Year of Study</Form.Label>
                                        <Form.Control type="text" placeholder="Enter year of study" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Course</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your course" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="email" placeholder="Enter study campus" />
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