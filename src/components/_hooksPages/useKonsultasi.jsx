import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";

const useKonsultasi = (token) => {
  const [filterStatus, setFilterStatus] = useState("");
  const [allRows, setAllRows] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedPoli, setSelectedPoli] = useState("Semua");
  const [selectedDate, setSelectedDate] = useState(""); 
  const [error, setError] = useState(null);

  // Toggle dropdown handler
  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Fetch data effect
  useEffect(() => {
    if (!token) return;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/jadwal/getall`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        const responseData = response.data;
        setAllRows(responseData);
        setData(responseData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Memoized filtered data
  const filteredRows = useMemo(() => {
    return data.filter((row) => {
      // Status filter logic
      const statusMatch = (() => {
        if (filterStatus === "Diproses") {
          return ["menunggu", "berlangsung", "diterima"].includes(row.status_konsul);
        }
        if (filterStatus === "Selesai") {
          return ["selesai", "ditolak"].includes(row.status_konsul);
        }
        return true;
      })();

      // Name search filter
      const nameMatch = !searchTerm || 
        row.masyarakat_id?.nama_masyarakat?.toLowerCase().includes(searchTerm.toLowerCase());

      // Poli filter
      const poliMatch = selectedPoli === "Semua" || 
        row.dokter_id?.spesialis_dokter === selectedPoli;

      // Date filter
      const dateMatch = !selectedDate || 
        new Date(row.createdAt).toISOString().split("T")[0] === selectedDate;

      return statusMatch && nameMatch && poliMatch && dateMatch;
    });
  }, [data, filterStatus, searchTerm, selectedPoli, selectedDate]);

  // Pagination calculations
  const totalItems = filteredRows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Memoized paginated data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredRows.slice(start, end);
  }, [filteredRows, currentPage, itemsPerPage]);

  // Date formatting utility
  const formatTanggal = useCallback((isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

 
  const poliOptions = useMemo(() => {
    return [
      "Semua","Umum","Mata",
      "Anak","Gigi","THT",
      "Jantung","Kandungan","Bedah",
      "Syaraf","Darah","Paru paru",
      "Lambung","Ginjal","Hati","Kulit"
    ];
  }, []);

  // Reset filters handler
  const handleResetFilter = useCallback(() => {
    setSelectedDate("");     
    setSelectedPoli("Semua");     
    setSearchTerm("");
    setFilterStatus("");       
    setCurrentPage(1);       
  }, []);

  // Pagination range calculator
  const getPaginationRange = useCallback((currentPage, totalPages, maxVisible = 5) => {
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
  }, []);

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchTerm, selectedPoli, selectedDate]);

  return {
   
    setFilterStatus,
    setSearchTerm,
    setAllRows,
    setIsOpen,
    setCurrentPage,
    setSelectedPoli,
    setSelectedDate,
    
  
    filterStatus,
    selectedDate,
    searchTerm,
    isOpen,
    loading,
    error,
    currentPage,
    itemsPerPage,
    allRows,
    selectedPoli,
    
    // Computed data
    paginatedData,
    totalItems,
    totalPages,
    poliOptions,
    filteredRows,
    
    // Utilities
    formatTanggal,
    toggleDropdown,
    handleResetFilter,
    getPaginationRange
  };
};

export default useKonsultasi;