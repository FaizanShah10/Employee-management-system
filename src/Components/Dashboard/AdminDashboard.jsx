import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { auth, db } from '../../firebase';
import {query, where, collection, doc, addDoc,getDocs, updateDoc, arrayUnion, increment, writeBatch } from 'firebase/firestore';

const AdminDashboard = ({ userInfo }) => {
  const authData = useContext(AuthContext);

  const [taskTitle, settaskTitle] = useState('');
  const [taskDescription, settaskDescription] = useState('');
  const [taskDate, settaskDate] = useState('');
  const [assignTo, setassignTo] = useState('');
  const [taskCategory, settaskCategory] = useState('');
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);


  // Fetch employee data from Firestore 
  useEffect(() => {
    
    const fetchEmployees = async () => {
      try {
        const employeeSnapshot = await getDocs(collection(db, 'employees'));
        const employeeData = employeeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployees(employeeData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Fetch tasks from Firestore 
  useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        const tasksSnapshot = await getDocs(collection(db, 'tasks'));
        const tasksData = tasksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const generateRandomId = () => {
    return `task_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const taskId = generateRandomId();
    const newTask = {
      taskId,
      taskTitle,
      taskDescription,
      taskDate,
      assignTo,
      taskCategory,
      status: 'new'
    };
  
    try {
      const batch = writeBatch(db);
  
      // Step 1: Add task to the "tasks" collection
      const tasksCollectionRef = collection(db, 'tasks');
      await addDoc(tasksCollectionRef, newTask);
  
      // Step 2: Query to find the employee document by firstName
      const employeeQuery = query(collection(db, 'employees'), where('firstName', '==', assignTo));
      const employeeSnapshot = await getDocs(employeeQuery);
  
      if (employeeSnapshot.empty) {
        throw new Error(`No employee found with firstName: ${assignTo}`);
      }
  
      const employeeDoc = employeeSnapshot.docs[0]; // Assuming first match is correct
      const employeeRef = doc(db, 'employees', employeeDoc.id);
  
      // Step 3: Update the tasks array in the admin document
      const adminRef = doc(db, 'admins', userInfo.uid);
      batch.update(adminRef, {
        tasks: arrayUnion(newTask)
      });
  
      // Step 4: Update the tasks and CountTask for the assigned employee
      batch.update(employeeRef, {
        tasks: arrayUnion(newTask),
        'CountTask.newTaskCount': increment(1)
      });
  
      // Commit the batch
      await batch.commit();
  
      // Clear form inputs
      settaskTitle('');
      settaskDate('');
      settaskDescription('');
      settaskCategory('');
      setassignTo('');
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create the task. " + error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Fetch the admin and employee references
      const adminRef = doc(db, 'admins', userInfo.uid);
      const employeesRef = collection(db, 'employees');

      // Get the current admin data
      const adminDoc = await getDoc(adminRef);

      if (adminDoc.exists()) {
        const batch = writeBatch(db);

        // Update admin's tasks array by filtering out the task to be deleted
        batch.update(adminRef, {
          tasks: adminDoc.data().tasks.filter((task) => task.taskId !== taskId)
        });

        // Remove task from employee's task array and decrement CountTask
        const assignedEmployee = adminDoc.data().tasks.find((task) => task.taskId === taskId)?.assignTo;
        if (assignedEmployee) {
          const employeeRef = doc(db, 'employees', assignedEmployee);
          const employeeDoc = await getDoc(employeeRef);

          if (employeeDoc.exists()) {
            const updatedTasks = employeeDoc.data().tasks.filter((task) => task.taskId !== taskId);
            batch.update(employeeRef, {
              tasks: updatedTasks,
              'CountTask.newTaskCount': increment(-1) // Decrement task count
            });
          }
        }

        await batch.commit();
        window.location.reload(); // Reload the page to update UI
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete the task.");
    }
  };

  const handleLogout = () => {
    auth.signOut()
  };

  return (
    <div className='bg-[#1C1C1C] h-auto p-10'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-2xl text-white'>Hello, <br /> <span className='font-semibold text-3xl'>{userInfo.firstName}</span> 👋</h1>
        <button onClick={handleLogout} className='bg-red-600 text-white px-6 py-2 rounded-md text-xl'>
          Logout
        </button>
      </div>

      {/* Task Creation Form */}
      <div className='flex justify-center items-center'>
        <div className='bg-zinc-800 p-6 w-full max-w-[800px] rounded-lg'>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <div className='flex flex-col'>
              <label className='text-white font-semibold mb-1'>Task Title</label>
              <input
                className='border-[1px] rounded-full border-zinc-300 px-3 py-2 bg-transparent outline-none text-white'
                type="text"
                placeholder='Enter Task Title'
                onChange={(e) => settaskTitle(e.target.value)}
                value={taskTitle}
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-white font-semibold mb-1'>Date</label>
              <input
                className='border-[1px] rounded-full border-zinc-300 px-3 py-2 bg-transparent outline-none text-white'
                type="date"
                value={taskDate}
                onChange={(e) => settaskDate(e.target.value)}
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-white font-semibold mb-1'>Assign to</label>
              <input
                className='border-[1px] rounded-full border-zinc-300 px-3 py-2 bg-transparent outline-none text-white'
                type="text"
                placeholder='Enter Employee Name'
                value={assignTo}
                onChange={(e) => setassignTo(e.target.value)}
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-white font-semibold mb-1'>Category</label>
              <input
                className='border-[1px] rounded-full border-zinc-300 px-3 py-2 bg-transparent outline-none text-white'
                type="text"
                placeholder='e.g Design, Development'
                value={taskCategory}
                onChange={(e) => settaskCategory(e.target.value)}
              />
            </div>

            <div className='col-span-1 sm:col-span-2 flex flex-col'>
              <label className='text-white font-semibold mb-1'>Description</label>
              <textarea
                className='border-[1px] rounded-lg border-zinc-300 px-3 py-2 bg-transparent outline-none text-white'
                rows="4"
                placeholder='Enter Task Description'
                value={taskDescription}
                onChange={(e) => settaskDescription(e.target.value)}
              />
            </div>

            <div className='flex mt-5'>
              <button className='bg-green-600 text-white px-6 py-2 rounded-full font-semibold'>
                Create New Task
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Display Tasks */}
      <h2 className='text-2xl text-white text-center font-semibold mt-10'>Tasks Created</h2>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-10'>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.taskId} className='flex-shrink-0 h-full bg-yellow-400 rounded-lg px-8 py-4'>
              <div className='flex items-center justify-between'>
                <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>{task.taskCategory}</p>
                <p className='font-semibold'>{task.taskDate || 'N/A'}</p>
              </div>
              <div className='mt-3'>
                <h2 className='text-xl font-semibold'>{task.taskTitle}</h2>
                <h3 className='text-sm'>{task.taskDescription}</h3>
              </div>
              <button onClick={() => handleDeleteTask(task.taskId)} className='px-3 py-1 bg-red-600 text-white rounded-md mt-4'>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className='text-white text-center col-span-full'>No tasks available</p>
        )}
      </div>

      {/* Display Employees */}
      <h2 className='text-2xl text-white text-center font-semibold mt-10'>Employees Information</h2>
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-emerald-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Full Name</th>
                  <th className="px-5 py-3">New Task</th>
                  <th className="px-5 py-3">Completed Task</th>
                  <th className="px-5 py-3">Active Task</th>
                  <th className="px-5 py-3">Failed Task</th>
                </tr>
              </thead>
              {employees.map((employee, index) => (
                <tbody key={index} className="text-gray-500">
                  <tr>
                    <td className="border-b border-gray-200 bg-transparent px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-white">{employee.employeeId}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-transparent px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-white">{employee.firstName}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-transparent px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-white">{employee.CountTask.newTaskCount}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-transparent px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-white">{employee.CountTask.completedTaskCount}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-transparent px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-white">{employee.CountTask.activeTaskCount}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-transparent px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-white">{employee.CountTask.failedTaskCount}</p>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
