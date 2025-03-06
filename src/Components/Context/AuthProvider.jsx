import React, { createContext, useEffect, useState } from 'react';
import { auth, db } from '../../firebase'; // Adjust the path as necessary
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true); // Set loading state while fetching data
        try {
          const employeeDoc = await getDoc(doc(db, 'employees', user.uid));
          const adminDoc = await getDoc(doc(db, 'admins', user.uid));
  
          if (employeeDoc.exists()) {
            setUserInfo({ uid: user.uid, ...employeeDoc.data() });
          } else if (adminDoc.exists()) {
            setUserInfo({ uid: user.uid, ...adminDoc.data() });
          } else {
            console.warn("No user found in Firestore, logging out...");
            setUserInfo(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserInfo(null);
      }
      setLoading(false);
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
        setUserInfo({ uid: user.uid, ...employeeDoc.data() });
      } else if (adminDoc.exists()) {
        setUserInfo({ uid: user.uid, ...adminDoc.data() });
      } else {
        alert("No User Found!");
      }

      // Debug
      console.log("User LoggedIn Succesdfully", user)
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
      setUserInfo({ uid: user.uid, ...userData });
      console.log("User Created Successfully", user)
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ userInfo, loading, handleLogin, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
