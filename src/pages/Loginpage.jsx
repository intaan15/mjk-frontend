import React from 'react'
// import { useNavigate } from 'react-router-dom';
import ('../index.css')

function Loginpage() {
  return (
    <div className='bg-white flex justify-center items-center h-screen flex-col'>
      {/* Logo header atas  */}
      <div className='header flex flex-row absolute top-5 w-12px'>
        <img className='logoheader w-8' src="Logo Mojokerto.svg" alt="" />
        <img className="logofasilkom w-26"src="logo fasilkom 1.svg" alt="" />
      </div>

      {/* logo tengah */}
      <div className='logo flex flex-col items-center justify-center'>
          <img className='flex flex-row w-80 justify-center' src="Logo Mojokerto Sehat.svg" alt="" />
          <p className='font-raleway font-extrabold text-[#025F96] text-[35px] items-center '>MOJOKERTO SEHAT</p>
          <p className='font-medium text-[#025F96] items-end justify-end mr-0'>by tim tujuh</p>
       </div> 

      {/* variasi footer */}
       <div className='flex flex-row h-10 w-screen items-center justify-center'>
          <img className="footerimg h-26 left-0 w-full opacity-30 absolute bottom-0"src="./footer.svg" alt="footer" />
       </div> 
    </div>
  )
  
}

export default Loginpage
