import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import ('../index.css')

function Loginakun () {
  const navigate = useNavigate();
   return (
    <div className=' flex flex-col justify-center items-center h-screen w-screen ' >
      {/* logo tengah */}
      <div className='logo flex flex-col items-center justify-center pb-5'>
          <img className='flex flex-row w-70 justify-center' src="Logo Mojokerto Sehat.svg" alt="" />
          <p className='font-[raleway] font-extrabold text-[#025F96] text-[15px] items-center '>MOJOKERTO SEHAT</p>
      </div>

      {/* form login*/}
      <div className='bg- flex flex-row'>
        <div className="mb-4 py-11 flex flex-col gap-5 justify-center items-center  ">
            <input className="username shadow appearance-none border rounded w-[328px] h-[35px] px-3 text-gray-700 font-[nunito] italic focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
            <input className="password shadow appearance-none border rounded w-[328px] h-[35px] py-2 px-3 text-gray-700 font-[nunito] italic leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Password"/>
            <button className='btnlogin bg-[#004A76] rounded-[4px] text-white w-[255px] h-[48px] items-center justify-center hover:bg-[#003252] transition-all duration-300' onClick={() => navigate ('/dashboardadmin')}>Masuk</button>
        </div>
      </div>
      






    </div>
  )
}

export default Loginakun
