import React, {Component} from 'react';
import 'react-big-scheduler/lib/css/style.css';
import NavBar from '../../components/Navbar/BlueNavBar';
import {DataGrid} from '@material-ui/data-grid';
import './styles.css';
import TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import axios from 'axios';

const studentColumns = [
    {field: 'userid', headerName: 'StudentID', width: 130},
    {field: 'name', headerName: 'Name', width: 150},
    {field: 'course', headerName: 'Course', width: 180},
    {field: 'faculty', headerName: 'Faculty', width: 150},
    {field: 'campusLocation', headerName: 'Campus', width: 180},
    {field: 'email', headerName: 'Email', width: 250},
];

class AdminHome extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            showModal: false,
            studentName: '',
            studentID: '',
            studentDescription: '',
            studentYear: '',
            studentCourse: '',
            studentEmail: '',
            studentLocation: '',
            studentFaculty: '',
            studentPassword: '',
            rows: [],
            filteredRows: [],
        }

    }

    componentDidMount() {
        this.loadTeachList();
    }

    loadTeachList = () => {
        axios.get('http://localhost:5000/api/student/all').then((data) => {
            let rows = data.data.students;
            rows.forEach(r => r.id = r._id);
            this.setState({rows, filteredRows: rows})
        });
    }

    handleShow(id, data) {
        if (data != null) {
            this.setState({
                studentName: data.name,
                studentID: data.userid,
                studentDescription: data.description,
                studentYear: data.studyYear,
                studentCourse: data.course,
                studentEmail: data.email,
                studentLocation: data.campusLocation,
                studentFaculty: data.faculty,
                studentPassword: data.password,
                showModal: id,
                isEdit: true,
            });
        } else {
            this.setState({
                studentName: '',
                studentID: '',
                studentDescription: '',
                studentYear: '',
                studentFaculty: '',
                studentEmail: '',
                studentLocation: '',
                studentPassword: '',
                showModal: id,
                isEdit: false,
            });
        }
    }

    handleClose() {
        this.setState({
            showModal: null,
            studentName: '',
            studentID: '',
            studentDescription: '',
            studentYear: 'null',
            studentCourse: '',
            studentEmail: '',
            studentLocation: '',
            studentFaculty: '',
            studentPassword: '',
            isEdit: false,
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onDelete = () => {
        axios.post('http://localhost:5000/api/student/delete', {userid: this.state.studentID}).then(() => {
            this.handleClose();
            this.loadTeachList();
        });
    }

    onSave = async (e) => {
        e.preventDefault();
        const {
            studentName,
            studentID,
            studentDescription,
            studentYear,
            studentCourse,
            studentEmail,
            studentLocation,
            studentFaculty,
            studentPassword
        } = this.state;

        const body = {
            studentName,
            studentID,
            studentDescription,
            studentYear,
            studentCourse,
            studentEmail,
            studentLocation,
            studentPassword,
            studentFaculty
        }

        try {
            let response;
            if(this.state.isEdit){
                response = await axios.post('http://localhost:5000/api/student/edit', body);
            } else {
                response = await axios.post('http://localhost:5000/api/student/register', body);
            }
            console.log(response.data.message);
            this.handleClose();
            this.loadTeachList();
        } catch (e) {
            console.log("Could not register student");
            console.log(e.message);

        }

    }

    search = (event) => {
        const value = event.target.value;
        const filteredRows = this.state.rows.filter(row => JSON.stringify(row).toLowerCase().includes(value.toLowerCase()));
        this.setState({filteredRows});
    }

    onRowClick = (param, event) => {
        console.log(param, event);
        this.handleShow('create-student', param.row);
    }

    render() {
        return (
            <div>
                <NavBar dashboardURL='/admin/teachers' profileURL='/admin/students' classesURL='/admin/classes'/>
                <div className='container mt-5'>
                    <h2 className='title'>
                        Students
                    </h2>
                    <Button variant="success" size="sm" onClick={() => this.handleShow('create-student')}>Add a new
                        Student</Button>
                    <Modal show={this.state.showModal === 'create-student'} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.isEdit ? 'Update Student' : 'Create a new student profile'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="studentName"
                                                      value={this.state.studentName} placeholder="Enter full name"
                                                      onChange={this.onChange}/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Student ID</Form.Label>
                                        <Form.Control type="text" name="studentID"
                                                      value={this.state.studentID} placeholder="Enter student ID"
                                                      onChange={this.onChange}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" name="studentDescription"
                                                  value={this.state.studentDescription}
                                                  placeholder="Enter any highlights, details and of student."
                                                  style={{height: '150px'}} onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Year of Study</Form.Label>
                                        <Form.Control type="text" name="studentYear"
                                                      value={this.state.studentYear} placeholder="Enter year of study"
                                                      onChange={this.onChange}/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Course</Form.Label>
                                        <Form.Control type="text" name="studentCourse"
                                                      value={this.state.studentCourse} placeholder="Enter your course"
                                                      onChange={this.onChange}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" name="studentEmail"
                                                      value={this.state.studentEmail} placeholder="Enter email"
                                                      onChange={this.onChange}/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="text" name="studentLocation"
                                                      value={this.state.studentLocation}
                                                      placeholder="Enter study campus" onChange={this.onChange}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Faculty</Form.Label>
                                        <Form.Control type="text" name="studentFaculty"
                                                      value={this.state.studentFaculty} placeholder="Enter faculty"
                                                      onChange={this.onChange}/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Passsword</Form.Label>
                                        <Form.Control type="text" name="studentPassword"
                                                      value={this.state.studentPassword} placeholder="Enter password"
                                                      onChange={this.onChange}/>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer style={{float: 'right'}}>
                            {this.state.isEdit ? <Button variant="outline-danger" style={{
                                borderRadius: '20px',
                                width: '100px',
                                backgroundColor: 'red',
                                color: 'white'
                            }} onClick={this.onDelete}>Delete</Button> : ''}
                            <Button variant="outline-danger"
                                    style={{borderRadius: '20px', width: '100px', backgroundColor: '#FED8B1'}}
                                    onClick={this.onSave}>Save</Button>
                        </Modal.Footer>
                    </Modal>
                    <TextField fullWidth label="Search" variant="outlined" className='searchField'
                               onChange={this.search} style={{width: '400px', float: 'right', marginTop: '-25px'}}/>
                    <div className='studentContainer'>
                        <DataGrid
                            rows={this.state.filteredRows}
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

export default AdminHome;