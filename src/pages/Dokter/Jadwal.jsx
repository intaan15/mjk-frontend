import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Basetable from "../../components/Table/Basetable";
import dayjs from "dayjs";
import _groupBy from "lodash/groupBy";
import _orderBy from "lodash/orderBy";
import uniq from "lodash/uniq";
import "dayjs/locale/id";
dayjs.locale("id");  



import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { TiUser } from 'react-icons/ti'
import { SiOpenstreetmap } from 'react-icons/si';
import { LuSquareArrowLeft } from "react-icons/lu";
import { LuSquareArrowRight } from "react-icons/lu";


function findSlotDokterPadaTanggal(dokterRow, tgl) {
  const jadwalObj = (dokterRow.jadwal ?? []).find(
    (j) => dayjs(j.tanggal).format("YYYY-MM-DD") === tgl
  );
  if (!jadwalObj) return null;

  const jamTersedia = (jadwalObj.jam ?? [])
    .filter((s) => s.available)
    .map((s) => s.time);

  if (jamTersedia.length === 0) return null;

  jamTersedia.sort((a, b) => a.localeCompare(b));   // ascending
  return `${jamTersedia[0]} - ${jamTersedia[jamTersedia.length - 1]}`;
}


const Jadwal = () => {
  const toggleDropdown = () => {setIsOpen(!isOpen);};
  const [loading, setLoading] = useState(false);
  const [jadwal, setJadwal] = useState([]);
  const [namaDokter, setNamaDokter] = useState('');
  const [dataDokter, setDataDokter] = useState([]);
  const [data,setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tanggalHeader,setTanggalHeader] = useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataDokter.slice(indexOfFirstItem, indexOfLastItem);
  console.log(dataDokter)
  

  
  useEffect(() => {
    const fetchDokter = async () => {
      try {
        const res = await axios.get(`https://mjk-backend-production.up.railway.app/api/dokter/getall`);
        const alldokter = res.data;
        const allJadwal =alldokter.flatMap((d) =>
          (Array.isArray(d.jadwal) ? d.jadwal : []).flatMap((j) =>
            (Array.isArray(j.jam) ? j.jam : []).map((session) => ({
              tanggal: dayjs(j.tanggal).format("YYYY-MM-DD"), 
              time: session.time,
              available: session.available,
              dokterId: d._id,
              dokterNama: d.nama_dokter,
            }))
          )
        );
        const getJamRange = (slots) => {
          if (!slots || slots.length === 0) return "-";
          const sortedJam = slots.slice().sort((a, b) => a.time.localeCompare(b.time));
          return `${sortedJam[0].time} - ${sortedJam[sortedJam.length - 1].time}`;
        };
        
        const byDate = _groupBy(allJadwal, "tanggal");
        const sortDate = _orderBy(Object.keys(byDate), (t) => t, "asc");
        const hasil = sortDate.map((tgl) => {
          const byDoctor = _groupBy(byDate[tgl], "dokterId");
          const dokterArr = Object.values(byDoctor).map((byJam) => {
            const meta = byJam[0];
            const jamSorted = _orderBy(byJam, (s) => s.time, "asc").map(
              (s) => ({
                time: s.time,
                available: s.available
              })
            );
            return {
                id: meta.dokterId,
                nama: meta.dokterNama,
                spesialis: meta.spesialis,
                foto: meta.foto,
                slot: getJamRange(jamSorted)
              };
            });
            return {tanggal: tgl,dokter: dokterArr};
            });
          
        setDataDokter(alldokter);
        setTanggalHeader(sortDate);
      } catch (error) {
         console.error(error);}
        }; 
        
        fetchDokter()
      },[]);
      

useEffect(() => {setCurrentPage(1);}, [dataDokter]);

const staticColumns = [
  { id: "no", header: "No", cell: ({ row }) => row.index + 1 },
  { accessorKey: "nama_dokter", header: "Nama",enableSorting: false, },       
  { accessorKey: "spesialis_dokter", header: "Spesialis", enableSorting: false, }
];
    const tanggalArray = React.useMemo(() => {
      const all = dataDokter.flatMap((d) =>
        (d.jadwal ?? []).map((j) => dayjs(j.tanggal).format("YYYY-MM-DD"))
      );
      return uniq(all).sort();
    }, [dataDokter]);

  const dynamicColumns = React.useMemo(
    () =>
      tanggalArray.map((tgl) => ({
        id: `tgl-${tgl}`,
        header: () => {
            const d = dayjs(tgl).locale("id");
            return (
              <div className="flex flex-row items-center leading-tight">
                <div className='flex flex-col items-center border-r-2 px-2 '>
                    <span className="text-xs font-medium">{d.format("dddd")}</span>
                    <span className="text-sm font-semibold">{d.format("DD‑MM‑YYYY")}</span>
                </div>
              </div>
            );
          },
        cell: ({ row }) => (
          <div className="flex justify-center items-center h-full">
            {findSlotDokterPadaTanggal(row.original, tgl) || "-"}
          </div>
        )
      })),
    [tanggalArray]
  );

  const columns = React.useMemo(
    () => [...staticColumns, ...dynamicColumns],
    [dynamicColumns]
  );


  

  return (
    <div className='flex flex-row'>
      <main className='flex flex-col pl-8 gap-1 w-full pr-3 h-screen'>
         <div className='flex flex-row items-center justify-between pt-1'>
            <p className='text-3xl font-[Nunito Sans] font-bold text-[#004A76]'>Jadwal Praktek Dokter</p>
            <div className="flex flex-row gap-4 relative">
                <div className="flex flex-row gap-4 relative">
                    <button 
                    onClick={toggleDropdown} 
                    className="flex items-center focus:outline-none cursor-pointer">
                    <TiUser className='w-11 h-11 text-[#292D32]'> </TiUser>
                    </button>

                    <div>
                    {isOpen && (
                        <>
                        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsOpen(false)}></div>
                        <div className="absolute right-0 origin-top-right mt-8 w-48 lg: px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50 ">
                            <div className="py-1 justify-center">
                            <a
                                href=""
                                className="flex flex-row py-2 text-md font-[raleway] items-center font-bold text-[#004A76] gap-3">
                                <HiOutlineUser className='text-[30px]' />
                                Administrator
                            </a>
                            
                            <a
                                href="#"
                                onClick={handleLogout}
                                className="flex flex-row py-2 text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3">
                                <IoLogOutOutline className='text-[30px]' />
                                {" "}
                                Log Out
                            </a>
                            </div>
                        </div>
                        </>
                    )}
                    </div>
                </div>
            </div>
        </div>
        <img src="/line style.svg" alt="" />

        <div className='flex flex-row items-center justify-center text-center'>
          <div className=''>
            <button 
              className='text-3xl text-[#004A76] items-center hover:bg-black'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}>
              <LuSquareArrowLeft />
            </button>
            
            <button 
              className='text-3xl text-[#004A76] items-center hover:bg-black'
              onClick={() => setCurrentPage((prev) => (prev * itemsPerPage < dataDokter.length ? prev + 1 : prev))}
              disabled={currentPage * itemsPerPage >= dataDokter.length}
            >
              <LuSquareArrowRight />
            </button>

             
          </div>
          <div>
            <label htmlFor=""></label>
          </div>
        </div>


        <div className="py-2">
          {loading ? (
              <p>Loading data...</p>
          ) : (
              <>
              <Basetable data={currentItems} columns={columns} />
              </>   
          )}
        </div>
        
      </main>
    </div>
  )
}

export default Jadwal
