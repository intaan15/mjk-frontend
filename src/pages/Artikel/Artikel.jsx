import axios from "axios";
import { useState,useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Modal from "../../components/ModalTemplate";
import renderModalContent from "../../components/ModalContent";
import Basetable from "../../components/Table/Basetable";


import { FaUser } from "react-icons/fa";
import { TiUser } from 'react-icons/ti';
import { FaEdit } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import Swal from "sweetalert2";

const handleDelete = () => {
  Swal.fire({
    title: "Yakin mau hapus?",
    text: "Data yang dihapus tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      // Lanjutkan proses delete
      Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
    }
  });
};



export default function Artikel() {
  // OPEN MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  // PILIH TYPE MODAL
  const [modalType, setModalType] = useState("");

  // LOAD DAATA
  const [loading, setLoading] = useState(false);

  // SET DATA TABEL
  const [data, setData] = useState([]);''

  // SEARCHING
  const [searchTerm, setSearchTerm] = useState("");

  // DROPDOWN ACCOUNT
  const toggleDropdown = () => {setIsOpen(!isOpen);};
  const [isOpen, setIsOpen] = useState(false);

  
  const [selectedKategori, setSelectedKategori] = useState("obat");



  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");

    // Redirect ke halaman login
    navigate("/login");
  };

  // ENDPOINT GET DATA
  useEffect(() => {
    axios.get(`https://mjk-backend-production.up.railway.app/api/artikel/getall`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
        console.error('Error fetching data:', err);
        });
    }, 
  []);
  
  
  // PARAMATER HEADER,ISI,EDIT CELL TABLE
  const columns = [
  {
    accessorKey: "gambar_artikel",
    header: "Gambar",
    enableSorting: false,
    cell: ({ getValue }) => {
      const imageUrl = getValue();
      return (
        <img 
          src="foto"
          alt="Foto Dokter" 
          className="w-10 h-10 object-cover rounded-full" 
        />
      );} 
  },
  {
    accessorKey: "nama_artikel",
    header: "Judul Artikel",
    enableSorting: false,
  },
  {
    accessorKey: "tgl_terbit_artikel",
    header: "Tgl.Terbit",
    enableSorting: false,
  },
  {
    accessorKey: "kategori_artikel",
    header: "Kategori",
    enableSorting: false,
  },
  {
    accessorKey: "detail",
    header: "Detail",
    enableSorting: false,
    cell: ({ row }) => (
    <div className="flex gap-2 items-center bg-[#FAFBFD] p-2 rounded-xl border-1 border-[#979797]">
      <button onClick={() => handleEdit(row.original)} title="Edit">
        <FaEdit className="text-gray-600 hover:text-[#004A76] text-lg" />
      </button>
    </div>),
  },
  {
    accessorKey: "Action",
    header: "Aksi",
    enableSorting: false,
    cell: ({ row }) => (
    <div className="flex gap-2 items-center bg-[#FAFBFD] p-2 rounded-xl border-1 border-[#979797]">
      <button onClick={() => handleEdit(row.original)} title="Edit">
        <FaEdit className="text-gray-600 hover:text-[#004A76] text-lg" />
      </button>
    </div>),
  },]


  // MAINCONTENT  
  return (
    <div className="flex flex-row h-screen ">
      <main className='flex flex-col pl-8 gap-1 w-full pr-3'>
    
        {/* navbar */}
        <div className="flex flex-row items-center justify-between  pt-2">
          <div className=" text-3xl font-[Nunito Sans] font-bold text-[#004A76]">Artikel</div>
          <div className="flex flex-row gap-4 items-center relative">
            <div className=" flex items-center rounded-[19px] px-5 justify-start py-1 border-[1.5px] border-gray-300 gap-2 ">
              <IoIosSearch className="text-gray-400" />
               <input
                      type="text"
                      placeholder="Pencarian"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-gray-700 text-sm outline-none bg-transparent"
              />
            </div>
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

        <img src="line style.svg" alt="" />
        
        {/* choose */}
        <div className="flex flex-row justify-between w-full  items-center px-10 py-2">
          <div className="flex flex-row gap-8 bg-slate-300 p-2 rounded-4xl items-center px-6">
            <span className="font-medium text-gray-700">Kategori :</span>
            <button
              onClick={() => setSelectedKategori("kesehatan")}
              className={`px-4 py-1 rounded-full border-2 transition-all duration-200 ${
                selectedKategori === "kesehatan"
                  ? "bg-[#0c4a6e] text-white border-transparent font-semibold"
                  : "text-[#0c4a6e] border-[#7aa6c2] bg-white"
              }`}>
              Artikel Kesehatan
            </button>


            <button
                onClick={() => setSelectedKategori("obat")}
                className={`px-4 py-1 rounded-full border-2 transition-all duration-200 ${
                  selectedKategori === "obat"
                    ? "bg-[#0c4a6e] text-white border-transparent font-semibold"
                    : "text-[#0c4a6e] border-[#7aa6c2] bg-white"
                }`}
              >
                Artikel Obat
            </button>
          </div>
          <div className="">
            <button
              className=" bg-[#033E61] rounded-xl px-4 py-2 cursor-pointer text-white"
              onClick={() => openModal("tambahform")}
            >
              + Tambah Data Artikel
            </button>
          </div>
        </div>

        {/* main  */}
        <div className="py-2">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <>
              <Basetable data={data} columns={columns} />
            </>
            
          )}
        </div>
        
        <Modal open={isModalOpen} onClose={closeModal}>
          {renderModalContent(modalType, closeModal)}
        </Modal>
     
      </main>
     
    </div>
  );
}
