import React from 'react'
import axios from 'axios' //library untuk melakukan request HTTP
import { useState,useEffect,useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import Basetable from "../../components/Table/Basetable";
import Modal from "../../components/Modal/ModalTemplate";
import ModalContent from "../../components/Modal/ModalContent";
import { useAuth } from "../../components/Auth";
import.meta.env.VITE_BASE_URL


import { TiUser } from 'react-icons/ti'
import { IoIosSearch } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineUserMinus } from "react-icons/hi2";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Swal from "sweetalert2";

function Verifikasi() {

    const token = localStorage.getItem("token");
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("semua");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [allRows, setAllRows] = useState([]);
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [dataMasyarakatbyId, setDataMasyarakatbyId] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 
    const [selectedData, setSelectedData] = useState(null);
    const toggleDropdown = () => {setIsOpen(!isOpen);};

    
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
        console.log("closeModal");
        setIsModalOpen(false);
        setModalType(null);
        setSelectedData(null);
    };

    const handleEdit = (data) => {
      setSelectedData(data);
      setIsModalOpen(true);
    };

    const handleLogout = () => {
        // Hapus token dari localStorage
        localStorage.removeItem("token");

        // Redirect ke halaman login
        navigate("/login");
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      fetchArtikel();
    };
    

    // component Filtersearch
    const filteredData = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return allRows.filter((item) => {
        // Match status
        const matchStatus =
        filterStatus === "semua"
            ? item.verifikasi_akun_masyarakat === "pending"
            : item.verifikasi_akun_masyarakat === filterStatus;

        // Match keyword
        const matchSearch =
        item.nama_masyarakat?.toLowerCase().includes(search) ||
        item.email_masyarakat?.toLowerCase().includes(search) ||
        item.notlp_masyarakat?.toLowerCase().includes(search) ||
        item.nik_masyarakat?.includes(search);

        return matchStatus && matchSearch;
    });
    }, [allRows, filterStatus, searchTerm]);


    // Swtich status
    const countStatus = useMemo(() => {
        return allRows.reduce((acc, item) => {
            const status = item.verifikasi_akun_masyarakat;
            if (status === "pending") acc.pending += 1;
            if (status === "diterima") acc.diterima += 1;
            if (status === "ditolak") acc.ditolak += 1;
            return acc;
        }, { pending: 0, diterima: 0, ditolak: 0 });
    }, [allRows]);


    // mengatur format tanggal 
    const formatTanggal = (isoDateString) => {
    const date = new Date(isoDateString);
        return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        });
    };
    

    // ENDPOINT UPDATE STATUS VERIFIKASI
    const handleVerifikasi = (status, _id, email_masyarakat) => {
    Swal.fire({
        title: `Yakin ingin ${status === "diterima" ? "menerima" : "menolak"} data ini?`,
        text: "Pastikan semua data sudah diperiksa dengan benar.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: status === "diterima" ? "#27AE60" : "#FF1700",
        cancelButtonColor: "#d33",
        confirmButtonText: `Ya, ${status === "diterima" ? "terima" : "tolak"}`,
        cancelButtonText: "Batal"
    }).then((result) => {
        if (result.isConfirmed) {
        if (status === "ditolak") {
            // Konfirmasi tambahan untuk kirim pesan email
            Swal.fire({
            title: `Kirim pesan konfirmasi ke ${email_masyarakat}?`,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Kirim Email",
            cancelButtonText: "Tidak",
            }).then((res) => {
            if (res.isConfirmed) {
                // Buka Gmail dengan draft email
                const subject = encodeURIComponent("Konfirmasi Penolakan Verifikasi");
                const body = encodeURIComponent(`Halo,\n\nData Anda ditolak. Mohon periksa kembali informasi yang diberikan.\n\nTerima kasih.`);
                window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email_masyarakat}&su=${subject}&body=${body}`);
            }

            // Lanjut update status di backend
            axios
                .patch(
                `${import.meta.env.VITE_BASE_URL}/api/masyarakat/update/${_id}`,
                {
                    verifikasi_akun_masyarakat: status,
                },
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
                )
                .then(() => {
                console.log("Status verifikasi berhasil diperbarui (PATCH)");
                setAllRows((prevRows) =>
                    prevRows.map((item) =>
                    item._id === _id ? { ...item, verifikasi_akun_masyarakat: status } : item
                    )
                );
                setFilterStatus(status);
                setData((prevData) => prevData.filter((item) => item._id !== _id));

                Swal.fire({
                    icon: "success",
                    title: `Data berhasil ditolak`,
                    showConfirmButton: false,
                    timer: 2000,
                });

                navigate("/masyarakat/verifikasi");
                })
                .catch((err) => {
                console.error("Gagal update status", err);
                Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui status.", "error");
                });
            });
        } else {
            // Jika status diterima, langsung update backend seperti biasa
            axios
            .patch(
                `${import.meta.env.VITE_BASE_URL}/api/masyarakat/update/${_id}`,
                {
                verifikasi_akun_masyarakat: status,
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            )
            .then(() => {
                console.log("Status verifikasi berhasil diperbarui (PATCH)");
                setAllRows((prevRows) =>
                prevRows.map((item) =>
                    item._id === _id ? { ...item, verifikasi_akun_masyarakat: status } : item
                )
                );
                setFilterStatus(status);
                setData((prevData) => prevData.filter((item) => item._id !== _id));

                Swal.fire({
                icon: "success",
                title: `Data berhasil diterima`,
                showConfirmButton: false,
                timer: 2000,
                });

                navigate("/masyarakat/verifikasi");
            })
            .catch((err) => {
                console.error("Gagal update status", err);
                Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui status.", "error");
            });
        }
        }
    });
    };










    // ENDPOINT MENDAPATKAN DATA
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/masyarakat/getall`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                );
                // const filteredData = res.data.filter(item => item.verifikasi_akun_masyarakat === 'pending');
                const filteredData = res.data;
                setAllRows(filteredData);
                console.log(filteredData);
                setData(filteredData);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);}
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!selectedId) return; 
        const fetchData = async () => {
        try {
            const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/masyarakat/getbyid/${selectedId}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            setDataMasyarakatbyId(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }};

        fetchData();
  },[selectedId, token]);

    


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
          console.log("Image URL profil_masyarakat:", imageUrl);

          return imageUrl ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL}${imageUrl}`}
              alt="foto"
              className="w-10 h-10 object-cover rounded-md"
            />
          ) : (
            <div className="w-10 h-10  ">
              <img
                src="/default-avatar.jpg"
                alt="foto_default"
                className="rounded-md"
              />
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
      <div className="flex flex-row min-h-screen">
        <main className="flex flex-col sm:p-4 md:p-6 lg:p-5 gap-3 sm:gap-0 md:gap-1 w-full mb-20 sm:mb-24 md:mb-16 lg:mb-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-[raleway] font-bold text-[#004A76]">
               Verifikasi Data Masyarakat
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="flex items-center rounded-xl px-3 py-1 border-[1.5px] border-gray-300 gap-3 w-full sm:w-auto">
                <IoIosSearch className="text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Cari Nama"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-gray-700 text-sm outline-none bg-transparent flex-1 sm:w-40"
                />
              </div>
  
              {/* Profile Dropdown */}
              <div className="flex flex-row gap-4 relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                >
                  <TiUser className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#292D32]" />
                </button>
  
                <div>
                  {isOpen && (
                    <>
                      <div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setIsOpen(false)}
                      ></div>
                      <div className="absolute right-0 origin-top-right mt-8 w-48 px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50">
                        <div className="py-1 justify-center">
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
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-3 px-2 sm:px-4 lg:px-6 gap-4 lg:gap-2">
            
            {/* Card 1: Menunggu Verifikasi */}
            <div className="flex flex-row gap-4 sm:gap-6 lg:gap-6 bg-[#004A76] p-3 sm:p-2 rounded-2xl items-center px-4 sm:px-8 shadow-md">
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
            <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8 bg-[#004A76] p-3 sm:p-2 rounded-2xl items-center px-4 sm:px-8 shadow-md ">
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
            <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8 bg-[#004A76] p-3 sm:p-2 rounded-2xl items-center px-4 sm:px-8 shadow-md ">
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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 bg-[#D9D9D9]/50 p-3 sm:p-2 rounded-xl items-start sm:items-center px-4 sm:px-6 w-full sm:w-auto">
              <div className="font-bold text-[#033E61] text-sm sm:text-base whitespace-nowrap">
                Kategori :
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
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
          <div className="py-2 flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-gray-600">Loading data...</p>
              </div>
            ) : (
              <Basetable data={filteredData} columns={columns} />
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