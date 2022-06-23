import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';


const Add = ({ setIsAdding, employees, setEmployees }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [salary, setSalary] = useState('')
    const [date, setDate] = useState('');

    const handleAdd =  (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !salary || !date) {
            return Swal.fire({
                icon: "error",
                tittle: "error",
                text: "All filed are required",
                showConfirmButton: true
            });
        }
        const id = employees.length + 1;
        const newEmployee = {
            id,
            firstName,
            lastName,
            email,
            date,
            salary
        }
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
        employees.push(newEmployee)
        setEmployees(employees);
        setIsAdding(false);

        Swal.fire({
            icon: "success",
            tittle: "Congratulation",
            text: `${firstName} ${lastName}'s Now Your Employee`,
            showConfirmButton: false,
            timer: 1500
        });

    }
    return (
        <div>
            <div className='form-div'>
                <Form onSubmit={handleAdd}>
                    <h1>Add Employee</h1>
                    <FormGroup>
                        <FormLabel>First Name</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}>
                        </FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}>
                        </FormControl>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </FormControl>
                        <FormLabel>Salary</FormLabel>
                        <FormControl
                            type='number'
                            placeholder='Salary'
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}>
                        </FormControl>
                        <FormLabel>Date</FormLabel>
                        <FormControl
                            type='date'
                            placeholder='Date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}>
                        </FormControl>
                        <div>
                            <Button onClick={handleAdd} type='submit'>Submit</Button>
                            <Button variant='secondary' type='cancel' onClick={() => setIsAdding(false)}>Cancel</Button>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        </div>
    )
}

export default Add