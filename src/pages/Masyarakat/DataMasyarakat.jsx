import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Typography } from "@material-tailwind/react";



import { TiUser } from 'react-icons/ti'
import { FaUser } from 'react-icons/fa'
import { IoIosSearch } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
// import { useModal } from '../components/ModalTemplate'




function DataMasyarakat() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/masyarakat`)
            .then((res) => {
            console.log(res.data);
            setData(res.data);
            })
            .catch((err) => {
            console.error('Error fetching data:', err);
            });
        }, []);

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
                <div className="flex flex-row gap-4">
                    <div className=" mt-3 flex items-center rounded-[19px] px-14 justify-start py-1 border-[1.5px] border-gray-300 gap-2">
                        <IoIosSearch className="text-gray-400"/>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="text-gray-700 text-sm outline-none bg-transparent"
                        />
                    </div>
                    <button onClick={toggleDropdown} className="items-center focus:outline-none cursor-pointer pt-3">
                        <TiUser className='w-[40px] h-[40px] text-[#292D32]'> </TiUser>
                        <div>
                            {isOpen && (
                            <div className="absolute right-3 w-44 origin-top-right mt-2 shadow-xl rounded-xl bg-white ring-1 ring-blue ring-opacity-3 z-50 ">
                                <div className="py-1">
                                <a href="#" className="font-[raleway] block py-2 text-sm text-gray-700 hover:bg-gray-100 ">Profil Admin</a>
                                <a href="/" className="font-[raleway] block py-2 text-sm text-gray-700 hover:bg-gray-100"> Log Out</a>
                                </div>
                            </div>)}
                        </div>
                        </button> 
                    </div> 
            </div>
            <img src="/line style.svg" alt="" />


            <div className="flex flex-row justify-between w-full  items-center px-10 py-2">
                <div className="flex flex-row gap-8 bg-[#033E61] h-auto p-2 rounded-xl items-center px-6">
                    <div className="bg-white p-3 rounded-full flex items-center justify-center">
                        <FaUserAlt className="text-[30px] item-center text-[#396AFF] " />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-[raleway] text-white font-bold text-[15px]">Jumlah Pengguna</div>
                        <div className="font-[raleway] text-white font-medium text-[12px]">20 orang</div>
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
                {data
                    .filter((item) =>
                        item.username.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(({ foto, username, email, kontak, nik }, index) => {
                        const isLast = index === data.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                        <tr key={username}>
                            <td className={classes}><img src={foto} alt="user" className="w-12 h-12 rounded-full" /></td>
                            <td className={classes}>{username}</td>
                            <td className={classes}>{email}</td>
                            <td className={classes}>{kontak}</td>
                            <td className={classes}>{nik}</td>
                            <td className={classes}><button className="text-blue-500">Detail</button></td>
                        </tr>
                        );
                })}
                {/* <tbody>
                    {TABLE_ROWS.map(({ foto, username, email, kontak, nik }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    
                    return (
                        <tr key={username}>
                        <td className={classes}>
                        <img
                            src={user.foto} // ini dari database
                            alt={`Foto ${user.name}`}
                            className="w-10 h-10 rounded-full object-cover"
                            />
                        </td>
                        <td className={classes}>
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {username}
                            </Typography>
                        </td>
                        <td className={classes}>
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {username}
                            </Typography>
                        </td>
                        <td className={classes}>
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {username}
                            </Typography>
                        </td>
                        
                        <td className={classes}>
                            <div className="flex gap-2">
                            <Typography
                                as="button"
                                onClick=""
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                            >
                                Detail
                            </Typography>
                            <Typography
                                as="button"
                                onClick=""
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
                        </td>  */}
                    {/* </tr>
                    );
                    })}
                </tbody> */}
                </table> 
            </div>

                
        </main>
    </div>
  )
}

export default DataMasyarakat