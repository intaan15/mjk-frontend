import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { groupBy, orderBy, uniq } from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { useAuth } from "../Auth";

dayjs.locale('id');

export default function useJadwal() {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [dataDokter, setDataDokter] = useState([]);
  const [tanggalHeader, setTanggalHeader] = useState([]);
  const [jadwal, setJadwal] = useState([]);
  const [namaDokter, setNamaDokter] = useState('');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mingguPage, setMingguPage] = useState(0);
  const [tanggalPage, setTanggalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Auth
  const token = localStorage.getItem("token");
  const { user } = useAuth();

  // Functions
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function findSlotDokterPadaTanggal(dokterRow, tgl) {
    const jadwalObj = (dokterRow.jadwal ?? []).find(
      (j) => dayjs(j.tanggal).format("YYYY-MM-DD") === tgl
    );
    if (!jadwalObj) return null;

    const jamTersedia = (jadwalObj.jam ?? [])
      .filter((s) => s.available)
      .map((s) => s.time);

    if (jamTersedia.length === 0) return null;

    jamTersedia.sort((a, b) => a.localeCompare(b));
    return `${jamTersedia[0]} - ${jamTersedia[jamTersedia.length - 1]}`;
  }

  function getRentangMinggu(monday) {
    return Array.from({ length: 7 }, (_, i) =>
      dayjs(monday).add(i, "day").format("YYYY-MM-DD")
    );
  }

  // Fetch data
  useEffect(() => {
    const fetchDokter = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/dokter/getall`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const alldokter = res.data;

        // 1. mengambil data jadwal dari data dokter berdasarkan jam
        const allJadwal = alldokter.flatMap((d) =>
          (Array.isArray(d.jadwal) ? d.jadwal : []).flatMap((j) =>
            (Array.isArray(j.jam) ? j.jam : []).map((session) => ({
              tanggal: dayjs(j.tanggal).format("YYYY-MM-DD"),
              time: session.time,
              available: session.available,
              dokterId: d._id,
              dokterNama: d.nama_dokter,
            }))
          )
        );

        // 2. Menampilkan jam berbentuk range
        const getJamRange = (waktu) => {
          if (!waktu || waktu.length === 0) return "-";
          const sortedJam = waktu.slice().sort((a, b) => a.time.localeCompare(b.time));
          return `${sortedJam[0].time} - ${sortedJam[sortedJam.length - 1].time}`;
        };

        //3. grup by jadwal(Waktu) by tanggal
        const byDate = groupBy(allJadwal, "tanggal");

        //4. DIurutkan by tanggal saja
        const sortDate = orderBy(Object.keys(byDate), (t) => t, "asc");

        setDataDokter(alldokter);
        setTanggalHeader(sortDate);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDokter();
  }, []);

  // Computed values
  const tanggalArray = useMemo(() => {
    const all = dataDokter.flatMap((d) =>
      (d.jadwal ?? []).map((j) => dayjs(j.tanggal).format("YYYY-MM-DD"))
    );
    return uniq(all).sort();
  }, [dataDokter]);

  const minDate = useMemo(
    () => (tanggalArray.length ? dayjs(tanggalArray[0]) : dayjs()),
    [tanggalArray]
  );

  const monday0 = dayjs().startOf("week");
  const mondayAktif = useMemo(() => monday0.add(mingguPage, "week"), [monday0, mingguPage]);
  const startDate = dayjs(minDate);
  
  const tanggalAktif = useMemo(
    () => getRentangMinggu(mondayAktif),
    [mondayAktif]
  );

  const tanggalPerPage = 6;
  const firstIdx = (tanggalPage - 1) * tanggalPerPage;
  const lastIdx = firstIdx + tanggalPerPage;

  const dynamicColumns = useMemo(
    () =>
      tanggalAktif.map((tgl) => ({
        id: `tgl-${tgl}`,
        header: () => {
          const d = dayjs(tgl).locale("id");
          return (
            <div className="flex flex-row items-center leading-tight">
              <div className='flex flex-col items-center border-r-2 px-2 '>
                <span className="text-xs font-medium">{d.format("dddd")}</span>
                <span className="text-sm font-semibold">{d.format("DD‑MM‑YYYY")}</span>
              </div>
            </div>
          );
        },
        cell: ({ row }) => (
          <div className="flex justify-center items-center h-full">
            {findSlotDokterPadaTanggal(row.original, tgl) || "-"}
          </div>
        )
      })),
    [tanggalAktif]
  );

  const labelRentang = `${mondayAktif.format("DD MMM")} – ${mondayAktif
    .add(6, "day")
    .format("DD MMM YYYY")}`;

  return {
    // Data
    dataDokter,
    tanggalArray,
    tanggalAktif,
    tanggalHeader,
    jadwal,
    namaDokter,
    data,
    dynamicColumns,
    labelRentang,
    
    // States
    isOpen,
    mingguPage,
    tanggalPage,
    searchTerm,
    loading,
    
    // Setters
    setIsOpen,
    setMingguPage,
    setTanggalPage,
    setDataDokter,
    setSearchTerm,
    
    // Computed values
    startDate,
    mondayAktif,
    minDate,
    monday0,
    
    // Functions
    findSlotDokterPadaTanggal,
    toggleDropdown,
    getRentangMinggu,
    
    // Auth
    user,
    token,
    
    // Constants
    tanggalPerPage,
    firstIdx,
    lastIdx,
  };
}