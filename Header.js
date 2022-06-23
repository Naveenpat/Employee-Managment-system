import React from 'react'
import {Button} from 'react-bootstrap'
const Header = ({setIsAdding}) => {
  return (
    <div className='main'>
      <h1 >Employee Management System</h1>
      <div>
        <Button onClick={()=>setIsAdding(true)}>Add Employee</Button>
      </div>
    </div>
   
  )
}

export default Header