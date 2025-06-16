import React from 'react'
import Basetable from "../../components/Table/Basetable";
import useLogout from "../../components/_hooks/useLogout";
import useKonsultasi from "../../components/_hooks/useKonsultasi";
import { useAuth } from "../../components/Auth";
import.meta.env.VITE_BASE_URL


// import Trash from "./icons/Trash";
import { IoIosSearch } from "react-icons/io";
import { TiUser } from "react-icons/ti";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { TbReload } from "react-icons/tb";

function Konsultasi() {
  const { user } = useAuth();
  const {handleLogout:handleLogout}=useLogout()
  const token = localStorage.getItem("token");
  const {

    //state updater
    setFilterStatus,
    setSearchTerm,
    setAllrows,
    setIsOpen,
    setCurrentPage,
    setSelectedPoli,
    setSelectedDate,

    
    //state
    filterStatus,
    searchTerm,
    isOpen,
    loading,
    currentPage,
    itemsPerPage,
    formatTanggal,
    selectedDate,
    toggleDropdown,
    paginatedData,
    totalItems,
    totalPages,
    selectedPoli,
    poliOptions,
    handleResetFilter,
    getPaginationRange,

  } = useKonsultasi(token);

  //kolom konsultasi 
  const columns = [
           {
            header: "No",
            enableSorting: false,
            cell: ({ row }) => row.index + 1,
          },
          {
              accessorKey: "nama_masyarakat",
              header: "Nama Pasien",
              enableSorting: false,
              cell: ({ row }) => 
              <div className="w-40 truncate">
                  {row.original.masyarakat_id?.nama_masyarakat || "-"}
              </div>
          },
          {
              accessorKey: "spesialis_dokter",
              header: "Poli",
              enableSorting: false,
              cell: ({ row }) => row.original.dokter_id?.spesialis_dokter || "-"
          },
          {
              accessorKey: "nama_dokter",
              header: "Nama Dokter",
              enableSorting: false,
              cell: ({ row }) =>  <div className="w-40 truncate">
                  {row.original.dokter_id?.nama_dokter || "-"}
              </div>

          },
          {
              accessorKey: "jam_konsul",
              header: "Waktu",
              enableSorting: false,

          },
          {
              accessorKey: "tgl_konsul",
              header: "Tgl. Konsultasi",
              enableSorting: true,
              cell: info => formatTanggal(info.getValue()),

          },
          {
              accessorKey: "status_konsul",
              header: "Status",
              enableSorting: false,
              cell: ({ row }) => {
                const status = row.original.status_konsul;

                let bgColor = "";
                let textColor = "";
                let label = "";
                let fontstyle = "";

                switch (status) {
                  case "selesai": //selesai konsultasi
                    bgColor = "bg-[#27AE60]";
                    textColor = "text-white" ;
                    label = "Selesai";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  case "ditolak": //ditolak dokter
                    bgColor = "bg-[#EF3826]";
                    textColor = "text-white";
                    label = "Ditolak";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  case "diterima": //jadwal diterima belum melakukan konsultasi
                    bgColor = "bg-[#BCE2C5]";
                    textColor = "text-[#155724]";
                    label = "Diterima";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  case "berlangsung": //sedang terjadi konsultasi
                    bgColor = "bg-[#3498DB]";
                    textColor = "text-white";
                    label = "Berlangsung";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  case "menunggu": //menunggu konsultasi 
                    bgColor = "bg-[#FFE592]";
                    textColor = "text-[#856404]";
                    label = "Menunggu";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  default:
                    bgColor = "bg-gray-200";
                    textColor = "text-gray-800";
                    label = "Tidak diketahui";
                    fontstyle ="font-[raleway] font-semibold";
                }
                return (
                  <span className={`px-2 py-1 rounded-md text-sm font-medium ${bgColor} ${textColor}`}>
                    {label}
                  </span>
                );
             }
              

          },
        
          
      ];

  
      
  // FRONT END
  return (
    <div className="flex flex-row h-screen">
      <main className="flex flex-col pl-8 gap-1 w-full pr-3 h-screen">
        {/* Atas(search & profile) */}
        <div className="flex flex-row  items-center justify-between pt-3">
          <p className="text-3xl font-[raleway] font-bold text-[#004A76]">
            Konsultasi
          </p>
          <div className="flex flex-row gap-2 relative">
            {/* search */}
            <div className="flex items-center rounded-[19px] px-3 justify-start py-1 border-[1.5px] border-gray-300 gap-3">
              <IoIosSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Cari Nama"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-gray-700 text-sm outline-none bg-transparent"
              />
            </div>

            {/* akun */}
            <div className="flex flex-row gap-4 relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none cursor-pointer"
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
                        <a className="flex flex-row py-2 text-md font-[raleway] items-center font-bold text-[#004A76] gap-3">
                          <HiOutlineUser className="text-[30px]" />
                          {user?.username}
                        </a>

                        <a
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
        <img src="/line style.svg" alt="" />

        {/* Button Tengah FILTER */}
        <div className="flex flex-row justify-center w-full py-2 gap-15">
          <button
            onClick={() => setFilterStatus("Diproses")}
            className={`${
              filterStatus === "Diproses"
                ? "bg-[#004A76] font-bold font-[raleway]"
                : "bg-[#B3B3B3]"
            } hover:opacity-80 text-white w-50 h-10 rounded-md text-md border-[#E3F0F8] cursor-pointer`}
          >
            Diproses
          </button>
          <div className="h-10 bg-[#004A76] w-1"> </div>
          <button
            onClick={() => setFilterStatus("Selesai")}
            className={`${
              filterStatus === "Selesai"
                ? "bg-[#004A76] font-bold font-[raleway]"
                : "bg-[#B3B3B3]"
            } hover:opacity-80 text-white w-50 h-10 rounded-md text-md border-[#E3F0F8] border-2 focus-ring-2 cursor-pointer `}
          >
            Riwayat
          </button>
        </div>

        {/* filter by tanggal dan poli */}
        <div className="flex flex-rows  gap-6 py-3 px-6 ">
          <div className="flex flex-row  gap-3 items-center ">
            <label className="font-[raleway] font-bold text-[#004A76]  ">
              Tanggal
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded p-2 text-gray-700 border-[#004A76] h-10 cursor-pointer"
            />
          </div>

          <div className="flex flex-row gap-3 items-center">
            <label className="font-[raleway] font-bold text-[#004A76] ">
              Filter Poli
            </label>
            <select
              value={selectedPoli}
              onChange={(e) => setSelectedPoli(e.target.value)}
              className="border rounded p-2 text-gray-700 border-[#004A76] h-10 cursor-pointer"
            >
              {poliOptions.map((poli, idx) => (
                <option key={idx} value={poli}>
                  {poli}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={handleResetFilter}
              className="bg-[#004A76] hover:bg-[#38B6FE]/50 text-white p-3 items-center rounded-md text-sm font-[raleway] cursor-pointer"
            >
              <TbReload />
            </button>
          </div>
        </div>

        {/* HEADER TABEL Filtering Tabel BLM FIX */}
        <div className="py-1">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <>
              <Basetable data={paginatedData} columns={columns} />
            </>
          )}
        </div>

        {/* Pagination */}
        <div className="grid grid-cols-3 items-center justify-center">
          {/* Jumlah ditampilkan - TIDAK BERUBAH */}
          <div className="text-sm text-gray-600">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems}{" "}
            hasil
          </div>

          {/* Navigasi dan Items per page */}
          <div className="flex items-center gap-4">
            {/* Pagination Number - EDIT BAGIAN INI */}
            <div className="flex items-center space-x-2">
              <button
                className={`px-2 py-1 border-2 rounded-md transition duration-200 
          ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed border-gray-300"
              : "hover:bg-[#004A76] hover:text-white"
          }
        `}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>

              {/* SLIDING PAGINATION - Hanya 5 halaman */}
              {(() => {
                const maxVisible = 5;
                const paginationRange = getPaginationRange(
                  currentPage,
                  totalPages,
                  maxVisible
                );

                return (
                  <>
                    {/* First page + ellipsis jika range tidak dimulai dari 1 */}
                    {paginationRange[0] > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentPage(1)}
                          className="px-3 py-1 border rounded-md transition duration-200 hover:bg-[#004A76] hover:text-white border-gray-300"
                        >
                          1
                        </button>
                        {paginationRange[0] > 2 && (
                          <span className="px-2 py-1 text-gray-500">...</span>
                        )}
                      </>
                    )}

                    {/* Range pages (maksimal 5) */}
                    {paginationRange.map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 border rounded-md transition duration-200 hover:bg-[#004A76] hover:text-white
                  ${
                    currentPage === pageNum
                      ? "bg-[#004A76] text-white border-[#004A76]"
                      : "border-gray-300"
                  }
                `}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* Ellipsis + Last page jika range tidak berakhir di totalPages */}
                    {paginationRange[paginationRange.length - 1] <
                      totalPages && (
                      <>
                        {paginationRange[paginationRange.length - 1] <
                          totalPages - 1 && (
                          <span className="px-2 py-1 text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="px-3 py-1 border rounded-md transition duration-200 hover:bg-[#004A76] hover:text-white border-gray-300"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </>
                );
              })()}

              <button
                className={`px-2 py-1 border-2 rounded-md transition duration-200 
          ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed border-gray-300"
              : " hover:bg-[#004A76] hover:text-white"
          }
        `}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Konsultasi
