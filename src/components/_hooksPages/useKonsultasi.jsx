import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const useKonsultasi = (token) => {
  const [filterStatus, setFilterStatus] = useState("");
  const [allRows, setAllRows] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedPoli, setSelectedPoli] = useState("Semua");
  const [selectedDate, setSelectedDate] = useState(""); 

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/jadwal/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        setAllRows(data);
        setData(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        setLoading(false);
    });
  }, [token]);

  // console.log('☑️ Data berhasil load')
  const filteredRows = data.filter((row) => {
    const statusMatch =
      filterStatus === "Diproses"
        ? row.status_konsul === "menunggu" || row.status_konsul === "berlangsung" || row.status_konsul === "diterima"
        : filterStatus === "Selesai"
        ? row.status_konsul === "selesai" || row.status_konsul === "ditolak"
        : true;

    const nameMatch = row.masyarakat_id?.nama_masyarakat?.toLowerCase().includes(searchTerm.toLowerCase());

    const poliMatch = selectedPoli === "Semua" || row.dokter_id?.spesialis_dokter === selectedPoli;

    const dateMatch =
      !selectedDate ||
    new Date(row.createdAt).toISOString().split("T")[0] === selectedDate;

    return statusMatch && nameMatch && poliMatch && dateMatch;

});

  const totalItems = filteredRows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    

    
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

  const poliOptions = useMemo(() => {
    const allPoli = data.map((item) => item.dokter_id?.spesialis_dokter).filter(Boolean);
    return ["Semua", ...new Set(allPoli)];
  }, [data]);


  const handleResetFilter = () => {
    setSelectedDate("");     
    setSelectedPoli("Semua");     
    setSearchTerm("");       
    setCurrentPage(1);       
  };

  // console.log(handleResetFilter)

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

  return {
    setFilterStatus,
    setSearchTerm,
    setAllRows,
    setIsOpen,
    setCurrentPage,
    setSelectedPoli,
    setSelectedDate,
    
    //state
    filterStatus,
    selectedDate,
    searchTerm,
    isOpen,
    loading,
    currentPage,
    itemsPerPage,
    allRows,
    formatTanggal,
    toggleDropdown,
    paginatedData,
    totalItems,
    totalPages,
    selectedPoli,
    poliOptions,
    handleResetFilter,
    getPaginationRange

  };
};

export default useKonsultasi;
