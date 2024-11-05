import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, doc, getDoc, getDocs, updateDoc, increment } from 'firebase/firestore';

const EmployeeDashboard = ({ userInfo }) => {
  const [selectedTaskType, setSelectedTaskType] = useState('new');
  const [updateUserInfo, setUpdateUserInfo] = useState(userInfo);
  const [employees, setEmployees] = useState([]);
//   console.log(userInfo.uid)

  // Fetching the employees data from Firestore
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeSnapshot = await getDocs(collection(db, 'employees'));
        const employeeData = employeeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployees(employeeData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const getFilteredTasks = () => {
    return updateUserInfo.tasks.filter(task => task.status === selectedTaskType);
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      const employeeRef = doc(db, 'employees', userInfo.uid);
      console.log(employeeRef)
      const employeeDoc = await getDoc(employeeRef);

      if (employeeDoc.exists()) {
        const tasks = employeeDoc.data().tasks;
        const taskIndex = tasks.findIndex(task => task.taskId === taskId);

        if (taskIndex !== -1) {
          const previousStatus = tasks[taskIndex].status;
          tasks[taskIndex].status = newStatus;

          await updateDoc(employeeRef, {
            tasks,
            [`CountTask.${newStatus}TaskCount`]: increment(1),
            [`CountTask.${previousStatus}TaskCount`]: increment(-1)
          });

          const updatedEmployeeDoc = await getDoc(employeeRef);
          setUpdateUserInfo(updatedEmployeeDoc.data());
        }
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleMarkAsCompleted = (taskId) => {
    handleTaskStatusChange(taskId, 'completed');
  };

  const handleMarkAsAccepted = (taskId) => {
    handleTaskStatusChange(taskId, 'active');
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className='bg-[#1C1C1C] h-screen p-10'>
      <div className='flex items-end justify-between'>
        <h1 className='text-2xl text-white'>Hello, <br /> <span className='font-semibold text-3xl'>{userInfo.firstName}</span> 👋</h1>
        <button onClick={handleLogout} className='text-white text-xl px-6 py-2 bg-red-600 rounded-md'>Logout</button>
      </div>

      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-10'>
        <div className='bg-emerald-400 rounded-md p-8 cursor-pointer' onClick={() => setSelectedTaskType('new')}>
          <h2 className='text-3xl font-semibold text-white'>{updateUserInfo.CountTask.newTaskCount}</h2>
          <h3 className='text-xl font-medium text-white'>New Task</h3>
        </div>
        <div className='bg-blue-400 rounded-md p-8 cursor-pointer' onClick={() => setSelectedTaskType('active')}>
          <h2 className='text-3xl font-semibold text-white'>{updateUserInfo.CountTask.activeTaskCount}</h2>
          <h3 className='text-xl font-medium text-white'>Active Tasks</h3>
        </div>
        <div className='bg-green-400 rounded-md p-8 cursor-pointer' onClick={() => setSelectedTaskType('completed')}>
          <h2 className='text-3xl font-semibold text-white'>{updateUserInfo.CountTask.completedTaskCount}</h2>
          <h3 className='text-xl font-medium text-white'>Completed Tasks</h3>
        </div>
        <div className='bg-red-500 rounded-md p-8 cursor-pointer' onClick={() => setSelectedTaskType('failed')}>
          <h2 className='text-3xl font-semibold text-white'>{updateUserInfo.CountTask.failedTaskCount}</h2>
          <h3 className='text-xl font-medium text-white'>Failed Tasks</h3>
        </div>
      </div>

      <h2 className='text-2xl text-white text-center font-semibold mt-10'>{selectedTaskType.charAt(0).toUpperCase() + selectedTaskType.slice(1)} Tasks</h2>

      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-10'>
        {filteredTasks.length === 0 ? (
          <p className='text-white text-center col-span-full'>No {selectedTaskType.charAt(0).toUpperCase() + selectedTaskType.slice(1)} Tasks Found</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task.taskId} className='flex-shrink-0 h-full bg-yellow-400 rounded-lg px-8 py-4'>
              <div className='flex items-center justify-between'>
                <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>{task.taskCategory}</p>
                <p className='font-semibold'>{task.taskDate}</p>
              </div>
              <div className='mt-3'>
                <h2 className='text-xl font-semibold'>{task.taskTitle}</h2>
                <h3 className='text-sm'>{task.taskDescription}</h3>
              </div>
              <div className='mt-4'>
                {task.status === 'new' ? (
                  <button onClick={() => handleMarkAsAccepted(task.taskId)} className='px-3 py-1 bg-green-400 rounded-md text-white font-semibold text-sm'>Accept Task</button>
                ) : task.status === 'completed' ? (
                  <button className='px-3 py-1 bg-gray-400 rounded-md text-white font-semibold text-sm' disabled>Completed</button>
                ) : (
                  <button onClick={() => handleMarkAsCompleted(task.taskId)} className='px-3 py-1 bg-green-400 rounded-md text-white font-semibold text-sm'>Mark as Completed</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
