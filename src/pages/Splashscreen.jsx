import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const Splashscreen = () => {
  return (
    <div className='loginapage logo flex flex-col w-screen h-screen justify-center items-center bg-[#F2F2F2] '>
      <div className='logo flex flex-col items-center pb-16'>
          <img className='flex flex-row w-80 justify-center' src="Logo Mojokerto Sehat.svg" alt="imglogo" />
          <p className='font-[raleway] font-extrabold text-[#025F96] text-[30px] items-center '>MOJOKERTO SEHAT</p>
          <div className=' flex flex-row '>
            <p className='text-[16px] text-[#438222] italic item-ends justify-end mr-0'>Dinas Kesehatan Kab.Mojokerto</p>
          </div>
      </div>
      <div className='flex flex-col items-center bottom-0 justify-center absolute'>
        <img className='flex flex-row w-screen justify-center ' src="public/footer.svg" alt="imgfooter" />
      </div>
    </div>

  )
}

export default Splashscreen
