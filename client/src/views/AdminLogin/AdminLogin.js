import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar/GreyNavBar";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StudentLogin = () => {
  return (
    <div className="">
      <NavBar />
      <div className="dashboard-view" style={{ width: '40%', margin: 'auto', marginTop: '50px'}}>
      <h4>Admin log In</h4>
        <Row md={{ span: 6, offset: 6 }}>
          <Col>
            <Card bg={"light"} style={{ width: "18rem-" }}>
              <Card.Body>
                <Form
                  action="/admin/dashboard"
                  method="get"
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
                  <button type="submit" class="btn btn-outline-info">
                    Submit
                  </button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </div>
      <br />
    </div>
  );
};

export default StudentLogin;
