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

const classColoumns = [
    { field: 'classID', headerName: 'ClassID', width: 200 },
    { field: 'className', headerName: 'Class Name', width: 300 },
    { field: 'startTime', headerName: 'Start Time', width: 200 },
    { field: 'endTime', headerName: 'End Time', width: 200 },
    { field: 'numStudents', headerName: 'No. of Students', width: 200 }

];

const classRows = [
    { id: 243440, class: 'Programming Fundamentals', time: '09:00 - 10:00', numStudents: '20' },
    { id: 345678, class: 'Data Structures and Algorithms', time: '09:00 - 10:00', numStudents: '30' },
    { id: 456789, class: 'Engineering Communications', time: '09:00 - 10:00', numStudents: '10' },
    { id: 456780, class: 'Engineering Practice Preparation', time: '09:00 - 10:00', numStudents: '15' },
    {
        id: 123456, class: 'Software Studio', time: '09:00 - 10:00',
        numStudents: '22'
    },
    { id: 567890, class: 'Algorithms', time: '09:00 - 10:00', numStudents: '30' },

];

class AdminHome extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAddStudent = this.handleAddStudent.bind(this);
        this.handleAddTeacher = this.handleAddTeacher.bind(this);

        this.state = {
            teachers: [],
            students: [],
            rows: [],
            filteredRows: [],
            showModal: false,
            className: '',
            classID: '',
            classDescription: '',
            classStart: '',
            classEnd: '',
            classToUpdate: {
                className: '',
                classID: ''
            }
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/class/all').then((classesResponse) => {
            let rows = classesResponse.data.classes;
            rows.forEach(r => r.id = r._id);
            this.setState({ rows, filteredRows: rows })
            //sets both the rows and filtered rows to this API response
        });
        axios.get('http://localhost:5000/api/student/all').then((studentsResponse) => {
            let studentOptions = studentsResponse.data.students
            this.setState({ students: studentOptions });
        })
        axios.get('http://localhost:5000/api/teacher/all').then((teachersResponse) => {
            let teacherOptions = teachersResponse.data.teachers
            this.setState({ teachers: teacherOptions });
        })
    }

    handleAddStudent(e) {
        let studentID = parseInt(e.target.value.split(' ')[0])
        let classID = this.state.classToUpdate.classID;
        let className = this.state.classToUpdate.className;
        axios.post('http://localhost:5000/api/class/addStudent',{classID, className, studentID})
            .then((response) => {
                console.log(response.data);
        })
    }

    handleAddTeacher(e) {
        let teacherID = parseInt(e.target.value.split(' ')[0])
        let classID = this.state.classToUpdate.classID;
        let className = this.state.classToUpdate.className;
        axios.post('http://localhost:5000/api/class/addTeacher',{classID, className, teacherID})
            .then((response) => {
                console.log(response.data);
        })
    }

    handleShow(id) {
        this.setState({ showModal: id });
    }
    handleClose() {
        this.setState({
            showModal: null,
            className: '',
            classID: '',
            classDescription: '',
            classStart: '',
            classEnd: ''
        });
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSave = async (e) => {
        e.preventDefault();
        const {
            className,
            classID,
            classDescription,
            classStart,
            classEnd
        } = this.state;

        const body = {
            className,
            classID,
            classDescription,
            classStart,
            classEnd
        }

        try {
            let response = await axios.post('http://localhost:5000/api/class/create', body)
            console.log(response.data.message);
            this.handleClose();
        } catch (e) {
            console.log("Could not create class");
            console.log(e.message);

        }

    }

    search = (event) => {
        const value = event.target.value;
        const filteredRows = classRows.filter(row => row.class.toLowerCase().includes(value.toLowerCase()) || row.id.toString().includes(value.toString()));
        this.setState({ rows: filteredRows });
    }

    onRowClick = (param, event) => {
        const aClass = {
            classID: param.row.classID,
            className: param.row.className
        }
        this.handleShow('update-class', param.row);
        this.setState({ classToUpdate: aClass });

        // alert("Will jump to student detail page with student id=" + param.row.id)
    }

    render() {
        return (
            <div>
                <NavBar dashboardURL='/admin/teachers' profileURL='/admin/students' classesURL='/admin/classes' />
                <div className='container mt-5'>
                    <h2 className='title'>
                        Classes
                         </h2>

                    <Button variant="success" size="sm" onClick={() => this.handleShow('create-class')}>Add a new Class</Button>
                    <Modal show={this.state.showModal === 'create-class'} onHide={this.handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Create a new class</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Class Name</Form.Label>
                                        <Form.Control type="text" name="className"
                                            value={this.state.className} placeholder="Enter name" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Class ID</Form.Label>
                                        <Form.Control type="text" name="classID"
                                            value={this.state.classID} placeholder="Enter class ID" onChange={this.onChange} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" name="classDescription"
                                        value={this.state.classDescription} placeholder="Enter any highlights, details and of class." style={{ height: '150px' }} onChange={this.onChange} />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Start time</Form.Label>
                                        <Form.Control type="text" name="classStart"
                                            value={this.state.classStart} placeholder="Enter start time" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>End time</Form.Label>
                                        <Form.Control type="text" name="classEnd"
                                            value={this.state.classEnd} placeholder="Enter end time" onChange={this.onChange} />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer style={{ float: 'right' }}>
                            <Button variant="outline-danger" style={{ borderRadius: '20px', width: '100px', backgroundColor: '#FED8B1' }} onClick={this.onSave}> Save</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showModal === 'update-class'} onHide={this.handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Add Class Members</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Add Students</Form.Label>
                                        <Form.Control as="select" multiple value={this.state.students} onChange={this.handleAddStudent}>
                                            {this.state.students.map(student => (
                                                <option key={student.id} value={student.id}>
                                                    {student.userid} {student.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Add Teachers</Form.Label>
                                        <Form.Control as="select" multiple value={this.state.teachers} onChange={this.handleAddTeacher}>
                                            {this.state.teachers.map(teacher => (
                                                <option key={teacher.id} value={teacher.id}>
                                                    {teacher.userid} {teacher.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                            </Form>
                        </Modal.Body>
                    </Modal>
                    <TextField fullWidth label="Search" variant="outlined" className='searchField' onChange={this.search} style={{ width: '400px', float: 'right', marginTop: '-25px' }} />
                    <div className='studentContainer'>
                        <DataGrid
                            rows={this.state.filteredRows}
                            columns={classColoumns}
                            pageSize={5}
                            onRowClick={this.onRowClick}
                        />
                    </div>
                </div>
            </div >


        )
    }


}

export default AdminHome