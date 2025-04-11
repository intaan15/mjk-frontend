import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { FaUser } from "react-icons/fa";

function Dashboard() {
  return (
    <div className='container flex flex-row w-full h-screen bg-white'>
      <div className='flex flex-row h-full w-[270px]'>
        {/* kiri */}
        <Sidebar />
      </div>

      {/* kanan */}
      <div className='bg-white flex flex-col flex-1 pt-20'>
        <div>
            <button><FaUser className='text-3xl text-[#292D32] w-10 h-10' /></button>        
        </div>
        <div>
          <img src="line style.svg" alt="" className='w-6/6' />
        </div>
      </div>
    </div>
   
    

    

  )
}

export default Dashboard