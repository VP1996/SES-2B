import React, {Component} from 'react';
import 'react-big-scheduler/lib/css/style.css';
import NavBar from '../../components/Navbar/BlueNavBar';
import {DataGrid} from '@material-ui/data-grid';
import './styles.css';
import TextField from '@material-ui/core/TextField';

const studentColumns = [
    {field: 'id', headerName: 'StudentID', width: 130},
    {field: 'major', headerName: 'Major', width: 150},
    {field: 'firstName', headerName: 'First name', width: 150},
    {field: 'lastName', headerName: 'Last name', width: 150},
    {field: 'email', headerName: 'Email', width: 250},
];

const studentRows = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', major: 'FEIT', email: 'abc@test.com'},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', major: 'Business', email: 'abc@test.com'},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', major: 'Art', email: 'abc@test.com'},
    {id: 4, lastName: 'Stark', firstName: 'Arya', major: 'AI', email: 'abc@test.com'},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', major: 'Finance', email: 'abc@test.com'},
    {id: 6, lastName: 'Melisandre', firstName: 'Jam', major: 'Bank', email: 'abc@test.com'},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', major: 'Analysis', email: 'abc@test.com'},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', major: 'Media', email: 'abc@test.com'},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', major: 'Communication', email: 'abc@test.com'},
];

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: studentRows
        }

    }

    search = (event) => {
        const value = event.target.value;
        const filteredRows = studentRows.filter(row => row.lastName.toLowerCase().includes(value.toLowerCase()) ||
            row.firstName.toLowerCase().includes(value.toLowerCase()) ||
            row.email.toLowerCase().includes(value.toLowerCase()));
        this.setState({rows: filteredRows});
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className='container mt-5'>
                    <h2 className='title'>
                        Students
                        <div className='searchField'>
                            <TextField fullWidth label="Search" variant="outlined" className='searchField' onChange={this.search}/>
                        </div>
                    </h2>
                    <div className='studentContainer'>
                        <DataGrid rows={this.state.rows} columns={studentColumns} pageSize={5} checkboxSelection/>
                    </div>
                </div>
            </div>


        )
    }


}

export default AdminHome