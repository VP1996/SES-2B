import React, {Component} from 'react';
import 'react-big-scheduler/lib/css/style.css';
import NavBar from '../../components/Navbar/Navbar';
import { DataGrid } from '@material-ui/data-grid';
import './styles.css';
import TextField from '@material-ui/core/TextField';

const studentColumns = [
    { field: 'id', headerName: 'StudentID', width: 130 },
    { field: 'major', headerName: 'Major', width: 150 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
];

const studentRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', major: 'FEIT', email:'abc@test.com'},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', major: 'Business', email:'abc@test.com'},
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', major: 'Art', email:'abc@test.com'},
    { id: 4, lastName: 'Stark', firstName: 'Arya', major: 'AI', email:'abc@test.com'},
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', major: 'Finance', email:'abc@test.com'},
    { id: 6, lastName: 'Melisandre', firstName: null, major: 'Bank', email:'abc@test.com'},
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', major: 'Analysis', email:'abc@test.com'},
    { id: 8, lastName: 'Frances', firstName: 'Rossini', major: 'Media', email:'abc@test.com'},
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', major: 'Communication', email:'abc@test.com' },
];

const teacherColumns = [
    { field: 'id', headerName: 'TeacherID', width: 130 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'faculty', headerName: 'Faculty', width: 150 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
];

const teacherRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', faculty: 'Communication', position:"Professor",email:'teacherabc@test.com'},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', faculty: 'Communication', position:"Professor", email:'abc@test.com'},
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', faculty: 'Communication', position:"Professor", email:'abc@test.com'},
    { id: 4, lastName: 'Stark', firstName: 'Arya', faculty: 'Communication', position:"Professor", email:'abc@test.com'},
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys',faculty: 'Communication', position:"Professor", email:'abc@test.com'},
    { id: 6, lastName: 'Melisandre', firstName: null, faculty: 'Communication', position:"Professor", email:'abc@test.com' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', faculty: 'Communication', position:"Professor", email:'abc@test.com' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', faculty: 'Communication', position:"Professor", email:'abc@test.com' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', faculty: 'Communication', position:"Professor", email:'abc@test.com' },
];

class AdminHome extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='container'>
                <NavBar/>
                <h2 className='title'>
                    Students
                    <div className='searchField'>
                        <TextField fullWidth label="Search" variant="outlined" className='searchField'/>
                    </div>
                </h2>

                <div className='studentContainer'>
                    <DataGrid rows={studentRows} columns={studentColumns} pageSize={5} checkboxSelection />
                </div>

                <h2 className='title'>
                    Teachers
                    <div className='searchField'>
                        <TextField fullWidth label="Search" variant="outlined" className='searchField'/>
                    </div>
                </h2>
                <div className='TeacherContainer'>
                    <DataGrid rows={teacherRows} columns={teacherColumns} pageSize={5} checkboxSelection />
                </div>
            </div>

        )
    }



}

export default AdminHome

student = {
    username: 'abc',
    email: '',
    studentId: '',
    attendence: {
        facial: false,
        captcha: false,
        pin: false,
    }
}