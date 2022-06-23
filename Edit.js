import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

const Edit = ({ setIsEditing, selectedEmployees, setEmployees, employees }) => {

    const id = selectedEmployees.id;

    const [firstName, setFirstName] = useState(selectedEmployees.firstName);
    const [lastName, setLastName] = useState(selectedEmployees.lastName);
    const [email, setEmail] = useState(selectedEmployees.email);
    const [salary, setSalary] = useState(selectedEmployees.salary);
    const [date, setDate] = useState(selectedEmployees.date);

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !salary || !date) {
            return Swal.fire({
                icon: "error",
                tittle: "error",
                text: "All filed are required",
                showConfirmButton: true
            });
        }

        const employee = {
            id,
            firstName,
            lastName,
            email,
            salary,
            date
        };
        fetch("https://emc-mern-default-rtdb.firebaseio.com/employees.json",{
            method:'POST',
            Headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id,
                firstName,
                lastName,
                email,
                date,
                salary
            })
        });
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === id) {
                employees.splice(i, 1, employee);
                break;

            }
        }
        setEmployees(employees);
        setIsEditing(false);

        Swal.fire({
            icon: "success",
            tittle: "Updated!",
            text: `${employee.firstName} ${employee.lastName}'s data has been Updated`,
            showConfirmButton: false,
            timer: 1500
        });
    }
    return (
        <div>
            <div>
                <div className='form-div'>
                    <Form onSubmit={handleUpdate}>
                        <h1>Update Employee</h1>
                        <FormGroup>
                            <FormLabel>First Name</FormLabel>
                            <FormControl
                                id="firstName"
                                name="firstName"
                                type='text'
                                placeholder='First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}>
                            </FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl
                                id='lastName'
                                type='text'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}>
                            </FormControl>
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                id='email'
                                type='text'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                            </FormControl>
                            <FormLabel>Salary</FormLabel>
                            <FormControl
                                id='salary'
                                type='number'
                                placeholder='Salary'
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}>
                            </FormControl>
                            <FormLabel>Date</FormLabel>
                            <FormControl
                                id='date'
                                type='date'
                                placeholder='Date'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}>
                            </FormControl>
                            <div>
                                <Button type='submit' value='update'>Update</Button>
                                <Button onClick={() => setIsEditing(false)} variant='secondary'>Cancel</Button>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Edit