import React, { useEffect } from 'react'
import Login from './Components/Auth/Login'
import { EmployeeDashboard } from './Components/Dashboard/EmployeeDashboard'
import AdminDashboard from './Components/Dashboard/AdminDashboard'
import { getLocalStorage, setLocalStorage } from './utils/LocalStorage'

const App = () => {

  useEffect(() => {
    //setLocalStorage()
    getLocalStorage()
  }, [])

  return (
    <div>
      {/* <Login/> */}
      {/* <EmployeeDashboard/> */}
      <AdminDashboard/>
    </div>

  )
}

export default App