import React from 'react'

export const EmployeeDashboard = () => {
  return (
    <div className='bg-[#1C1C1C] h-screen p-10'>
        <div className='flex items-end justify-between'>
            <h1 className='text-2xl text-white'>Hello, <br /> <span className='font-semibold text-3xl'>Faizan</span> 👋</h1>
            <button className='text-white text-xl px-6 py-2 bg-red-600 rounded-md'>Logout</button>
        </div>

        {/* Tasks */}
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-10'>
            <div className=' bg-red-400 rounded-md p-8'>
                <h2 className='text-3xl font-semibold text-white'>0</h2>
                <h3 className='text-xl font-medium text-white'>New Task</h3>               
            </div>
            <div className=' bg-red-400 rounded-md p-8'>
                <h2 className='text-3xl font-semibold text-white'>0</h2>
                <h3 className='text-xl font-medium text-white'>New Task</h3>               
            </div>
            <div className=' bg-red-400 rounded-md p-8'>
                <h2 className='text-3xl font-semibold text-white'>0</h2>
                <h3 className='text-xl font-medium text-white'>New Task</h3>               
            </div>
            <div className=' bg-red-400 rounded-md p-8'>
                <h2 className='text-3xl font-semibold text-white'>0</h2>
                <h3 className='text-xl font-medium text-white'>New Task</h3>               
            </div>
        </div>


        <h2 className='text-2xl text-white text-center font-semibold mt-10'>New Tasks</h2>
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
            </div>
            <div className='flex-shrink-0 h-full bg-green-400 rounded-lg px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>High</p>
                    <p className='font-semibold'>18 Oct 2024</p>
                </div>
                <div className='mt-3'>
                    <h2 className='text-xl font-semibold'>Task 1</h2>
                    <h3 className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos ut perferendis reiciendis natus hic eos cum quidem non tempora.</h3>
                </div>
            </div>
            <div className='flex-shrink-0 h-full bg-red-500 rounded-lg px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>High</p>
                    <p className='font-semibold'>18 Oct 2024</p>
                </div>
                <div className='mt-3'>
                    <h2 className='text-xl font-semibold'>Task 1</h2>
                    <h3 className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos ut perferendis reiciendis natus hic eos cum quidem non tempora.</h3>
                </div>
            </div>
            <div className='flex-shrink-0 h-full bg-emerald-400 rounded-lg px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>High</p>
                    <p className='font-semibold'>18 Oct 2024</p>
                </div>
                <div className='mt-3'>
                    <h2 className='text-xl font-semibold'>Task 1</h2>
                    <h3 className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos ut perferendis reiciendis natus hic eos cum quidem non tempora.</h3>
                </div>
            </div>
            <div className='flex-shrink-0 h-full bg-green-400 rounded-lg px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>High</p>
                    <p className='font-semibold'>18 Oct 2024</p>
                </div>
                <div className='mt-3'>
                    <h2 className='text-xl font-semibold'>Task 1</h2>
                    <h3 className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos ut perferendis reiciendis natus hic eos cum quidem non tempora.</h3>
                </div>
            </div>
            <div className='flex-shrink-0 h-full bg-red-500 rounded-lg px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>High</p>
                    <p className='font-semibold'>18 Oct 2024</p>
                </div>
                <div className='mt-3'>
                    <h2 className='text-xl font-semibold'>Task 1</h2>
                    <h3 className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos ut perferendis reiciendis natus hic eos cum quidem non tempora.</h3>
                </div>
            </div>
            <div className='flex-shrink-0 h-full bg-emerald-400 rounded-lg px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <p className='px-2 py-1 bg-red-500 text-white rounded-lg text-center'>High</p>
                    <p className='font-semibold'>18 Oct 2024</p>
                </div>
                <div className='mt-3'>
                    <h2 className='text-xl font-semibold'>Task 1</h2>
                    <h3 className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos ut perferendis reiciendis natus hic eos cum quidem non tempora.</h3>
                </div>
            </div>
            
            
        
        </div>
    </div>
  )
}
