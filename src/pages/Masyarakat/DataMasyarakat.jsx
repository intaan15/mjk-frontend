import React from 'react'
import { useState } from 'react'
import { Typography } from "@material-tailwind/react";


import { TiUser } from 'react-icons/ti'
import { FaUser } from 'react-icons/fa'
import { FaUserAlt } from "react-icons/fa";
// import { useModal } from '../components/ModalTemplate'





function DataMasyarakat() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };



      const TABLE_HEAD = [
        "Foto",
        "Username",
        "Email",
        "Kontak",
        "NIK",
        "Detail",
      ];
      
      const TABLE_ROWS = [
        {
          foto : "img",
          username: "Johnmichael",
          email: "joh123@fgmai;l.com",
          kontak: "08123456789",
          nik: "1234567890123456",
            
          
        },]



  return (
    <div className='flex flex-row'>
        <main className=' w-full md:5/6 flex flex-col pl-18 pr-5 gap-1 bg-gray-100 '>
            <div className='flex flex-row grid-2 items-center justify-between  pt-2'>
                <p className='text-[25px] font-[raleway] font-bold text-[#004A76]'>Data Masyarakat</p>
                <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none cursor-pointer">
                <TiUser className='w-[30px] h-[30px] text-[#292D32]'> </TiUser>
                <div>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-blue ring-opacity-3 z-50 ">
                    
                    <div className="py-1">
                        <a href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100 ">Profil Admin</a>
                        <a href="/" className="block py-2 text-sm text-gray-700 hover:bg-gray-100"> Log Out</a>
                    </div>
    
                    </div>
                )}
                </div>
                </button>
            </div>
            <img src="/line style.svg" alt="" />


            <div className="flex flex-row justify-between w-full  items-center px-10 py-2">
                <div className="flex flex-row gap-8 bg-[#ADC8FF] p-2 rounded-2xl items-center px-6">
                    <div className="">
                        <FaUserAlt className="text-[30px] item-center text-" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-[raleway] font-bold text-[15px]">Total Data</div>
                        <div className="font-[raleway] font-medium text-[12px]">20 orang</div>
                    </div>
                </div>
            </div>


            {/* main  */}
            <div className="border-2 border-gray-300 rounded-xl h-auto w-full mt-4 overflow-x-hidden">
                {/* <Card className="h-full w-full overflow-scroll"> */}
                <table className="w-full min-w-max table-auto text-left">
                <thead className=" sticky top-0 z-10">
                    <tr>
                    {TABLE_HEAD.map((head) => (
                        <th
                        key={head}
                        className="p-4 border-b border-blue-gray-100 bg-[#38B6FE]/50"
                        >
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                        >
                            {head}
                        </Typography>
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(({ foto, username, email, kontak, nik }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    
                    return (
                        <tr key={username}>
                        <td className={classes}>
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {username}
                            </Typography>
                        </td>
                        
                        {/* <td className={classes}>
                            <div className="flex gap-2">
                            <Typography
                                as="button"
                                onClick={() => openModal("detailprofildokter")}
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                            >
                                Detail
                            </Typography>
                            <Typography
                                as="button"
                                onClick={handleDelete}
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                            >
                                Hapus
                            </Typography>
                            <Typography
                                as="button"
                                onClick={() => openModal("editform")}
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                            >
                                Edit
                            </Typography>
                            </div>
                        </td> */}
                    </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>

                
        </main>
    </div>
  )
}

export default DataMasyarakat