import React from 'react';

const AdminDashboard = () => {
  return (
    <div className='bg-[#1C1C1C] h-auto p-10'>
      
      
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-2xl text-white'>Hello, <br /> <span className='font-semibold text-3xl'>Faizan</span> 👋</h1>
        <button className='bg-red-600 text-white px-6 py-2 rounded-md text-xl'>
          Logout
        </button>
      </div>

      {/* Form Container */}
      <div className='flex justify-center items-center'>
        <div className='bg-zinc-800 p-6 w-full max-w-[800px] rounded-lg'>
          {/* Form */}
          <form className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {/* Row 1: Task Title and Date */}
            <div className='flex flex-col'>
              <label className='text-white font-semibold mb-1' htmlFor="taskTitle">Task Title</label>
              <input 
                className='border-[1px] rounded-full border-zinc-300 px-3 py-2 bg-transparent outline-none text-white'
                type="text" 
                placeholder='Enter Task Title'/>
            </div>

            <div className='flex flex-col'>
              <label className='text-white font-semibold mb-1' htmlFor="taskDate">Date</label>
              <input 
                className='border-[1px] rounded-full border-zinc-300 px-3 py-2 bg-transparent outline-none text-white'
                type="date"/>
            </div>

            {/* Row 2: Assign to and Task Category */}
            <div className='flex flex-col'>
              <label className='text-white font-semibold mb-1' htmlFor="assignTo">Assign to</label>
              <input 
                className='border-[1px] rounded-full border-zinc-300 px-3 py-2 bg-transparent outline-none text-white'
                type="text" 
                placeholder='Enter Employee Name'/>
            </div>

            <div className='flex flex-col'>
              <label className='text-white font-semibold mb-1' htmlFor="taskCategory">Category</label>
              <input 
                className='border-[1px] rounded-full border-zinc-300 px-3 py-2 bg-transparent outline-none text-white'
                type="text" 
                placeholder='e.g Design, Development'/>
            </div>

            {/* Row 3: Description (Full Width) */}
            <div className='col-span-1 sm:col-span-2 flex flex-col'>
              <label className='text-white font-semibold mb-1' htmlFor="taskDescription">Description</label>
              <textarea 
                className='border-[1px] rounded-lg border-zinc-300 px-3 py-2 bg-transparent outline-none text-white'
                rows="4"
                placeholder='Enter Task Description'>
              </textarea>
            </div>
          </form>

          {/* Create Task Button */}
          <div className='flex justify-end mt-5'>
            <button 
              className='bg-green-600 text-white px-6 py-2 rounded-full font-semibold'>
              Create New Task
            </button>
          </div>
        </div>
      </div>

      {/* Created Tasks */}
      <h2 className='text-2xl text-white text-center font-semibold mt-10'>Tasks Created</h2>
        {/* Task List */}   
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-10'>
           
            <div className='flex-shrink-0 h-full bg-yellow-400 rounded-lg px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>High</p>
                    <p className='font-semibold'>18 Oct 2024</p>
                </div>
                <div className='mt-3'>
                    <h2 className='text-xl font-semibold'>Task 1</h2>
                    <h3 className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos ut perferendis reiciendis natus hic eos cum quidem non tempora.</h3>
                </div>
                <button className='px-3 py-1 bg-red-600 text-white rounded-md mt-4'>Delete</button>
            </div>
            <div className='flex-shrink-0 h-full bg-yellow-400 rounded-lg px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>High</p>
                    <p className='font-semibold'>18 Oct 2024</p>
                </div>
                <div className='mt-3'>
                    <h2 className='text-xl font-semibold'>Task 1</h2>
                    <h3 className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos ut perferendis reiciendis natus hic eos cum quidem non tempora.</h3>
                </div>
                <button className='px-3 py-1 bg-red-600 text-white rounded-md mt-4'>Delete</button>
            </div>
            <div className='flex-shrink-0 h-full bg-yellow-400 rounded-lg px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>High</p>
                    <p className='font-semibold'>18 Oct 2024</p>
                </div>
                <div className='mt-3'>
                    <h2 className='text-xl font-semibold'>Task 1</h2>
                    <h3 className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos ut perferendis reiciendis natus hic eos cum quidem non tempora.</h3>
                </div>
                <button className='px-3 py-1 bg-red-600 text-white rounded-md mt-4'>Delete</button>
            </div>
            <div className='flex-shrink-0 h-full bg-yellow-400 rounded-lg px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>High</p>
                    <p className='font-semibold'>18 Oct 2024</p>
                </div>
                <div className='mt-3'>
                    <h2 className='text-xl font-semibold'>Task 1</h2>
                    <h3 className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos ut perferendis reiciendis natus hic eos cum quidem non tempora.</h3>
                </div>
                <button className='px-3 py-1 bg-red-600 text-white rounded-md mt-4'>Delete</button>
            </div>
            
            
            
        
        </div>
    </div>
  );
};

export default AdminDashboard;
