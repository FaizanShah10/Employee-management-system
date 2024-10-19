import Admin from './Admin.json';
import Employee from './Employee.json'


export const setLocalStorage = () => {
    localStorage.setItem('admin', JSON.stringify(Admin))
    localStorage.setItem('employee', JSON.stringify(Employee))
}


export const getLocalStorage = () => {
    const employeeData = JSON.parse(localStorage.getItem('employee'))
    const adminData = JSON.parse(localStorage.getItem('admin'))
    console.log(employeeData)
    console.log(adminData)
}

