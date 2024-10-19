import React, { useContext, useEffect, useState } from 'react'
import Login from './Components/Auth/Login'
import { EmployeeDashboard } from './Components/Dashboard/EmployeeDashboard'
import AdminDashboard from './Components/Dashboard/AdminDashboard'
import { AuthContext } from './Components/Context/AuthProvider'
import { getLocalStorage, setLocalStorage } from './utils/LocalStorage'

const App = () => {
  const [user, setUser] = useState(null)
  const authData = useContext(AuthContext)
  console.log(authData)

  const handleLogin = (email, password) => {
    // Check if admin
    if (authData && authData.adminData.find((admin) => admin.email === email && admin.password === password)) {
      console.log("This is admin");
      setUser('admin');
    } 
    // Check if Employee
    else if (authData && authData.employeeData.find((employee) => employee.email === email && employee.password === password)) {
      console.log("This is employee");
      setUser('employee');
    } 
    // Invalid credentials
    else {
      alert("Invalid Credentials");
    }
  };
  

  return (
    <div>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === 'admin' ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard />
      )}
    </div>
  )
}

export default App
