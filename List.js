import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
const List = ({ setEmployees, handleDelete, handleEdit, employees}) => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: null
    });
//   fetch("https://emc-mern-default-rtdb.firebaseio.com/employees.json")
//   .then((res)=>res.json())
//   .then((data)=>{
//   setEmployees(data);
// })
    return (
        <>
            <div className='tab'>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Date</th>
                            <th scope="col" colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {employees.length > 0 ? (
                            employees.map((employee, i)=>(
                                <tr key={employee.id}>
                                <th scope="row">{i+1}</th>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{formatter.format(employee.salary)}</td>
                                <td>{employee.date}</td>
                                <td>
                                    <div className='button'>
                                    <EditIcon onClick={()=>handleEdit(employee.id)}/>
                                    <DeleteIcon onClick={()=>handleDelete(employee.id)}/>
                                    
                                    </div>
                                </td>
                            </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan={7}>No Employees</td>
                            </tr>
                        )}  
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default List