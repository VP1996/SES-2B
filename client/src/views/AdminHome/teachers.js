import React, { Component } from 'react';
import 'react-big-scheduler/lib/css/style.css';
import NavBar from '../../components/Navbar/BlueNavBar';
import { DataGrid } from '@material-ui/data-grid';
import './styles.css';
import TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import axios from 'axios';

const teacherColumns = [
    { field: 'id', headerName: 'Teacher ID', width: 130 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'faculty', headerName: 'Faculty', width: 150 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
];

const teacherRows = [
    {
        id: 1,
        lastName: 'Snow',
        firstName: 'Jon',
        faculty: 'Communication',
        position: "Professor",
        email: 'teacherabc@test.com'
    },
    {
        id: 2,
        lastName: 'Lannister',
        firstName: 'Cersei',
        faculty: 'Communication',
        position: "Professor",
        email: 'abc@test.com'
    },
    {
        id: 3,
        lastName: 'Lannister',
        firstName: 'Jaime',
        faculty: 'Communication',
        position: "Professor",
        email: 'abc@test.com'
    },
    {
        id: 4,
        lastName: 'Stark',
        firstName: 'Arya',
        faculty: 'Communication',
        position: "Professor",
        email: 'abc@test.com'
    },
    {
        id: 5,
        lastName: 'Targaryen',
        firstName: 'Daenerys',
        faculty: 'Communication',
        position: "Professor",
        email: 'abc@test.com'
    },
    {
        id: 6,
        lastName: 'Melisandre',
        firstName: 'abc',
        faculty: 'Communication',
        position: "Professor",
        email: 'abc@test.com'
    },
    {
        id: 7,
        lastName: 'Clifford',
        firstName: 'Ferrara',
        faculty: 'Communication',
        position: "Professor",
        email: 'abc@test.com'
    },
    {
        id: 8,
        lastName: 'Frances',
        firstName: 'Rossini',
        faculty: 'Communication',
        position: "Professor",
        email: 'abc@test.com'
    },
    {
        id: 9,
        lastName: 'Roxie',
        firstName: 'Harvey',
        faculty: 'Communication',
        position: "Professor",
        email: 'abc@test.com'
    },
];

class AdminHome extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            rows: teacherRows,
            showModal: false,
            teacherName: '',
            teacherID: '',
            teacherDescription: '',
            teacherYear: '',
            teacherFaculty: '',
            teacherEmail: '',
            teacherLocation: '',
            teacherPassword: ''
        }
    }

    handleShow(id) {
        this.setState({ showModal: id });
    }
    handleClose() {
        this.setState({
            showModal: null, teacherName: '',
            teacherID: '',
            teacherDescription: '',
            teacherYear: '',
            teacherFaculty: '',
            teacherEmail: '',
            teacherLocation: '',
            teacherPassword: ''
        });
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSave = async (e) => {
        e.preventDefault();
        const { teacherName,
            teacherID,
            teacherDescription,
            teacherYear,
            teacherFaculty,
            teacherEmail,
            teacherLocation,
            teacherPassword } = this.state;

        const body = {
            teacherName,
            teacherID,
            teacherDescription,
            teacherYear,
            teacherFaculty,
            teacherEmail,
            teacherLocation,
            teacherPassword
        }

        try {
            let response = await axios.post('http://localhost:5000/api/teacher/register', body)
            console.log(response.data.message);
            this.handleClose();
        } catch (e) {
            console.log("Could not register teacher");
            console.log(e.message);

        }
    }

    search = (event) => {
        const value = event.target.value;
        const filteredRows = teacherRows.filter(row => row.lastName.toLowerCase().includes(value.toLowerCase()) ||
            row.firstName.toLowerCase().includes(value.toLowerCase()) ||
            row.email.toLowerCase().includes(value.toLowerCase()));
        this.setState({ rows: filteredRows });
    }

    onRowClick = (param, event) => {
        console.log(param, event);
        alert("Will jump to teacher detail page with teacher id=" + param.row.id)
    }

    render() {
        return (
            <div>
                <NavBar dashboardURL='/admin/teachers' profileURL='/admin/students' classesURL='/admin/classes' />
                <div className='container mt-5'>
                    <div>
                        <h2 className='title'>
                            Teachers
                             </h2>
                        <Button variant="success" size="sm" onClick={() => this.handleShow('create-teacher')}>Add a new Teacher</Button>
                        <Modal show={this.state.showModal === 'create-teacher'} onHide={this.handleClose} >
                            <Modal.Header closeButton>
                                <Modal.Title>Create a new teacher profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" name="teacherName" value={this.state.teacherName} placeholder="Enter full name" onChange={this.onChange}/>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Teacher ID</Form.Label>
                                            <Form.Control type="text" name="teacherID" value={this.state.teacherID}placeholder="Enter teacher ID" onChange={this.onChange} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" name="teacherDescription" value={this.state.teacherDescription}placeholder="Enter any highlights, details and information you don't mind being public. Inlcude interests and hobbies." style={{ height: '150px' }} onChange={this.onChange}/>
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Years of Teaching</Form.Label>
                                            <Form.Control type="text" name="teacherYear" value={this.state.teacherYear} placeholder="Enter number of years" onChange={this.onChange}/>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Faculty</Form.Label>
                                            <Form.Control type="text" name="teacherFaculty" value={this.state.teacherFaculty}placeholder="Enter faculty" onChange={this.onChange}/>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" name="teacherEmail" value={this.state.teacherEmail} placeholder="Enter email" onChange={this.onChange}/>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control type="text" name="teacherLocation" value={this.state.teacherLocation}placeholder="Enter teaching campus" onChange={this.onChange}/>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>password</Form.Label>
                                            <Form.Control type="text" name="teacherPassword" value={this.state.teacherPassword}placeholder="Enter password" onChange={this.onChange} />
                                        </Form.Group>
                                    </Form.Row>
                                </Form>

                            </Modal.Body>
                            <Modal.Footer style={{ float: 'right' }}>
                                <Button variant="outline-danger" style={{ borderRadius: '20px', width: '100px', backgroundColor: '#FED8B1' }} onClick={this.onSave}> Save</Button>
                            </Modal.Footer>
                        </Modal>
                        <TextField fullWidth label="Search" variant="outlined" className='searchField'
                            onChange={this.search} style={{ width: '400px', float: 'right', marginTop: '-25px' }} />
                        <div className='TeacherContainer'>
                            <DataGrid
                                rows={this.state.rows}
                                columns={teacherColumns}
                                pageSize={5}
                                onRowClick={this.onRowClick}
                            />
                        </div>
                    </div>
                </div>
            </div>

        )
    }


}

export default AdminHome