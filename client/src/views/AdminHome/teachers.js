import React, {Component} from 'react';
import 'react-big-scheduler/lib/css/style.css';
import NavBar from '../../components/Navbar/BlueNavBar';
import {DataGrid} from '@material-ui/data-grid';
import './styles.css';
import TextField from '@material-ui/core/TextField';

const teacherColumns = [
    {field: 'id', headerName: 'TeacherID', width: 130},
    {field: 'firstName', headerName: 'First name', width: 150},
    {field: 'lastName', headerName: 'Last name', width: 150},
    {field: 'faculty', headerName: 'Faculty', width: 150},
    {field: 'position', headerName: 'Position', width: 150},
    {field: 'email', headerName: 'Email', width: 250},
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
        this.state = {
            rows: teacherRows
        }
    }

    search = (event) => {
        const value = event.target.value;
        const filteredRows  = teacherRows.filter(row=>row.lastName.toLowerCase().includes(value.toLowerCase()) ||
            row.firstName.toLowerCase().includes(value.toLowerCase()) ||
            row.email.toLowerCase().includes(value.toLowerCase()));
        this.setState({rows: filteredRows});
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className='container mt-5'>
                    <div>
                        <h2 className='title'>
                            Teachers
                            <div className='searchField'>
                                <TextField fullWidth label="Search" variant="outlined" className='searchField' onChange={this.search}/>
                            </div>
                        </h2>
                        <div className='TeacherContainer'>
                            <DataGrid rows={this.state.rows} columns={teacherColumns} pageSize={5} checkboxSelection/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }


}

export default AdminHome