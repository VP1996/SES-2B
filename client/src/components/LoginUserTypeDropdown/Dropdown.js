import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from 'react-bootstrap/DropdownButton'

const UserDropdown = () => {
    return (
        <div className="dropdown-container" style={{position: 'relative'}}>
            <DropdownButton id="dropdown-basic-button" variant="warning" title="Select user" style={{margin: '0 0 1% 44%'}}>
                <Dropdown.Item href="/student/login">Student</Dropdown.Item>
                <Dropdown.Item href="/teacher/login">Teacher</Dropdown.Item>
                <Dropdown.Item href="/admin/login">Admin</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default UserDropdown;