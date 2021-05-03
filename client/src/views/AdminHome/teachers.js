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
            showModal: false
        }
    }

    handleShow(id) {
        this.setState({ showModal: id });
    }
    handleClose() {
        this.setState({ showModal: null });
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
                <NavBar />
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
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter full name" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Teacher ID</Form.Label>
                                            <Form.Control type="text" placeholder="Enter teacher ID" />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Group controlId="formGridEmail">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" placeholder="Enter any highlights, details and information you don't mind being public. Inlcude interests and hobbies." style={{ height: '150px' }} />
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Years of Teaching</Form.Label>
                                            <Form.Control type="text" placeholder="Enter number of years" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Faculty</Form.Label>
                                            <Form.Control type="text" placeholder="Enter faculty" />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="text" placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control type="email" placeholder="Enter teaching campus" />
                                        </Form.Group>
                                    </Form.Row>
                                </Form>

                            </Modal.Body>
                            <Modal.Footer style={{ float: 'right' }}>
                                <Button variant="outline-danger" style={{ borderRadius: '20px', width: '100px', backgroundColor: '#FED8B1' }}> Save</Button>
                            </Modal.Footer>
                        </Modal>
                        <TextField fullWidth label="Search" variant="outlined" className='searchField'
                            onChange={this.search} style={{ width: '400px', float: 'right', marginTop: '-10px' }} />
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