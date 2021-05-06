import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar/GreyNavBar";
import Dropdown from "../../components/LoginUserTypeDropdown/Dropdown";
import axios from 'axios';

import './StudentLogin.scss'

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/*state = {
  email: '',
  password: '',
};

handleSubmit = (event) => {
  event.preventDefault();
  const {email, password} = this.state;
  axios({
     url: "", //database link
     method: "POST",
     data: {
      email,
      password
    }
  })

  .then(response => {
      console.log('Data: ', response.data);
  })
  .catch(error => {
      console.log('Error: ', error.response);
  });
};

handleChange = event => {
  const {name, value} = event.target;
  this.setState({
    [name]: value
  })
};*/


const StudentLogin = () => {
  return (
    <div className="studentLogin-view">
      <NavBar />
      <div className="signup-container">
          <Dropdown/>
        <div style={{display:'flex'}}>
          <Card className="left-card shadow-lg">
            <Card.Body>
              <h3 style={{ margin: '10%', marginTop: '20%', marginBottom: '0px', font: 'Calibri' }}>Student Sign In</h3>
              <Form className="student-form">
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="usernameName" placeholder="Enter Username" /*onChange={this.handleChange}*/ />
                  
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" /*onChange={this.handleChange}*//>
                </Form.Group>

                <Button variant="primary" type="submit" className="login-btn" href="/student/dashboard">
                  Submit
  </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="right-card shadow-lg">
            <Card.Body style={{ backgroundColor: '#62ABF3', borderRadius: '0 30px 30px 0' }}>
              <div className="right-content">
                <h4 style={{ marginLeft: '28%', color: 'white' }}> Not a Student?</h4>
                <Button style={{ width: '50%', height: '50px', borderRadius: '30px', backgroundColor: 'transparent', borderColor: 'white', margin: '5% 25% 5% 25%', paddingTop: '10px' }} href="/teacher/login"> Sign in as a Teacher!</Button>
                <br />
                <Button style={{ textDecorationLine: 'underline', border: 'none', backgroundColor: 'transparent', margin: '0% 25% 5% 28%', fontSize: '14px' }} href="/admin/login">I'm actually an Admin</Button>
              </div>
            </Card.Body>
          </Card>
        </div>


      </div>
      <br />
    </div>
  );
};

export default StudentLogin;
