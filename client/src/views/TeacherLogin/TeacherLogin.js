import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TeacherLogin = () => {
  return (
    <div className="container">
      <NavBar />

      <h1 class="font-weight-bold">Teacher log In</h1>
      <container>
        <Row md={{ span: 6, offset: 6 }}>
          <Col>
            <Card bg={"light"} style={{ width: "18rem-" }}>
              <Card.Body>
                <Form
                  action="/handle-login"
                  method="post"
                  class="was-validated"
                >
                  <Form.Group controlId="loginFormEmail">
                    <Form.Label class="font-weight-bold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      required
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="loginFormPassword">
                    <Form.Label class="font-weight-bold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="loginFormCheckbox">
                    <Form.Check type="checkbox" label="ReCaptcha" required />
                  </Form.Group>
                  <button type="submit" class="btn btn-outline-info">
                    Submit
                  </button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </container>
      <br />
    </div>
  );
};

export default TeacherLogin;
