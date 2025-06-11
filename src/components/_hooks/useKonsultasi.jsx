import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const useKonsultasi = (token) => {
  const [filterStatus, setFilterStatus] = useState("Diproses");
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

  console.log(data)
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
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRows.slice(start, start + itemsPerPage);
  }, [filteredRows, currentPage, itemsPerPage]);

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

  console.log()

  const handleResetFilter = () => {
    setSelectedDate("");     
    setSelectedPoli("Semua");     
    setSearchTerm("");       
    setCurrentPage(1);       
  };

  console.log(handleResetFilter)
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
    handleResetFilter

  };
};

export default useKonsultasi;
