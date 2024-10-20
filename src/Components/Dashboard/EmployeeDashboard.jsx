import React from 'react'

export const EmployeeDashboard = ({userInfo}) => {
    console.log(userInfo)
    
  return (
    <div className='bg-[#1C1C1C] h-screen p-10'>
        <div className='flex items-end justify-between'>
            <h1 className='text-2xl text-white'>Hello, <br /> <span className='font-semibold text-3xl'>{userInfo.firstName}</span> 👋</h1>
            <button className='text-white text-xl px-6 py-2 bg-red-600 rounded-md'>Logout</button>
        </div>

        {/* Tasks */}
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-10'>
            <div className='bg-emerald-400 rounded-md p-8'>
                <h2 className='text-3xl font-semibold text-white'>{userInfo.CountTask.newTaskCount}</h2>
                <h3 className='text-xl font-medium text-white'>New Task</h3>
            </div>
            <div className='bg-blue-400 rounded-md p-8'>
                <h2 className='text-3xl font-semibold text-white'>{userInfo.CountTask.activeTaskCount}</h2>
                <h3 className='text-xl font-medium text-white'>Active Tasks</h3>
            </div>
            <div className='bg-green-400 rounded-md p-8'>
                <h2 className='text-3xl font-semibold text-white'>{userInfo.CountTask.completedTaskCount}</h2>
                <h3 className='text-xl font-medium text-white'>Completed Tasks</h3>
            </div>
            <div className='bg-red-500 rounded-md p-8'>
                <h2 className='text-3xl font-semibold text-white'>{userInfo.CountTask.failedTaskCount}</h2>
                <h3 className='text-xl font-medium text-white'>Failed Tasks</h3>
            </div>
        </div>




        <h2 className='text-2xl text-white text-center font-semibold mt-10'>New Tasks</h2>
        {/* Task List */}
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-10'>
        {userInfo.tasks.map(task => (
            <div key={task.taskId} className='flex-shrink-0 h-full bg-yellow-400 rounded-lg px-8 py-4'>
            <div className='flex items-center justify-between'>
                <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>High</p>
                <p className='font-semibold'>18 Oct 2024</p>
            </div>
            <div className='mt-3'>
                <h2 className='text-xl font-semibold'>{task.taskTitle}</h2>
                <h3 className='text-sm'>{task.description}</h3>
            </div>
            </div>
        ))}
        </div>

    </div>
  )
}
