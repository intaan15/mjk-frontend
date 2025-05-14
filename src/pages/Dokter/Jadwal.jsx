import { useEffect, useState } from 'react';
import axios from 'axios';



const Jadwal = ({ dokterId }) => {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const JadwalDokter = ({ dokter }) => {
  const _id = dokter._id;};
  
  const columns = [
    {
      accessorKey: 'nama_dokter', // Akses waktu
      header: 'Nama',
    },
    {
      accessorKey: 'time', // Akses waktu
      header: 'Senin',
    },
    {
      accessorKey: 'time', // Akses waktu
      header: 'Selasa ',
    },
    {
      accessorKey: 'time', // Akses waktu
      header: 'Rabu',
    },
    {
      accessorKey: 'time', // Akses waktu
      header: 'Kamis',
    },
    {
      accessorKey: 'time', // Akses waktu
      header: 'Jumat',
    },
    {
      accessorKey: 'time', // Akses waktu
      header: 'Sabtu',
    },
    {
      accessorKey: 'time', // Akses waktu
      header: 'Minggu',
    },
    {
      accessorKey: 'available',
      header: 'Status',
      cell: ({ getValue }) => (getValue() ? 'Tersedia' : 'Tidak Tersedia'),
    },
  ];



  const konversiJadwal = (dataJadwal) => {
  console.log(dataJadwal); 
  const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const jadwalPerHari = {
    Senin: '', Selasa: '', Rabu: '', Kamis: '', Jumat: '', Sabtu: '', Minggu: '',
  };

  if (dataJadwal && dataJadwal.jadwal) {
    // Proses untuk menyiapkan jadwal berdasarkan tanggal dan jam
    dataJadwal.jadwal.forEach(j => {
      if (j.tanggal && j.jam) {
        const hari = hariList[new Date(j.tanggal).getDay()];

        // Ambil semua jam yang tersedia pada hari tersebut
        const jamAvailable = j.jam
          .filter(jam => jam.available)  // Hanya ambil jam yang tersedia
          .map(jam => jam.time);  // Ambil waktu jam-nya

        // Jika ada jam yang tersedia, gabungkan dalam format string
        if (jamAvailable.length > 0) {
          jadwalPerHari[hari] = jamAvailable.join(', ');
        }
      }
    });
  }

  return [{
    nama_dokter: data._id || 'N/A',
    nama_dokter: data?.nama_dokter || 'N/A',
    ...jadwalPerHari
  }];
};

  useEffect(() => {
    axios.get(`https://mjk-backend-production.up.railway.app/api/dokter/getall`)
      .then((res) => {
        const dataJadwal = konversiJadwal(res.data);
        setJadwal(dataJadwal); // sesuaikan sesuai struktur data dari API
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);


  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Jadwal Praktek Dokter</h2>
          <Basetable data={jadwal} columns={columns} />
        </div>
      )}
    </div>
  );
};


export default Jadwal;
