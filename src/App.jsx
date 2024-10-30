import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import { EmployeeDashboard } from './Components/Dashboard/EmployeeDashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import { AuthContext } from './Components/Context/AuthProvider';
import { setLocalStorage } from './utils/LocalStorage';


const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserInfo, setLoggedInUserInfo] = useState(null);
  const authData = useContext(AuthContext);


  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const userInfo = JSON.parse(storedUser);
      setUser(userInfo.role);
      setLoggedInUserInfo(userInfo);
    }
  }, [authData]);

  const handleLogin = (email, password) => {
    if (authData && authData.adminData.find(admin => admin.email === email && admin.password === password)) {
      const adminInfo = authData.adminData.find(admin => admin.email === email);
      setUser('admin');
      setLoggedInUserInfo(adminInfo);
      localStorage.setItem('loggedInUser', JSON.stringify({ ...adminInfo, role: 'admin' }));
    } else if (authData && authData.employeeData.find(employee => employee.email === email && employee.password === password)) {
      const employeeInfo = authData.employeeData.find(employee => employee.email === email);
      setUser('employee');
      setLoggedInUserInfo(employeeInfo);
      localStorage.setItem('loggedInUser', JSON.stringify({ ...employeeInfo, role: 'employee' }));
    } else {
      alert('Invalid Credentials');
    }
  };


  const handleSignUp = (firstName, email, password) => {
    const newEmployee = {
      randomId: Math.floor(Math.random() * 1000000),
      firstName,
      email,
      password,
      tasks: [],
      CountTask: {
        newTaskCount: 0,
        activeTaskCount: 0,
        completedTaskCount: 0,
        failedTaskCount: 0
      }
    };

    const existingEmployees = JSON.parse(localStorage.getItem('employee'));
    const updatedEmployees = [...existingEmployees, newEmployee];
    
    // Update localStorage with the new employee data
    localStorage.setItem('employee', JSON.stringify(updatedEmployees));

    // Set as logged-in employee and redirect to dashboard
    setUser('employee');
    setLoggedInUserInfo(newEmployee);
    localStorage.setItem('loggedInUser', JSON.stringify({ ...newEmployee, role: 'employee' }));
  };


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup handleSignUp={handleSignUp}/>} />
        <Route
          path="/dashboard"
          element={
            user === 'admin' ? (
              <AdminDashboard userInfo={loggedInUserInfo} />
            ) : user === 'employee' ? (
              <EmployeeDashboard userInfo={loggedInUserInfo} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
