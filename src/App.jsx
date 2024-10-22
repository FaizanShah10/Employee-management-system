import React, { useContext, useEffect, useState } from 'react';
import Login from './Components/Auth/Login';
import { EmployeeDashboard } from './Components/Dashboard/EmployeeDashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import { AuthContext } from './Components/Context/AuthProvider';
import { getLocalStorage, setLocalStorage } from './utils/LocalStorage';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserInfo, setLoggedInUserInfo] = useState(null);
  const authData = useContext(AuthContext);
  console.log(authData)



  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const userInfo = JSON.parse(storedUser);
      setUser(userInfo.role);
      setLoggedInUserInfo(userInfo);
    }
  }, [authData]);

  const handleLogin = (email, password) => {
    // Check if admin
    if (authData && authData.adminData.find(admin => admin.email === email && admin.password === password)) {
      const adminInfo = authData.adminData.find(admin => admin.email === email);
      console.log('This is admin');
      setUser('admin');
      setLoggedInUserInfo(adminInfo);
      localStorage.setItem('loggedInUser', JSON.stringify({ ...adminInfo, role: 'admin' }));
    } 
    // Check if employee
    else if (authData && authData.employeeData.find(employee => employee.email === email && employee.password === password)) {
      const employeeInfo = authData.employeeData.find(employee => employee.email === email);
      console.log('This is employee');
      setUser('employee');
      setLoggedInUserInfo(employeeInfo);
      localStorage.setItem('loggedInUser', JSON.stringify({ ...employeeInfo, role: 'employee' }));
    } 
    // Invalid credentials
    else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === 'admin' ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard userInfo={loggedInUserInfo} />
      )}
    </div>
  );
};

export default App;
