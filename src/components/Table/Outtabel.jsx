// pages/DataDokter.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Maltabel from "./Basetable";
import { FaEdit } from "react-icons/fa"; 


const Outtabel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ganti dengan endpoint asli untuk dokter
  const endpoint = "https://mjk-backend-production.up.railway.app/api/dokter/getall";
  console.log("endpoint", data);

  useEffect(() => {
    axios.get(endpoint)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data dokter:", err);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      accessorKey: "foto_profil_dokter",
      header: "Foto",
      enableSorting: false,
    },
    {
      accessorKey: "nama_dokter",
      header: "Nama Dokter",
      enableSorting: false,
    },
    {
      accessorKey: "spesialis_dokter",
      header: "Spesialis",
      enableSorting: false,
    },
    {
      accessorKey: "str_dokter",
      header: "No.STR",
      enableSorting: false,
    },
    {
      accessorKey: "detail", // nama bebas, tapi string
      header: "Detail",
      enableSorting: false,
      cell: ({ row }) => (
        <button onClick={() => handleDetail(row.original)}>
          <FaEdit className="text-blue-500 hover:text-blue-700" />
        </button>
  ),
    },
  ];

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Maltabel data={data} columns={columns} />
      )}
    </div>
  );
};

export default Outtabel;
