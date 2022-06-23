import React, { useState } from 'react'
import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import Swal from 'sweetalert2'
import {employeesData} from '../../Data'


const Dashboard = () => {

    const [isAdding, setIsAdding] = useState(false);
    const [employees, setEmployees] = useState(employeesData);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState(null);

    const handleEdit = (id) => {

        const [employee] = employees.filter(employee => employee.id === id);
        setSelectedEmployees(employee);
        setIsEditing(true);
    }
    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
               
                const [employee] = employees.filter(employee => employee.id === id);
               
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setEmployees(employees.filter(employee => employee.id !== id));
            }
        });
    }
    return (
        <>
            {!isAdding && !isEditing && (
                <>
                    <Header setIsAdding={setIsAdding} />
                    <List employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        setEmployees={setEmployees} />
                </>
            )}

            {isAdding && (
                <Add
                    employees={employees}
                    setIsAdding={setIsAdding}
                    setEmployees={setEmployees} />
            )}
            {isEditing && (
                <Edit
                    employees={employees}
                    setIsEditing={setIsEditing}
                    setEmployees={setEmployees}
                    selectedEmployees={selectedEmployees}
                />
            )}

        </>
    )
}

export default Dashboard