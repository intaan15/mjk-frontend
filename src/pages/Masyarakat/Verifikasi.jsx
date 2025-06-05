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
import { FaEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineUserPlus } from "react-icons/hi2";
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
            return (
                <img 
                src="foto"
                alt="Foto Dokter" 
                className="w-10 h-10 object-cover rounded-full" 
                />
            );} 
        },
        {
            accessorKey: "nama_masyarakat",
            header: "Nama",
            enableSorting: false,
            cell: ({ row }) => 
                <div className='w-40 truncate'>
                    {row.original.nama_masyarakat}
                </div>

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
            header: "Tgl. Registrasi",
            enableSorting: true,
            cell: info => formatTanggal(info.getValue()),
        },
        {
            accessorKey: "detail",
            header: "Detail",
            enableSorting: false,
            cell: ({ row }) => (
            <div className="flex gap-2 items-center ">
            <button onClick={() =>openModal("detailprofilmasyarakat", row.original._id)} title="Detail">
                <HiOutlineExclamationCircle className="w-7  h-7 p-1 flex text-center justify-center  text-[#033E61] rounded-sm transition" />
            </button>
            </div>),
        },
    
        {
            accessorKey: "actions",
            header: "Status Konfirmasi",
            enableSorting: false,
            cell: ({ row }) => {
                //untuk menampilkan hasil setelah diverifikasi
                const status = row.original.verifikasi_akun_masyarakat;

                if (status === "diterima") {
                    return <span className="bg-[#27AE60] text-white w-15 hover:bg-green-200 hover:text-[#27AE60] p-1 rounded-[10px] transition">Diterima</span>;
                }

                if (status === "ditolak") {
                    return <span className="bg-[#FF1700] text-white w-15  hover:bg-red-200 p-1 hover:text-[#FF1700] rounded-[10px] transition">Ditolak</span>;
                }

                return (
                //button sblm verifikasi
                <div className="flex gap-2 items-center bg-[#FAFBFD]">
                    <button
                        onClick={() => handleVerifikasi("diterima", row.original._id, row.original.email_masyarakat)}
                        title="Terima"
                        className="bg-[#27AE60] text-white w-15 hover:bg-green-200 hover:text-[#27AE60] p-1 rounded-[10px] transition">
                        Diterima
                    </button>
                    <button
                        onClick={() => handleVerifikasi("ditolak", row.original._id,row.original.email_masyarakat)}
                        title="Tolak"
                        className="bg-[#FF1700] text-white w-15  hover:bg-red-200 p-1 hover:text-[#FF1700] rounded-[10px] transition">
                        Ditolak
                    </button>
                </div>
                );
            }
        },
    ];
    

 
    return (
       <div className='flex flex-row'>
           <main className='flex flex-col pl-8 gap-1 w-full pr-3 h-screen'>
               <div className='flex flex-row items-center justify-between pt-1'>
                   <p className='text-3xl font-[Nunito Sans] font-bold text-[#004A76]'>Verifikasi Data Masyarakat</p>
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
                                        {user?.username}
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
   
   
               <div className="flex flex-wrap justify-between items-center py-3 px-6 ">
                   <div className="flex flex-row gap-8 bg-[#004A76] p-2 rounded-2xl items-center px-6 h-sm shadow-md">
                       <div className="bg-white p-3 rounded-full flex items-center justify-center">
                           <HiOutlineUsers className="text-[45px] item-center text-[#38B6FE]" />
                       </div>
                       <div className="flex flex-col">
                           <span className=" text-white font-bold text-md "  style={{ fontFamily: "Nunito Sans" }}>Total Verifikasi</span>
                           <span className=" text-white font-extrabold text-4xl" style={{ fontFamily: "Nunito Sans" }}>{countStatus.pending}</span>
                       </div>
                   </div>
                   <div className="flex flex-row gap-4 bg-[#004A76] p-2 rounded-2xl items-center px-6 h-sm shadow-md">
                       <div className="bg-white p-3 rounded-full flex items-center justify-center">
                           <HiOutlineUserAdd className="text-[45px] item-center text-[#6AC03D]" />
                       </div>
                       <div className="flex flex-col">
                           <span className=" text-white font-bold text-md"  style={{ fontFamily: "Nunito Sans" }}>Verifikasi Diterima</span>
                           <span className=" text-white font-extrabold text-4xl" style={{ fontFamily: "Nunito Sans" }}>{countStatus.diterima}</span>
                       </div>
                   </div>
                   <div className="flex flex-row gap-4 bg-[#004A76] p-2 rounded-2xl items-center px-6 h-sm shadow-md">
                       <div className="bg-white p-3 rounded-full flex items-center justify-center">
                           <HiOutlineUserMinus className="text-[45px] item-center text-[#EF3826]" />
                       </div>
                       <div className="flex flex-col">
                           <span className="text-white font-bold text-md" style={{ fontFamily: "Nunito Sans" }}>Verifikasi Ditolak</span>
                           <span className="text-white font-extrabold text-4xl"  style={{ fontFamily: "Nunito Sans" }}>{countStatus.ditolak}</span>
                       </div>
                   </div>
               </div>
                <div className="flex flex-row gap-2  w-full  items-center px-4 py-1">
                    <div className="font-bold text-[#033E61]">Kategori :</div>
                    <div className="flex flex-row gap-8 bg-[#D9D9D9]/50 p-2 rounded-3xl items-center px-6">
                        <div
                            onClick={() => setFilterStatus("semua")}
                            className={`cursor-pointer rounded-4xl border-2 px-4 py-1 border-[#033E61] ${
                            filterStatus === "semua" ? "bg-[#025F96] text-white border-[#033E61]" : "bg-[#D9D9D9]/50 "
                            }`}>
                            Verifikasi
                        </div>

                        <div
                            onClick={() => setFilterStatus("diterima")}
                            className={`cursor-pointer rounded-4xl border-2 px-4 py-1 border-[#033E61]  ${
                            filterStatus === "diterima" ? "bg-[#025F96] text-white border-[#033E61]" : "bg-[#D9D9D9]/50"
                            }`}>
                            Diterima
                        </div>

                        <div
                            onClick={() => setFilterStatus("ditolak")}
                            className={`cursor-pointer rounded-4xl border-2 px-4 py-1 border-[#033E61]  ${
                                filterStatus === "ditolak" ? "bg-[#025F96] text-white border-[#033E61]" : "bg-[#D9D9D9]/50"
                            }`}>
                            Ditolak
                        </div> 
                    </div>
                    
                </div>
   
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
                    idMasyarakat={selectedId}
                    token={token}
                    dataMasyarakatbyId={dataMasyarakatbyId}
                    onClose={handleCloseModal}
                    />
                </Modal>
           </main>
       </div>
     )
  
}

export default Verifikasi