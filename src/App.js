import './App.css';
import Employee from './components/Employee'
import { useState } from 'react';

function App() {
  const [role, setRole] = useState('dev');
  console.log('We are able to list the employees');
  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ? (
          <>

            <input
              type="text"
              onChange={(e) => {
                  console.log(e.target.value);
                  setRole(e.target.value);
              }}
            />
            <Employee name="Nandu" role="intern"/>
            <Employee name="John" role={role}/>
            <Employee name="Doe"/>
          </> 
      ) : (
        <p>You cannot see the Employees</p>
      )}
    </div>
  );
}

export default App;
