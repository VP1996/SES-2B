import React from 'react';
import NavBar from '../../components/Navbar/BlueNavBar';
import Card from "react-bootstrap/Card";
import "./AdminDashboard.scss";
import {useHistory} from "react-router-dom";

const AdminDashboard = function () {
    const history = useHistory();
    return (
        <div className="dashboard-view">
            <NavBar dashboardURL='/admin/teachers' profileURL='/admin/students' classesURL='/admin/classes'/>
            <div className="card-container" tyle={{paddingTop: '100px'}}>
                <Card className="box" onClick={() => history.push("/admin/teachers")}>
                    <Card.Body>
                        <Card.Title>View/Edit Teacher Profiles</Card.Title>
                        <div className="edit-teachers-img"></div>
                    </Card.Body>
                </Card>
                <Card className="box" onClick={() => history.push("/admin/students")}>
                    <Card.Body>
                        <Card.Title>View/Edit Student Profiles</Card.Title>
                        <div className="edit-students-img"></div>
                    </Card.Body>
                </Card>
                <Card className="box" onClick={() => history.push("/admin/classes")}>
                    <Card.Body>
                        <Card.Title>Create/Edit Classes</Card.Title>
                        <div className="edit-classes-img"></div>
                    </Card.Body>
                </Card>
            </div>
            <div className="bottom-container" style={{ width: '85%', textAlign: 'center', margin: 'auto', marginTop: '80px' }}>
                <h5>Admin Responsibilities and Requirements</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec ornare dolor. Integer eget suscipit massa. Sed auctor magna nec nunc laoreet, sit amet molestie lacus dignissim. Praesent vel lorem vel est eleifend dapibus nec at elit. Duis at lorem elit. Morbi quis lorem at urna auctor tincidunt nec eu metus. Donec volutpat malesuada consequat. Maecenas condimentum diam vitae arcu pretium porttitor. Ut mollis ac enim quis rhoncus. Vivamus quis metus ullamcorper, ultricies lacus at, molestie mi. Nam purus velit, sagittis vel sagittis eu, ultrices eu odio. Mauris id mattis felis.</p>
            </div>
        </div>
    )
}

export default AdminDashboard
