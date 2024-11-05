import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, doc, getDoc, getDocs, updateDoc, increment } from 'firebase/firestore';

const EmployeeDashboard = ({ userInfo }) => {
  const [selectedTaskType, setSelectedTaskType] = useState('new');
  const [updateUserInfo, setUpdateUserInfo] = useState(userInfo);
  const [employees, setEmployees] = useState([]);
  const [loadingTaskId, setLoadingTaskId] = useState(null); // New state for loading task ID

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
    setLoadingTaskId(taskId); // Set loading state

    try {
      const employeeRef = doc(db, 'employees', userInfo.uid);
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
    } finally {
      setLoadingTaskId(null); // Reset loading state
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
                {loadingTaskId === task.taskId ? ( // Show spinner while loading
                  <button className='px-3 py-1 bg-gray-400 rounded-md text-white font-semibold text-sm' disabled>
                    <svg aria-hidden="true" className="w-5 h-5 animate-spin text-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.1978 70.6863 14.2274C74.7767 15.8595 78.6167 17.9643 81.8689 20.4357C84.9824 22.7557 88.0383 25.2809 90.7853 28.3203C93.0952 30.9671 93.3277 33.7139 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  </button>
                ) : task.status === 'new' ? (
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
