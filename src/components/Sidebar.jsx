import React from 'react'

const Sidebar = () => {
  return (
    <div className='container flex flex-row w-screen'>
      {/* logo sidebar */}
      <div className='container sidebar w-[270px] h-screen bg-[#F2F2F2] flex flex-col justify-between'>
        <div className='logosidebar flex flex-row gap-1.5 mt-3 ml-3 '>
          <img className='flex flex-row w-[80px] justify-center' src="Logo Mojokerto Sehat.svg" alt="imglogo" />
          <p className='font-[raleway] font-extrabold text-[#025F96] text-[25px] items-center '>MOJOKERTO SEHAT</p>
        </div>

        {/*   menu sidebar */}
      
        <div className=''>
          <ul>
            <li>Dashboard</li>
            <li>Dashboard</li>
            <li>Dashboard</li>
            
          </ul>

        </div>
      </div>
    </div>
  )
}

export default Sidebar
