import React from 'react'

const Sidebar = () => {
  return (
    <div className='container flex flex-row w-screen'>
      {/* logo sidebar */}
      <div className='container sidebar w-[270px] h-screen bg-[#F2F2F2] flex flex-col'>
        <div className='logosidebar flex flex-row gap-1.5 mt-3 ml-3 '>
          <img className='flex flex-row w-[80px] justify-center' src="Logo Mojokerto Sehat.svg" alt="imglogo" />
          <p className='font-[raleway] font-extrabold text-[#025F96] text-[25px] items-center '>MOJOKERTO SEHAT</p>
        </div>

        {/*   menu sidebar */}
        <div className='menu sidebar flex flex-col gap-5 mt-10 ml-3'>
          <ul className=''>
            <li>
              <span className='font-[raleway] font-medium text-[#025F96] text-[20px]'>Dashbaord</span>

            </li>
            <li>
              <span className='font-[raleway] font-medium text-[#025F96] text-[20px]'>Konsultasi</span>

            </li>
            <li>
              <span className='font-[raleway] font-medium text-[#025F96] text-[20px]'>Data Masyrakat </span>

            </li>
            <li>
              <span className='font-[raleway] font-medium text-[#025F96] text-[20px]'>Data Dokter</span>

            </li>
            <li>
              <span className='font-[raleway] font-medium text-[#025F96] text-[20px]'>Artikel</span>

            </li>
           
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
