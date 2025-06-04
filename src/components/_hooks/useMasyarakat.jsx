import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from '../Modal/ToastModal';
import DataMasyarakat from '../../pages/Masyarakat/DataMasyarakat';
import.meta.env.VITE_BASE_URL



export default function useMasyarakat({idMasyarakat,token,onClose}) {
  const [dataMasyarakatbyId, setDataMasyarakatbyId] = useState(null);
  const [previewFotoKTP, setPreviewFotoKTP] = useState(dataMasyarakatbyId?.foto_ktp_masyarakat || null);
  const [fotoKTPFile, setFotoKTPFile] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    username: "",
    email:"",
    NIK:"",
    alamat:"",
    jeniskelamin:"",
    tanggalLahir:"",
    foto_ktp:null,
    selfie_ktp_masyarakat:null,
   
  });

  const handleFotoKTPChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoKTPFile(file);
      setPreviewFotoKTP(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    // Debug: pastikan props valid
    if (!idMasyarakat || !token) {
        console.error("Tidak bisa fetch: idMasyarakat/token tidak ada");
    return;
    }

    const fetchData = async () => {
      try {
          const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/masyarakat/getbyid/${idMasyarakat}`,
          {
              headers: {
              Authorization: `Bearer ${token}`,
              },
          }
          );

          console.log("Data diterima:", response.data);
          setDataMasyarakatbyId(response.data);
      } catch (error) {
          console.error("Gagal fetch masyarakat:", {
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
          });
      }
    }; fetchData();
  }, [idMasyarakat, token]);



  useEffect(() => {
    if (!dataMasyarakatbyId) return;

    console.log("iniuseeffect",dataMasyarakatbyId); // Debug

    setFormData({
      nama: dataMasyarakatbyId.nama_masyarakat || "",
      username: dataMasyarakatbyId.username_masyarakat || "",
      email: dataMasyarakatbyId.email_masyarakat || "",
      NIK:dataMasyarakatbyId.nik_masyarakat || "",
      alamat:dataMasyarakatbyId.alamat_masyarakat || "",
      jeniskelamin:dataMasyarakatbyId.jeniskelamin_masyarakat || "",
      notlp:dataMasyarakatbyId.notlp_masyarakat || "",
      tanggalLahir:dataMasyarakatbyId.tgl_lahir_masyarakat
        ? new Date(dataMasyarakatbyId.tgl_lahir_masyarakat).toISOString().split("T")[0]
        : "",
    foto_ktp:null,
    selfie_ktp_masyarakat:null,


    });
    console.log("iniform",formData); // Debug
  }, [dataMasyarakatbyId]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
    ...prev,
    [name]: value,
    }));
  };

  const handleFileChange = (e) => {
      setFormData((prev) => ({
      ...prev,
      foto: e.target.files[0], // simpan file object
      }));
  };

  // UPDATE DATAAA Masyarakat
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
    let imagePath = dataMasyarakatbyId.foto_ktp || null; // <-- pakai optional chaining

    if (formData.foto) {
        const data = new FormData();
        data.append("foto", formData.foto);

        const uploadRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/masyarakat/upload`,
        data,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            },
        }
        );
          if (!uploadRes.data?.path) {
          throw new Error("Upload gagal: path tidak ditemukan"); // <-- ini penting
        }
        imagePath = uploadRes.data.path;
  }

  const masyarakatData = {
      nama_masyarakat: formData.nama,
      username_masyarakat: formData.username,
      email_masyarakat: formData.email,
      nik_masyarakat: formData.NIK,
      alamat_masyarakat: formData.alamat,
      jeniskelamin_masyarakat: formData.jeniskelamin,
      tgl_lahir_masyarakat: formData.tanggalLahir,
      foto_ktp: imagePath, // <-- gunakan imagePath yang sudah diupdate
  };

  await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/masyarakat/update/${idMasyarakat}`,
      masyarakatData,
      {
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      });

      showSuccessToast("Data masyarakat berhasil diubah");
      onClose(false);
      return;
    } catch (error) {
        console.error("Gagal update Data Masyarakat:",error.response?.data || error.message);
        showErrorToast("Gagal mengubah Data Masyarakat");
    }
    };


  return ({
    dataMasyarakatbyId,
    formData,
    handleChange,
    handleFileChange,
    handleEditSubmit,
    handleFotoKTPChange,
    previewFotoKTP,
    fotoKTPFile,
   

  }

)
}
