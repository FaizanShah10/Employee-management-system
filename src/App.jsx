import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import EmployeeDashboard from './Components/Dashboard/EmployeeDashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import { AuthContext } from './Components/Context/AuthProvider';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserInfo, setLoggedInUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const employeeDoc = await getDoc(doc(db, 'employees', user.uid));
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        if (employeeDoc.exists()) {
          const employeeData = employeeDoc.data();
          setUser(employeeData.role);
          setLoggedInUserInfo({ uid: user.uid, ...employeeData });
        } else if (adminDoc.exists()) {
          const adminData = adminDoc.data();
          setUser(adminData.role);
          setLoggedInUserInfo({ uid: user.uid, ...adminData });
        } else {
          alert("No user found!");
        }
      } else {
        setUser(null);
        setLoggedInUserInfo(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const employeeCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = employeeCredential.user;

      const employeeDoc = await getDoc(doc(db, 'employees', user.uid));
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));

      if (employeeDoc.exists()) {
        const employeeData = employeeDoc.data();
        setUser(employeeData.role);
        setLoggedInUserInfo({ uid: user.uid, ...employeeData });
      } else if (adminDoc.exists()) {
        const adminData = adminDoc.data();
        setUser(adminData.role);
        setLoggedInUserInfo({ uid: user.uid, ...adminData });
      } else {
        console.error("No user found");
        alert("No User Found!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid Credentials");
    }
  };

  const handleSignUp = async (firstName, email, password, isAdmin = false) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        firstName,
        email,
        role: isAdmin ? 'admin' : 'employee',
        tasks: [],
        CountTask: {
          newTaskCount: 0,
          activeTaskCount: 0,
          completedTaskCount: 0,
          failedTaskCount: 0
        }
      };

      await setDoc(doc(db, isAdmin ? 'admins' : 'employees', user.uid), userData);

      setUser(isAdmin ? 'admin' : 'employee');
      setLoggedInUserInfo({ uid: user.uid, ...userData });
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.message);
    }
  };

  return (
    
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup handleSignUp={handleSignUp} />} />
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
        <Route path="*" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    
  );
};

export default App;
