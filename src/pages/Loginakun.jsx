import React from 'react'
import ('../index.css')

function Loginakun () {
   return (
    <div className=' bg-white flex flex-col justify-center items-center h-screen w-screen ' >
      {/* logo tengah */}
      <div className='logo flex flex-col items-center justify-center'>
          <img className='flex flex-row w-50 justify-center' src="Logo Mojokerto Sehat.svg" alt="" />
          <p className='font-raleway font-extrabold text-[#025F96] text-[15px] items-center '>MOJOKERTO SEHAT</p>
          <p className='text-[6px] text-[#025F96] items-end justify-end mr-0'>by tim tujuh</p>
      </div>

      <div className='bg- flex flex-row w-screen justify-center items-center'>
        <div className="bg-red-300 mb-4  ">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-medium leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-medium leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
        </div>
      </div>
      






    </div>
  )
}

export default Loginakun
