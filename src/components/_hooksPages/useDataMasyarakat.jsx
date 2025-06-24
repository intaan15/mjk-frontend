import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import.meta.env.VITE_BASE_URL

export const useDataMasyarakat = (token) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataMasyarakat, setDataMasyarakat] = useState([]);
  const [dataMasyarakatbyId, setDataMasyarakatbyId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);


  // fetch data all masyarakat
  const fetchDataMasyarakat = useCallback(async () => {
    setLoading(true);
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/masyarakat/getall`, {
        headers: { Authorization: `Bearer ${token}` },
        });

        const filtered = res.data
        .filter(item => item.verifikasi_akun_masyarakat === 'diterima')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // <- SORT terbaru dulu
        
        setDataMasyarakat(filtered);
      } catch (err) {
        console.error("Gagal fetch DataMasyarakat:", err);
    } finally {
      setLoading(false); // ✅ ini akan selalu dipanggil, baik berhasil atau gagal
    }
   }, [token]);

  // fetch data masyarakat by ID
  const fetchDataById = useCallback(async () => {
    setLoading(true);
    if (!selectedId) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/masyarakat/getbyid/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataMasyarakatbyId(res.data);
    } catch (err) {
      console.error("Gagal fetch data by ID:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedId, token]);

  // useEffect to fetch data masyarakat on component mount
  // and when reloadTrigger changes
  useEffect(() => {
    fetchDataMasyarakat();
  }, [fetchDataMasyarakat]);

  // useEffect to fetch data by ID when selectedId changes
  // and when reloadTrigger changes
  useEffect(() => {
    fetchDataById();
  }, [fetchDataById]);

  // useEffect to reset selectedId and isModalOpen when dataMasyarakatbyId changes
  const filteredRows = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();
    return dataMasyarakat.filter((item) =>
      item.nama_masyarakat?.toLowerCase().includes(search) ||
      item.email_masyarakat?.toLowerCase().includes(search) ||
      item.notlp_masyarakat?.toLowerCase().includes(search) ||
      item.nik_masyarakat?.includes(search)
    );
  }, [dataMasyarakat, searchTerm]);

  const totalItems = filteredRows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const paginatedData = useMemo(() => {
     const start = (currentPage - 1) * itemsPerPage;
     const end = start + itemsPerPage;
     
    //  console.log(`Menampilkan data ${start + 1}-${Math.min(end, totalItems)} dari ${totalItems}`);
     
     return filteredRows.slice(start, end);
   }, [filteredRows, currentPage, itemsPerPage, totalItems]);

  const formatTanggal = (isoDateString) => {
  const date = new Date(isoDateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getPaginationRange = (currentPage, totalPages, maxVisible = 5) => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };


  const toggleDropdown = () => { // Toggle dropdown for dropdown user
      setIsOpen(!isOpen);
  };

    const handleUpdateMasyarakat = useCallback((DataMasyarakat) => {
        Swal.fire({
        title: "Berhasil Memperbarui Data Masyarakat",
        text: "Apakah Anda ingin mengirim email pemberitahuan ke masyarakat?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        }).then((result) => {
        if (result.isConfirmed) {
            const subject = encodeURIComponent("Pemberitahuan Perubahan Data - Mojokerto Sehat");
            const body = encodeURIComponent(`Halo ${DataMasyarakat.nama_masyarakat},

            Admin telah berhasil memperbarui data Anda di Sistem Mojokerto Sehat.

            Berikut detail akun Anda:
            - Username: ${DataMasyarakat.username_masyarakat}
            - Email: ${DataMasyarakat.email_masyarakat}
            - No. Telepon: ${DataMasyarakat.notlp_masyarakat}
            - NIK: ${DataMasyarakat.nik_masyarakat}
            - Alamat: ${DataMasyarakat.alamat_masyarakat}
            - Jenis Kelamin: ${DataMasyarakat.jeniskelamin_masyarakat}
            - Tanggal Lahir: ${formatTanggal(DataMasyarakat.tgl_lahir_masyarakat)}


            Silakan login kembali dan lengkapi profil Anda.

            Salam,
            Admin Mojokerto Sehat`);

            const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${DataMasyarakat.email_masyarakat}&subject=${subject}&body=${body}`;
            window.open(mailtoLink, "_blank");
        }
        });
    
        // Refresh data setelah add
        setReloadTrigger(prev => prev + 1);
    }, []);

    // Constants
    const ANIMASI_GAMBAR = {
      colors: {
        primary: '#004A76',
        primaryHover: '#0066A3',
        secondary: '#033E61',
        gray: {
          50: '#FAFBFD',
          100: '#F3F4F6',
          300: '#D1D5DB',
          400: '#9CA3AF',
          600: '#4B5563',
          700: '#374151'
        }
      },
      animations: {
        fast: 'transition-all duration-200 ease-in-out',
        normal: 'transition-all duration-300 ease-in-out',
        slow: 'transition-all duration-500 ease-in-out'
      },
      spacing: {
        cardPadding: 'p-2 sm:p-3 md:p-4',
        containerPadding: 'px-4 xs:px-8 sm:px-10 md:px-6 lg:px-5'
      }
    };
    

    

  return {
    setSearchTerm,
    searchTerm,
    setIsOpen,
    isOpen,
    toggleDropdown,
    dataMasyarakatbyId,
    fetchDataById,
    selectedId,
    setSelectedId,
    isModalOpen,
    setIsModalOpen,
    fetchDataMasyarakat,
    paginatedData,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    loading,
    setLoading,
    formatTanggal,
    dataMasyarakat,
    handleUpdateMasyarakat,
    getPaginationRange,
    ANIMASI_GAMBAR,
  };
};