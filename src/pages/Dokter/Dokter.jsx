import { useState,useEffect } from "react";
import axios from "axios";




// icon
import Modal from "../../components/Modal/ModalTemplate";
import Basetable from "../../components/Table/Basetable";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { TiUser } from 'react-icons/ti';
import { FaEdit } from "react-icons/fa"; 
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import renderModalContent from "../../components/Modal/ModalContent";
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




function Dokter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("null");
  const [searchTerm, setSearchTerm] = useState("");
  const toggleDropdown = () => {setIsOpen(!isOpen);};
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);

  const openModal = (type,data) => {
    setModalType(type);
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
     setIsModalOpen(false);
    setModalType(null);
    setSelectedData(null);
  };

  const formatTanggal = (isoDateString) => {
  const date = new Date(isoDateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");

    // Redirect ke halaman login
    navigate("/login");
  };

  // ENDPOINT GET DATA DOKTER
  useEffect(() => {
    axios.get("https://mjk-backend-production.up.railway.app/api/dokter/getall")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data dokter:", err);
        setLoading(false);
      });
  }, []);
  
  const deleteDokterById = async (_id) => {
     const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data ini akan dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`https://mjk-backend-production.up.railway.app/api/dokter/${_id}`);
          console.log("Berhasil hapus:", res.data);
          getDokter();

          toast.success("Data dokter berhasil dihapus!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000, // Timer mundur 5 detik
      });
       } catch (err) {
      console.error("Gagal hapus:", err);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
    }
  }
};


  // paramater tabel
  const columns = [
      {
        accessorKey: "foto_profil_dokter",
        header: "Foto",
        enableSorting: false,
        cell: ({ getValue }) => {
          const imageUrl = getValue();
          console.log("Image URL:", imageUrl);
          return (
            <img 
              src={`https://mjk-backend-production.up.railway.ap/api/dokter/${imageUrl}`}
              alt="Foto Dokter" 
              className="w-10 h-10 object-cover rounded-full" 
            />
          );} 
      },
      {
        accessorKey: "nama_dokter",
        header: "Nama",
        enableSorting: false,
      },
      {
        accessorKey: "spesialis_dokter",
        header: "Spesialisasi",
        enableSorting: false,
      },
      {
        accessorKey: "str_dokter",
        header: "Nomor STR",
        enableSorting: false,
      },
      {
        accessorKey: "createdAt",
        header: "Tgl. Registrasi",
        enableSorting: true,
        cell: info => formatTanggal(info.getValue()),
      },
      {
        accessorKey: "detail", 
        header: "Detail",
        enableSorting: false,
        cell: ({ row }) => (
         <div className="flex gap-2 items-center bg-[#FAFBFD] p-2 rounded-xl border-1 border-[#979797]">
            <button onClick={() =>openModal("detailprofildokter", row.original)} title="Detail">
              <HiOutlineExclamationCircle className="text-black hover:text-[#004A76] text-lg" />
            </button>

            <button onClick={() => handleEdit(row.original)} title="Edit">
              <FaEdit className="text-gray-600 hover:text-[#004A76] text-lg" />
            </button>

            <button onClick={() =>deleteDokterById(_id)} title="Hapus">
              <FaTrashAlt className="text-red-500 hover:text-red-700 text-lg" />
            </button>
          </div>),
          
          
      },
  ];


    

  return (
    <div className="flex flex-row ">
      <main className="flex flex-col pl-8 gap-1 w-full pr-3">
          {/* kanan */}
          <div className='flex flex-row items-center justify-between pt-1'>
            <p className='text-3xl font-[Nunito Sans] font-bold text-[#004A76]'> Data Dokter</p>
            <div className="flex flex-row gap-4 relative">

                <div className=" flex items-center rounded-[19px] px-5 justify-start py-1 border-[1.5px] border-gray-300 gap-2 ">
                  <IoIosSearch className="text-gray-400"/>
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
          
          {/* Garis biru */}
          <div className="w-[100%] h-1 bg-[#1177B3]"></div>

          <div className="flex flex-row justify-between w-full  items-center px-5 py-1">
              <div className="flex flex-row gap-8 bg-[#E0F4FF] p-2 rounded-xl items-center px-3">
                <div className="bg-[#004A76] p-3 rounded-full flex items-center justify-center">
                  <FaUser className="text-[30px] item-center text-white" />
                </div>
                <div className="flex flex-col">
                  <div className="font-[raleway] text-[#004A76] font-bold text-[15px]">Jumlah Dokter</div>
                  <div className="font-[Nunito] text-[#004A76]  font-medium text-[15px]">{data.length} Pengguna</div>
                </div>
              </div>
              <button
                onClick={() => openModal("tambahform")}
                className="bg-[#033E61] rounded-2xl font-[Raleway] p-6 py-2 cursor-pointer text-white text-sm shadow-lg flex items-center gap-2"
              >
                <IoIosAddCircleOutline size={18} />
                Tambah Data Dokter
              </button>
          </div>

          {/* main table */}
          <div className="py-2">
            {loading ? (
              <p>Loading data...</p>
            ) : (
              <>
                <Basetable data={data} columns={columns} />
                {isModalOpen && (
                  <Modal open={isModalOpen} onClose={closeModal}>
                    {renderModalContent(modalType, closeModal, selectedData)}
                  </Modal>
                )}
              </>
            )}
          </div>
         
      </main>
    </div>
  );
}

export default Dokter;
