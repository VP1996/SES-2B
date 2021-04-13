import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "./TeacherLogin.css";
import Button from "react-bootstrap/Button";

const TeacherLogin = () => {
  return (
    <div className="container">
      <NavBar />

      <Row className="shadow-lg rounded center">
        <Col className="box-color">
          <h4 className="center-text">Not a Teacher?</h4>
          <p className="center-two">
            <Button variant="outline-light" href="/student-login">
              Log in as a Student!
            </Button>
          </p>
        </Col>
        <Col>
          <br />
          <h3>Teacher log In</h3>
          <container>
            <Col>
              <card>
                <form
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
                </form>
              </card>
              <br />
            </Col>
          </container>
        </Col>
      </Row>

      <div class="card" className=" shadow-lg rounded button-corner">
        <div class="card-body">
          <Row>
            <div class="col-6 text-center box-color">
              <h4 className="center-text">Not a Teacher?</h4>
              <p className="center-two">
                <Button variant="outline-light" href="/student-login">
                  Log in as a Student!
                </Button>
              </p>
            </div>
            <div class="col-6">
              <br />
              <h3>Teacher log In</h3>
              <form action="/handle-login" method="post" class="was-validated">
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
              </form>
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
