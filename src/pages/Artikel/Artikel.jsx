import axios from "axios";
import { useState,useEffect,useCallback } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Modal from "../../components/Modal/ModalTemplate";
import ModalContent from "../../components/Modal/ModalContent";
import Basetable from "../../components/Table/Basetable";
import { useAuth } from "../../components/Auth";
import { showSuccessToast, showErrorToast } from '../../components/Modal/ToastModal'


import { FaUser } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { TiUser } from 'react-icons/ti';
import { FaEdit } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Swal from "sweetalert2";



export default function Artikel() {

  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleDropdown = () => {setIsOpen(!isOpen);};
  const [selectedKategori, setSelectedKategori] = useState("");
  const [artikel, setArtikel] = useState([]); 
  const [selectedId, setSelectedId] = useState(null);
  const [dataArtikel, setDataArtikel] = useState(null);
  const openModalWithId = (id, type) => {
    console.log("Membuka modal dengan ID:", id); // Debug
    if (!id) {
      alert("ID artikel tidak valid!");
      return;
    }
    setSelectedId(id);
    setModalType(type);
    setIsModalOpen(true);
  };

  const openModal = (type, id) => {
    setModalType(type);
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setModalType(null);
  };
  

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");
    navigate("/login");
  };

  // FILTER ARTIKEL
  const filteredData = artikel?.filter((item) =>
    selectedKategori === "" ? true : item.kategori_artikel === selectedKategori
  );

  const formatTanggal = (isoDateString) => {
  const date = new Date(isoDateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin mau hapus?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://mjk-backend-production.up.railway.app/api/artikel/delete/${id}` , {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }
          );

          Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
          fetchArtikel();
          // handleRefresh(); // Refresh data setelah hapus
        } catch (error) {
          console.error("Gagal menghapus artikel:", error);
          Swal.fire(
            "Gagal!",
            "Terjadi kesalahan saat menghapus data.",
            "error"
          );
        }
      }
    });
  };


  const fetchArtikel = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://mjk-backend-production.up.railway.app/api/artikel/getall", 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }}
      );
      setArtikel(res.data);
    } catch (err) {
      console.error("Gagal fetch artikel:", err);
    }
  }, []);

  useEffect(() => {
    if (!selectedId) return; 
     const fetchData = async () => {
      try {
          const response = await axios.get(
            `https://mjk-backend-production.up.railway.app/api/artikel/getbyid/${selectedId}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                }}
            );
            // console.log("Data diterima:", response.data);
            setDataArtikel(response.data);
          } catch (error) {
              console.error("Gagal fetch artikel:", {
              status: error.response?.status,
              message: error.message,
              data: error.response?.data,
              });
          }
          };
        fetchData()
    },[selectedId, token]);

  useEffect(() => {
    fetchArtikel();
  }, [fetchArtikel]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchArtikel(); 
  };
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
        );
      },
    },
    {
      accessorKey: "nama_artikel",
      header: "Judul Artikel",
      enableSorting: false,
      
    },
    {
      accessorKey: "createdAt",
      header: "Tgl.Terbit",
      enableSorting: true,
      cell: (info) => formatTanggal(info.getValue()),
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
        <div className="flex gap-2 items-center ">
          <button
            onClick={() => openModal("detailartikel", row.original._id)}
            title="Detail"
          >
            <HiOutlineExclamationCircle className="text-black hover:text-[#004A76] text-lg text-center" />
          </button>
        </div>
      ),
    },
    {
      accessorKey: "Action",
      header: "Aksi",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="inline-flex overflow-hidden items-center bg-[#FAFBFD] p-2 gap-3 rounded-xl border-1 border-[#979797]">
          <button onClick={() => openModal("editdataartikel", row.original._id)} title="Edit">
            <FaEdit className="w-5 h-5 text-gray-600 hover:text-[#004A76] text-lg" />
          </button>

          <button onClick={() => handleDelete(row.original._id)} title="Hapus">
            <FaTrashAlt className="w-5 h-5 text-red-500 hover:text-red-700 text-lg" />
          </button>
        </div>
      ),
    },
  ];


  // MAINCONTENT  
  return (
    <div className="flex flex-row h-screen ">
      <main className="flex flex-col pl-8 gap-1 w-full pr-3">
        {/* navbar */}
        <div className="flex flex-row items-center justify-between  pt-2">
          <div className=" text-3xl font-[Nunito Sans] font-bold text-[#004A76]">
            Artikel
          </div>
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
                className="flex items-center focus:outline-none cursor-pointer"
              >
                <TiUser className="w-11 h-11 text-[#292D32]"> </TiUser>
              </button>

              <div>
                {isOpen && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/30 z-40"
                      onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute right-0 origin-top-right mt-8 w-48 lg: px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50 ">
                      <div className="py-1 justify-center">
                        <a
                          href=""
                          className="flex flex-row py-2 text-md font-[raleway] items-center font-bold text-[#004A76] gap-3">
                          <HiOutlineUser className="text-[30px]" />
                          {user?.username}
                        </a>

                        <a
                          href=""
                          onClick={handleLogout}
                          className="flex flex-row py-2 text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3"
                        >
                          <IoLogOutOutline className="text-[30px]" /> Log Out
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
        <div className="flex flex-row justify-between w-full  items-center px-2 py-2">
          <div className="flex flex-row gap-8 bg-slate-300 p-2 rounded-4xl items-center">
            <span className="font-bold text-gray-700 font-[raleway]">Kategori :</span>
            <button
              onClick={() => setSelectedKategori("Kesehatan")}
              className={` w-50 px-4 py-1 rounded-full border-2  font-[raleway] transition-all duration-200 ${
                selectedKategori === "Kesehatan"
                  ? "bg-[#0c4a6e] text-white border-transparent font-semibold"
                  : "text-[#0c4a6e] border-[#7aa6c2] bg-white"
              }`}
            >
              Artikel Kesehatan
            </button>

            <button
              onClick={() => setSelectedKategori("Obat")}
              className={` w-50 px-4 py-1 rounded-full font-[raleway] border-2 transition-all duration-200 ${
                selectedKategori === "Obat"
                  ? "bg-[#0c4a6e] text-white border-transparent font-semibold"
                  : "text-[#0c4a6e] border-[#7aa6c2] bg-white"
              }`}
            >
              Artikel Obat
            </button>
          </div>
          <div className="">
            <button
              className=" bg-[#004A76] rounded-full shadow-xl px-4 py-2 cursor-pointer text-white font-[raleway] hover:bg-white hover:text-[#004A76] hover:border-2  "
              onClick={() => openModal("tambahartikel")}
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
              <Basetable data={filteredData} columns={columns} />
            </>
          )}
        </div>

        <Modal open={isModalOpen} onClose={closeModal}>
          <ModalContent
            modalType={modalType}
            // onClose={closeModal}
            idArtikel={selectedId}
            dataArtikel={dataArtikel}
            token={token}
            onClose={handleCloseModal}
          />
        </Modal>
      </main>
    </div>
  );
}
