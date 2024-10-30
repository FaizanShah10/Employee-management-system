import React, { useEffect, useState } from 'react';

export const EmployeeDashboard = ({ userInfo }) => {
    const [selectedTaskType, setSelectedTaskType] = useState('new');
    const [updateUserInfo, setUpdateUserInfo] = useState(userInfo);
    console.log(updateUserInfo)

    useEffect(() => {
        const employeeData = JSON.parse(localStorage.getItem('employee'));
        if (employeeData) {
            const updateUser = employeeData.find(emp => emp.employeeId === userInfo.employeeId);
            if (updateUser) {
                setUpdateUserInfo(updateUser);
            }
        }
    }, [userInfo]);

    const getFilteredTasks = () => {
        let filteredTasks;
        switch (selectedTaskType) {
            case 'new':
                filteredTasks = updateUserInfo.tasks.filter(task => task.status === 'new');
                break;
            case 'active':
                filteredTasks = updateUserInfo.tasks.filter(task => task.status === 'active');
                break;
            case 'completed':
                filteredTasks = updateUserInfo.tasks.filter(task => task.status === 'completed');
                break;
            case 'failed':
                filteredTasks = updateUserInfo.tasks.filter(task => task.status === 'failed');
                break;
            default:
                filteredTasks = updateUserInfo.tasks;
        }
        return filteredTasks;
    };

    const handleTaskStatusChange = (taskId, newStatus) => {
        const employeeData = JSON.parse(localStorage.getItem('employee'));

        const updateUser = employeeData.find(emp => emp.employeeId === userInfo.employeeId);
        if (updateUser) {
            const updateTask = updateUser.tasks.find(task => task.taskId === taskId);
            if (updateTask) {
                // Update the task status
                const previousStatus = updateTask.status;
                updateTask.status = newStatus;

                // Update the task counts
                updateUser.CountTask[newStatus + 'TaskCount'] += 1; // Increment new status count
                updateUser.CountTask[previousStatus + 'TaskCount'] -= 1; // Decrement previous status count

                // Saving the updated employee data back to local storage
                localStorage.setItem('employee', JSON.stringify(employeeData));

                // Update local state to trigger a re-render
                const updatedEmployeeData = JSON.parse(localStorage.getItem('employee'));
                const updatedUserInfo = updatedEmployeeData.find(emp => emp.employeeId === userInfo.employeeId);
                setUpdateUserInfo(updatedUserInfo);
            }
        }
    };

    const handleMarkAsCompleted = (taskId) => {
        handleTaskStatusChange(taskId, 'completed');
    };

    const handleMarkAsAccepted = (taskId) => {
        handleTaskStatusChange(taskId, 'active');
    };

    const handleLogout = () => {
        localStorage.setItem('loggedInUser', '');
        window.location.reload();
    };

    const filteredTasks = getFilteredTasks();

    return (
        <div className='bg-[#1C1C1C] h-screen p-10'>
            {/* Header */}
            <div className='flex items-end justify-between'>
                <h1 className='text-2xl text-white'>Hello, <br /> <span className='font-semibold text-3xl'>{userInfo.firstName}</span> 👋</h1>
                <button onClick={handleLogout} className='text-white text-xl px-6 py-2 bg-red-600 rounded-md'>Logout</button>
            </div>

            {/* Task Sections */}
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

            {/* Task List Title */}
            <h2 className='text-2xl text-white text-center font-semibold mt-10'>{selectedTaskType.charAt(0).toUpperCase() + selectedTaskType.slice(1)} Tasks</h2>

            {/* Task List */}
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
