import React from 'react';
import NavBar from '../../components/Navbar/BlueNavBar';
import Card from "react-bootstrap/Card";
import "./AdminDashboard.scss";
import studentProfile from "../../images/studentProfile.png";
import teacherProfile from "../../images/teacherProfile.png";
import createClasses from "../../images/createClasses.png";
import {useHistory} from "react-router-dom";

const AdminDashboard = function () {
    const history = useHistory();
    return (
        <div className="dashboard-view">
            <NavBar dashboardURL='/student/dashboard' profileURL='/student/profile' classesURL='/student/classes'/>
            <div className="card-container">
                <Card className="box" onClick={() => history.push("/admin/teachers")}>
                    <Card.Body>
                        <Card.Title>View/Edit Teacher Profiles</Card.Title>
                        <Card.Text>
                            <img src={teacherProfile} style={{width: '100px', margin: '10px 0px 0px 20px'}}/>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="box" onClick={() => history.push("/admin/students")}>
                    <Card.Body>
                        <Card.Title>View/Edit Student Profiles</Card.Title>
                        <Card.Text>
                            <img src={studentProfile} style={{width: '120px', margin: '15px 0 0 10px'}}/>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="box" onClick={() => history.push("/admin/home")}>
                    <Card.Body>
                        <Card.Title>Create/Edit Classes</Card.Title>
                        <Card.Text>
                            <img src={createClasses} style={{width: '100px', margin: '30px 0px 0px 20px'}}/>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default AdminDashboard
