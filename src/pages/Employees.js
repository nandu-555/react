import '../index.css';
import Employee from '../components/Employee'
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import AddEmployee from '../components/AddEmployee';
import EditEmployee from '../components/EditEmployee';
import Header from '../components/Header';

function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Nandu",
      role: "Developer", 
      img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg",
    },
    {
      id: 2,
      name: "John",
      role: "Manager", 
      img: "https://cdn.pixabay.com/photo/2024/08/29/07/56/african-9006155_1280.jpg",
    },
    {
      id: 3,
      name: "Doe",
      role: "CTO", 
      img: "https://cdn.pixabay.com/photo/2021/05/04/13/29/portrait-6228705_1280.jpg",
    },
    {
      id: 4,
      name: "Walter",
      role: "CMO", 
      img: "https://cdn.pixabay.com/photo/2023/01/29/08/09/man-7752637_1280.jpg",
    },
    {
      id: 5,
      name: "Jesse",
      role: "CFO", 
      img: "https://cdn.pixabay.com/photo/2024/05/31/10/48/woman-8800324_1280.jpg",
    },
    {
      id: 6,
      name: "Skyler",
      role: "Senior", 
      img: "https://cdn.pixabay.com/photo/2023/09/04/18/45/ai-generated-8233462_1280.jpg",
    },
  ]);
  

  function updateEmployee(id, newName, newRole) {
    const updateEmployees = employees.map((employee) => {
      if (id == employee.id){
        return{...employee, name: newName, role: newRole};
      }

      return employee;
    });
    setEmployees(updateEmployees);
  }

  function newEmployee(name, role, img){
    const newEmployee = {
      id:  uuidv4(),
      name: name,
      role: role,
      img: img,
    };
    setEmployees([...employees, newEmployee]);
  }


  // console.log('We are able to list the employees');
  const showEmployees = true;
  return (
    <div className="App  bg-gray-300 min-h-screen">
      {showEmployees ? (
          <>


            {/* <input
              type="text"
              onChange={(e) => {
                  console.log(e.target.value);
                  setRole(e.target.value);
              }}
            /> */}


            <div className="flex flex-wrap justify-center my-2">
                {employees.map((employee) => {
                  const editEmployee = (
                  <EditEmployee id={employee.id} name={employee.name} role={employee.role} updateEmployee={updateEmployee} /> 
                  );
                  // console.log(uuidv4());
                  return(
                    <Employee 
                      key={employee.id}
                      id={employee.id}
                      name={employee.name}
                      role={employee.role}
                      img={employee.img}
                      editEmployee={editEmployee}
                    />
                  );
                })}
              
            </div>
            <AddEmployee newEmployee={newEmployee} />
          </> 
      ) : (
        <p>You cannot see the Employees</p>
      )}
    </div>
  );
}

export default Employees;
