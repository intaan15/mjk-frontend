
import { useState,useEffect,useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../components/Auth";
import.meta.env.VITE_BASE_URL

import Basetable from "../../components/Table/Basetable";
import Modal from "../../components/Modal/ModalTemplate";
import ModalContent from "../../components/Modal/ModalContent";
import useVerifikasi from "../../components/_hooksPages/useVerifikasi";
import useLogout from '../../components/_hooksPages/useLogout';

import { TiUser } from 'react-icons/ti'
import { IoIosSearch } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi2";


function Verifikasi() {
    const {handleLogout:handleLogout}=useLogout()
    const [selectedData, setSelectedData] = useState(null);
    const { user } = useAuth();

    const {
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        isModalOpen,
        modalType,
        filteredData,
        countStatus,
        isOpen,
        dataMasyarakatbyId,
        selectedId,
        loading,
        toggleDropdown,
        formatTanggal,
        handleVerifikasi,
        token,
        setModalType,
        setSelectedId,
        setIsModalOpen,
        animasi_gambar,
        setIsOpen
    } = useVerifikasi();

    
    const openModalWithId = (type,id) => {
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
        setModalType(null);
        setSelectedData(null);
    };

    const handleEdit = (data) => {
      setSelectedData(data);
      setIsModalOpen(true);
    };
    const handleCloseModal = () => {
      setIsModalOpen(false);
      fetchArtikel();
    };
    

    // HEADER TABLE
    const columns = [
      {
        header: "No",
        enableSorting: false,
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "foto_profil_masyarakat",
        header: "Foto",
        enableSorting: false,
        cell: ({ getValue }) => {
          const imageUrl = getValue();
          return (
            <div className="group relative">
              <div className={`${animasi_gambar.animations.fast} group-hover:scale-105`}>
                {imageUrl ? (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${imageUrl}`}
                    alt="foto profil"
                    className="w-10 h-10 object-cover rounded-lg shadow-sm border border-gray-200"
                    onError={(e) => {
                      e.target.src = "/default-avatar.jpg";
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <HiOutlineUser className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "nama_masyarakat",
        header: "Nama",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="whitespace-normal break-words max-w-60">
            {row.original.nama_masyarakat}
          </div>
        ),
      },
      {
        accessorKey: "email_masyarakat",
        header: "Email",
        enableSorting: false,
      },
      {
        accessorKey: "nik_masyarakat",
        header: "NIK",
        enableSorting: false,
      },
      {
        accessorKey: "createdAt",
        header: "Tanggal Registrasi",
        enableSorting: true,
        cell: (info) => formatTanggal(info.getValue()),
      },
      {
        accessorKey: "detail",
        header: "Detail",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2 items-center  ">
            <button
              onClick={() =>
                openModal("detailprofilmasyarakat", row.original._id)
              }
              title="Detail"
            >
              <HiOutlineExclamationCircle className="w-7  h-7 p-1 flex text-center justify-center  text-[#033E61] rounded-sm transition cursor-pointer" />
            </button>
          </div>
        ),
      },

      {
        accessorKey: "actions",
        header: "Status Konfirmasi",
        enableSorting: false,
        cell: ({ row }) => {
          //untuk menampilkan hasil setelah diverifikasi
          const status = row.original.verifikasi_akun_masyarakat;

          if (status === "diterima") {
            return (
              <span className="bg-[#27AE60] text-white w-full text-center p-3 text-md hover:bg-green-200 hover:text-[#27AE60] rounded-[10px] transition ">
                Diterima
              </span>
            );
          }

          if (status === "ditolak") {
            return (
              <span className="bg-[#FF1700] text-white w-15 text-center p-3 text-md hover:bg-red-200  hover:text-[#FF1700] rounded-[10px] transition">
                Ditolak
              </span>
            );
          }

          return (
            //button sblm verifikasi
            <div className="flex gap-2 items-center bg-[#FAFBFD]">
              <button
                onClick={() =>
                  handleVerifikasi(
                    "diterima",
                    row.original._id,
                    row.original.email_masyarakat
                  )
                }
                title="Terima"
                className="bg-[#27AE60] cursor-pointer text-white w-20 text-center p-3 hover:bg-green-200 text-md hover:text-[#27AE60] rounded-[10px] transition"
              >
                Diterima
              </button>
              <button
                onClick={() =>
                  handleVerifikasi(
                    "ditolak",
                    row.original._id,
                    row.original.email_masyarakat
                  )
                }
                title="Tolak"
                className="bg-[#FF1700] cursor-pointer text-white w-20 text-center p-3 hover:bg-red-200 text-md hover:text-[#FF1700] rounded-[10px] transition"
              >
                Ditolak
              </button>
            </div>
          );
        },
      },
    ];
    

 
    return (
      <div className="min-h-screen sm:mb-2 md:mb-4 lg:mb-5 lg:mt-0 bg-gray-50 transition-all duration-300 ease-in-out overflow-x-hidden">
        <main className="flex flex-col pt-4 px-4 xs:p-8 sm:p-10 md:p-6 lg:p-5 gap-3 sm:gap-0 md:gap-1 md:pt-5  mb-20 sm:mb-0 w-full max-w-full">
        {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 animate-fade-in">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-[raleway] font-bold text-[#004A76]">
               Verifikasi Data Masyarakat
            </h1>
            <div className="flex sm:flex-row gap-2 w-full sm:w-auto sm:items-center transition-all duration-200 ease-in-out">
              {/* Search Bar */}
              <div className="flex items-center rounded-xl px-3 py-2 border-[1.5px] border-gray-300 gap-3 w-full sm:w-full  min-w-0 h-10 sm:h-11">
                <IoIosSearch className="text-gray-400 text-lg flex-shrink-0  sm:text-xl" />
                <input
                    type="text"
                    placeholder="Cari Nama"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-gray-700 text-sm outline-none bg-transparent flex-1 sm:w-48 md:w-56 min-w-0"
                />
              </div>
  
              {/* Profile Dropdown */}
              <div className="flex flex-row gap-4 relative transition-all duration-200 ">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center  justify-center focus:outline-none cursor-pointer w-10 h-10 sm:w-11 sm:h-11 md:w-11 md:h-11 lg:w-11 lg:h-11 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <TiUser className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#292D32]" />
                </button>
  
                <div>
                  {isOpen && (
                    <>
                      <div
                        className="fixed inset-0 bg-black/30 z-40 transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      ></div>
                      <div className="absolute right-0 origin-top-right mt-8 w-48 px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50">
                        <div className="py-1 justify-center transition-all duration-200">
                          <a className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-bold text-[#004A76] gap-3">
                            <HiOutlineUser className="text-xl sm:text-2xl md:text-[30px]" />
                            {user?.username}
                          </a>
  
                          <a
                            onClick={handleLogout}
                            className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3 cursor-pointer"
                          >
                            <IoLogOutOutline className="text-xl sm:text-2xl md:text-[30px]" />
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
          
          <img src="/line style.svg" alt="" className="w-full" />

          {/* Statistics Cards */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-3 px-2 sm:px-4 lg:px-6 gap-3 lg:gap-2 ">
            
            {/* Card 1: Menunggu Verifikasi */}
            <div className="group flex flex-row gap-4 sm:gap-6 lg:gap-6 bg-gradient-to-r from-[#004A76] to-[#0066A3] p-4 sm:p-3 rounded-2xl items-center px-4 sm:px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/10 backdrop-blur-sm">
              <div className="bg-white p-2 sm:p-3 rounded-full flex items-center justify-center flex-shrink-0">
                <img
                  src="/icon_totalverifikasi.svg"
                  alt="totalverifikasi"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className="text-white font-bold text-sm sm:text-md leading-tight"
                  style={{ fontFamily: "Nunito Sans" }}
                >
                  Menunggu Verifikasi
                </span>
                <span
                  className="text-white font-extrabold text-2xl sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: "Nunito Sans" }}
                >
                  {countStatus.pending}
                </span>
              </div>
            </div>

            {/* Card 2: Verifikasi Diterima */}
            <div className="group flex flex-row gap-4 sm:gap-6 lg:gap-6 bg-gradient-to-r from-[#004A76] to-[#0066A3] p-4 sm:p-3 rounded-2xl items-center px-4 sm:px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/10 backdrop-blur-sm">
              <div className="bg-white p-2 sm:p-3 rounded-full flex items-center justify-center flex-shrink-0">
                <img
                  src="/icon_verifikasiditerima.svg"
                  alt="diterima"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className="text-white font-bold text-sm sm:text-md leading-tight"
                  style={{ fontFamily: "Nunito Sans" }}
                >
                  Verifikasi Diterima
                </span>
                <span
                  className="text-white font-extrabold text-2xl sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: "Nunito Sans" }}
                >
                  {countStatus.diterima}
                </span>
              </div>
            </div>

            {/* Card 3: Verifikasi Ditolak */}
            <div className="group flex flex-row gap-4 sm:gap-6 lg:gap-6 bg-gradient-to-r from-[#004A76] to-[#0066A3] p-4 sm:p-3 rounded-2xl items-center px-4 sm:px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/10 backdrop-blur-sm">
              <div className="bg-white p-2 sm:p-3 rounded-full flex items-center justify-center flex-shrink-0">
                <img
                  src="/icon_verifikasiditolak.svg"
                  alt="ditolak"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className="text-white font-bold text-sm sm:text-md leading-tight"
                  style={{ fontFamily: "Nunito Sans" }}
                >
                  Verifikasi Ditolak
                </span>
                <span
                  className="text-white font-extrabold text-2xl sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: "Nunito Sans" }}
                >
                  {countStatus.ditolak}
                </span>
              </div>
            </div>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-row gap-2 w-full items-center px-2 sm:px-4 py-1">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 bg-[#D9D9D9]/50 p-3 sm:p-2 rounded-xl items-start sm:items-center px-4 sm:px-6 w-full sm:w-auto shadow-md">
              <div className="font-bold text-[#033E61] text-sm sm:text-base whitespace-nowrap">
                Kategori :
              </div>
              <div className="flex flex-row gap-2 sm:gap-4 justify-start w-full sm:w-auto overflow-x-auto">
                <div
                  onClick={() => setFilterStatus("semua")}
                  className={`cursor-pointer font-[raleway] rounded-xl border-2 px-3 sm:px-4 py-1 border-[#033E61] text-center text-sm sm:text-base transition-all duration-200 ${
                    filterStatus === "semua"
                      ? "bg-[#025F96] font-bold text-white border-[#033E61]"
                      : "bg-[#D9D9D9]/50 hover:bg-[#025F96]/20"
                  }`}
                >
                  Verifikasi
                </div>

                <div
                  onClick={() => setFilterStatus("diterima")}
                  className={`cursor-pointer font-[raleway] rounded-xl border-2 px-3 sm:px-4 py-1 border-[#033E61] text-center text-sm sm:text-base transition-all duration-200 ${
                    filterStatus === "diterima"
                      ? "bg-[#025F96] font-bold text-white border-[#033E61]"
                      : "bg-[#D9D9D9]/50 hover:bg-[#025F96]/20"
                  }`}
                >
                  Diterima
                </div>

                <div
                  onClick={() => setFilterStatus("ditolak")}
                  className={`cursor-pointer font-[raleway] rounded-xl border-2 px-3 sm:px-4 py-1 border-[#033E61] text-center text-sm sm:text-base transition-all duration-200 ${
                    filterStatus === "ditolak"
                      ? "bg-[#025F96] font-bold text-white border-[#033E61]"
                      : "bg-[#D9D9D9]/50 hover:bg-[#025F96]/20"
                  }`}
                >
                  Ditolak
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="py-2 flex-1 overflow">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004A76] mb-4"></div>
                <p className="text-gray-600">Loading data...</p>
              </div>
            ) : filteredData && filteredData.length > 0 ? (
              <Basetable data={filteredData} columns={columns} />
            ) : (
              <div className="flex flex-col justify-center items-center py-8">
                <div className="text-gray-400 text-4xl">📋</div>
                <p className="text-gray-600 text-base">Tidak ada data yang ditemukan</p>
                <p className="text-gray-400 text-sm"> Data Verifikasi Kosong</p>
              </div>
            )}
          </div>

          <Modal open={isModalOpen} onClose={closeModal}>
            <ModalContent
              modalType={modalType}
              idMasyarakat={selectedId}
              token={token}
              dataMasyarakatbyId={dataMasyarakatbyId}
              onClose={handleCloseModal}
            />
          </Modal>
        </main>
      </div>
    );
  
}

export default Verifikasi