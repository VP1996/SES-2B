import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar/GreyNavBar";
import './StudentLogin.scss'

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const StudentLogin = () => {
  return (
    <div className="studentLogin-view">
      <NavBar />
      <div className="signup-container">
        <Card className="left-card">
          <Card.Body>
            <h3 style={{ margin: '10%', marginTop: '20%', marginBottom: '0px', font: 'Calibri' }}>Student Sign In</h3>
            <Form className="student-form">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
    </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit" className="login-btn">
                Submit
  </Button>
            </Form>
          </Card.Body>
        </Card>
        <Card className="right-card">
          <Card.Body style={{ backgroundColor: '#62ABF3', borderRadius: '0 30px 30px 0' }}>
            <div className="right-content">
              <h4 style={{ marginLeft: '28%', color: 'white' }}> Not a Student?</h4>
              <Button style={{ width: '50%', height: '50px', borderRadius: '30px', backgroundColor: 'transparent', borderColor: 'white', margin: '5% 25% 5% 25%', paddingTop: '10px'}}  href="/teacher-login"> Sign in as a Teacher!</Button>
              <br />
              <Button style={{ textDecorationLine: 'underline', border: 'none', backgroundColor: 'transparent', margin: '0% 25% 5% 28%', fontSize: '14px' }} href="/teacher-login">I'm actually an Admin</Button>
            </div>
          </Card.Body>
        </Card>

      </div>
      <br />
    </div>
  );
};

export default StudentLogin;
