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
    { field: 'userid', headerName: 'Teacher ID', width: 130 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'teachingYear', headerName: 'TeachYear', width: 150 },
    { field: 'faculty', headerName: 'Faculty', width: 150 },
    { field: 'campusLocation', headerName: 'Campus', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
];



class AdminHome extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            rows: [],
            showModal: false,
            teacherName: '',
            teacherID: '',
            teacherDescription: '',
            teacherYear: '',
            teacherFaculty: '',
            teacherEmail: '',
            teacherLocation: '',
            teacherPassword: '',
            filteredRows: [],
        }
    }

    handleShow(id, data) {
        if(data != null){
            console.log(data);
            this.setState({
                teacherName: data.name,
                teacherID: data.userid,
                teacherDescription: data.description,
                teacherYear: data.teachingYear,
                teacherFaculty: data.faculty,
                teacherEmail: data.email,
                teacherLocation: data.campusLocation,
                teacherPassword: data.password,
                showModal: id,
                isEdit: true,
            });
        } else {
            this.setState({
                teacherName: '',
                teacherID: '',
                teacherDescription: '',
                teacherYear: '',
                teacherFaculty: '',
                teacherEmail: '',
                teacherLocation: '',
                teacherPassword: '',
                showModal: id,
                isEdit: false,
            });
        }
    }
    handleClose() {
        this.setState({
            showModal: null,
            teacherName: '',
            teacherID: '',
            teacherDescription: '',
            teacherYear: '',
            teacherFaculty: '',
            teacherEmail: '',
            teacherLocation: '',
            teacherPassword: '',
            isEdit: false,
        });
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onDelete = () => {
        axios.post('http://localhost:5000/api/teacher/delete', {userid: this.state.teacherID}).then(()=>{
            this.handleClose();
            this.loadTeachList();
        });
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
            let response;
            if(this.state.isEdit){
                response = await axios.post('http://localhost:5000/api/teacher/edit', body);
            } else {
                response = await axios.post('http://localhost:5000/api/teacher/register', body);
            }
            console.log(response.data.message);
            this.handleClose();
            this.loadTeachList();
        } catch (e) {
            console.log("Could not register teacher");
            console.log(e.message);
        }
    }

    componentDidMount() {
        this.loadTeachList();
    }

    loadTeachList = () => {
        axios.get('http://localhost:5000/api/teacher/all').then((data)=>{
            let rows = data.data.teachers;
            rows.forEach(r=>r.id=r._id);
            this.setState({rows, filteredRows: rows})
        });
    }

    search = (event) => {
        const value = event.target.value;
        const filteredRows = this.state.rows.filter(row => JSON.stringify(row).toLowerCase().includes(value.toLowerCase()));
        this.setState({ filteredRows });
    }

    onRowClick = (param, event) => {
        console.log(param, event);
        this.handleShow('create-teacher', param.row);
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
                                <Modal.Title>{this.state.isEdit?'Update Teacher':'Create a new teacher profile'}</Modal.Title>
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
                                {this.state.isEdit ? <Button variant="outline-danger" style={{ borderRadius: '20px', width: '100px', backgroundColor: 'red', color: 'white' }} onClick={this.onDelete}>Delete</Button>: ''}
                                <Button variant="outline-danger" style={{ borderRadius: '20px', width: '100px', backgroundColor: '#FED8B1' }} onClick={this.onSave}> Save</Button>
                            </Modal.Footer>
                        </Modal>
                        <TextField fullWidth label="Search" variant="outlined" className='searchField'
                            onChange={this.search} style={{ width: '400px', float: 'right', marginTop: '-25px' }} />
                        <div className='TeacherContainer'>
                            <DataGrid
                                rows={this.state.filteredRows}
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