import React, { createContext, useEffect, useState } from 'react';
import { getLocalStorage } from '../../utils/LocalStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);  

  useEffect(() => {
    const { adminData, employeeData } = getLocalStorage();  
    setUserData({ adminData, employeeData });  
  }, []);

  return (
    <AuthContext.Provider value={userData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
