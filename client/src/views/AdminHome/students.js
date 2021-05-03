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

const studentColumns = [
    { field: 'id', headerName: 'StudentID', width: 130 },
    { field: 'major', headerName: 'Major', width: 150 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
];

const studentRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', major: 'FEIT', email: 'abc@test.com' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', major: 'Business', email: 'abc@test.com' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', major: 'Art', email: 'abc@test.com' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', major: 'AI', email: 'abc@test.com' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', major: 'Finance', email: 'abc@test.com' },
    { id: 6, lastName: 'Melisandre', firstName: 'Jam', major: 'Bank', email: 'abc@test.com' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', major: 'Analysis', email: 'abc@test.com' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', major: 'Media', email: 'abc@test.com' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', major: 'Communication', email: 'abc@test.com' },
];

class AdminHome extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            rows: studentRows,
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
        const filteredRows = studentRows.filter(row => row.lastName.toLowerCase().includes(value.toLowerCase()) ||
            row.firstName.toLowerCase().includes(value.toLowerCase()) ||
            row.email.toLowerCase().includes(value.toLowerCase()));
        this.setState({ rows: filteredRows });
    }

    onRowClick = (param, event) => {
        console.log(param, event);
        alert("Will jump to student detail page with student id=" + param.row.id)
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className='container mt-5'>
                    <h2 className='title'>
                        Students
                    </h2>
                    <Button variant="success" size="sm" onClick={() => this.handleShow('create-student')}>Add a new Student</Button>
                    <Modal show={this.state.showModal === 'create-student'} onHide={this.handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Create a new student profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter full name" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Student ID</Form.Label>
                                        <Form.Control type="text" placeholder="Enter student ID" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" placeholder="Enter any highlights, details and of student." style={{ height: '150px' }} />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Year of Study</Form.Label>
                                        <Form.Control type="text" placeholder="Enter year of study" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Course</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your course" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="email" placeholder="Enter study campus" />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                             
                        </Modal.Body>
                        <Modal.Footer style={{ float: 'right' }}>
                        <Button variant="outline-danger" style={{ borderRadius: '20px', width: '100px', backgroundColor: '#FED8B1' }}> Save</Button>
                        </Modal.Footer>
                    </Modal>
                    <TextField fullWidth label="Search" variant="outlined" className='searchField' onChange={this.search} style={{ width: '400px', float: 'right', marginTop: '-10px' }} />
                    <div className='studentContainer'>
                        <DataGrid
                            rows={this.state.rows}
                            columns={studentColumns}
                            pageSize={5}
                            onRowClick={this.onRowClick}
                        />
                    </div>
                </div>
            </div>


        )
    }


}

export default AdminHome