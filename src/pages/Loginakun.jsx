import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import { HiOutlineRefresh } from "react-icons/hi";
import ('../index.css')

function Loginakun () {
  const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword(!showPassword);
    };
  const navigate = useNavigate();
  
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('');
  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserInput('');
    setStatus('');
  };
  const checkCaptcha = () => {
    if (userInput.toUpperCase() === captcha) {
      setStatus('✅ Captcha cocok!');
    } else {
      setStatus('❌ Captcha salah, coba lagi.');
    }
  };



   return (
    <div className=' flex flex-col justify-center items-center h-screen w-screen ' >
          <div className='bg-[#025F96]/10  w-[400px] rounded-[10px]'>
             {/* logo tengah */}
                <div className='logo flex flex-col items-center justify-center pb-5 '>
                    <img className='flex flex-row w-[200px] justify-center mt-5' src="/Logo Mojokerto Sehat.svg" alt="" />
                    <p className='font-[raleway] font-extrabold text-[#025F96] text-[20px] items-center '>
                      MOJOKERTO SEHAT</p>
                    <p className='font-[raleway] text-[10px] text-[#438222] italic item-ends justify-end mr-0'>
                      by DinKes Kab.Mojokerto</p>
                </div>

                {/* form login*/}
                <div className='bg- flex flex-row justify-center items-center '>
                  <div className="mb-4 py-5 flex flex-col gap-5 justify-center items-center  ">
                    {/* username */}
                    <div className="relative w-[300px]">
                      <VscAccount className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="pl-10 pr-3 h-[40px] w-full border rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-[nunito] italic"
                      />
                    </div>

                    {/* password */}
                    <div className="relative w-[300px] flex flex-row  ">
                      <TbLockPassword className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"  />
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="pl-10 pr-3 h-[40px] w-full border rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-[nunito] italic"
                      />
                      <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600">
                        {showPassword ? <HiEye className="w-5 h-5" /> : <HiEyeOff className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* captcha */}
                    <div className="flex flex-row gap-2 w-[300px]" id='captcha'>
                      <div className="bg-white px-4 py-2 rounded text-xl font-bold tracking-widest select-none h-[40px]">
                        {captcha}
                      </div>
                      <button className="bg-[#004A76] text-white px-4 py-1 rounded hover:bg-blue-800 h-[40px]" 
                        onClick={checkCaptcha}>
                        <HiOutlineRefresh />
                      </button>
                      <button 
                        className='text-blue-600 hover:text-blue-800 h-[40px]' 
                        onClick={refreshCaptcha}>
                      </button>
                      <input 
                        className='font-[nunito] italic pl-2 h-[40px] w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                        type="text" 
                        placeholder="Captcha" 
                        id="captchatext" />
                    </div>

                    {/* buttonmasuk */}
                    <button className=' font-[raleway] font-semibold bg-[#004A76] rounded-[4px] text-white w-full h-[48px] items-center justify-center hover:bg-[#003252] transition-all duration-300' 
                    onClick={() => navigate ('/dashboardadmin')}>Masuk</button>
                      
                      

                  </div>
                </div>
            </div>

    </div>
  )
}

export default Loginakun
