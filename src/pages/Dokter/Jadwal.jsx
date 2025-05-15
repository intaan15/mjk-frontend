import React, { useEffect, useState } from "react";
import axios from "axios";

export default function JadwalHariIni({ id }) {
  const [jadwalHariIni, setJadwalHariIni] = useState([]);
  const [namaDokter, setNamaDokter] = useState("");
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!id) return;

  axios.get(`https://mjk-backend-production.up.railway.app/api/dokter/getbyid/${id}`)
    .then((res) => {
      const dokter = res.data;
      console.log("Data dokter:", dokter); // 👈 log data yang masuk
      setNamaDokter(dokter.nama_dokter);

      const today = new Date().toISOString().slice(0, 10);
      const jadwalHariIni = dokter.jadwal.find(j => j.tanggal.slice(0, 10) === today);
      console.log("Jadwal hari ini:", jadwalHariIni); // 👈 log hasil filter

      if (jadwalHariIni) {
        setJadwalHariIni(jadwalHariIni.jam);
      } else {
        setJadwalHariIni([]);
      }

      setLoading(false);
    })
    .catch((err) => {
      console.error("Gagal ambil data dokter:", err);
      setLoading(false);
    });
}, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Jadwal Dokter Hari Ini</h2>
      <p className="mb-2 text-gray-700">Nama Dokter: <strong>{namaDokter}</strong></p>
      {jadwalHariIni.length === 0 ? (
        <p className="text-red-500">Tidak ada jadwal hari ini.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-2 px-4 border">Jam</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {jadwalHariIni.map((slot) => (
              <tr key={slot._id}>
                <td className="py-2 px-4 border text-center">{slot.time}</td>
                <td className="py-2 px-4 border text-center">
                  {slot.available ? (
                    <span className="text-green-600 font-semibold">Tersedia</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Tidak Tersedia</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
