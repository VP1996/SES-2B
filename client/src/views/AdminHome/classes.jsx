import React, {Component} from 'react';
import 'react-big-scheduler/lib/css/style.css';
import NavBar from '../../components/Navbar/BlueNavBar';
import {DataGrid} from '@material-ui/data-grid';
import './styles.css';
import TextField from '@material-ui/core/TextField';

const classColoumns = [
    {field: 'id', headerName: 'ClassID', width: 200},
    { field: 'class', headerName: 'Class Name', width: 300 },
    { field: 'time', headerName: 'Time', width: 200 },
    {field: 'numStudents', headerName: 'No. of Students', width: 200}

];

const classRows = [
    {id: 243440, class: 'Programming Fundamentals', time: '09:00 - 10:00', numStudents: '20'},
    {id: 345678, class: 'Data Structures and Algorithms', time: '09:00 - 10:00', numStudents: '30'},
    {id: 456789, class: 'Engineering Communications', time: '09:00 - 10:00', numStudents: '10'},
    {id: 456780, class: 'Engineering Practice Preparation', time: '09:00 - 10:00', numStudents: '15'},
    {id: 123456, class: 'Software Studio', time: '09:00 - 10:00',
        numStudents: '22'
    },
    {id: 567890, class: 'Algorithms', time: '09:00 - 10:00', numStudents: '30'},
    
];

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: classRows
        }

    }

    search = (event) => {
        const value = event.target.value;
        const filteredRows = classRows.filter(row => row.class.toLowerCase().includes(value.toLowerCase()) || row.id.toString().includes(value.toString()));
        this.setState({rows: filteredRows});
    }

    onRowClick = (param, event) => {
        console.log(param, event);
        alert("Will jump to student detail page with student id=" + param.row.id)
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className='container mt-5'>
                    <h2 className='title'>
                        Classes
                        <div className='searchField'>
                            <TextField fullWidth label="Search" variant="outlined" className='searchField' onChange={this.search}/>
                        </div>
                    </h2>
                    <div className='studentContainer'>
                        <DataGrid
                            rows={this.state.rows}
                            columns={classColoumns}
                            pageSize={5}
                            onRowClick = {this.onRowClick}
                        />
                    </div>
                </div>
            </div>


        )
    }


}

export default AdminHome