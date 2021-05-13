import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar/GreyNavBar";
import Dropdown from "../../components/LoginUserTypeDropdown/Dropdown";
import './TeacherLogin.scss'

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/helpers/UseStore";
import { useHistory } from "react-router-dom";

const TeacherLogin = () => {
  const {
    teacherAuth,
  } = useStore();
  const history = useHistory();

  const [state, setState] = useState({
    teacherID: "",
    password: ""
  });

  const clearState = () => {
    setState({
      teacherID: "",
      password: "",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(state);
    try {
      let response = await axios.post("http://localhost:5000/api/teacher/login", {
        teacherID: state.teacherID,
        password: state.password,
      });

      console.log(response.data.message);

      //Register the login in MobX's persisted state
      //Lets user refresh page and maintain auth state
      if (response.data.success) {
        teacherAuth.login({
          token: response.data.token,
          userid: response.data.userid,
          login: true
        }, () => {
          history.push('/teacher/dashboard');
        })
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="teacherLogin-view">
      <NavBar />
      <div className="signup-container">
        <Dropdown />
        <div style={{ display: 'flex' }}>
          <Card className="left-card">
            <Card.Body style={{ backgroundColor: '#62ABF3', borderRadius: '30px 0 0 30px' }}>
              <div className="right-content">
                <h4 style={{ marginLeft: '28%', color: 'white' }}> Not a Teacher?</h4>
                <Button style={{ width: '50%', height: '50px', borderRadius: '30px', backgroundColor: 'transparent', borderColor: 'white', margin: '5% 25% 5% 25%', paddingTop: '10px' }} href="/student/login"> Sign in as a Student!</Button>
                <br />
                <Button style={{ textDecorationLine: 'underline', border: 'none', backgroundColor: 'transparent', margin: '0% 25% 5% 28%', fontSize: '14px' }} href="/admin/login">I'm actually an Admin</Button>
              </div>
            </Card.Body>

          </Card>
          <Card className="right-card">
            <Card.Body>
              <h3 style={{ margin: '10%', marginTop: '20%', marginBottom: '0px', font: 'Calibri' }}>Teacher Sign In</h3>
              <Form className="student-form">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Teacher ID</Form.Label>
                  <Form.Control type="text" name="teacherID" placeholder="Enter Teacher ID" onChange={(e) =>
                    setState({ ...state, teacherID: e.target.value })
                  } />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  } />
                </Form.Group>
                <Button variant="primary" type="submit" className="login-btn" href="/teacher/dashboard" onClick={handleLogin}>
                  Submit
  </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
      <br />
    </div>
  );
};

export default observer(TeacherLogin);
