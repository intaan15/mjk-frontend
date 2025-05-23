import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from '../Modal/ToastModal';

export default function useDokter ({idDokter,token,onClose}) {
    console.log("idDokter:", idDokter);
    console.log("token:", token);
    const [dataDokterbyId, setDataDokterbyId] = useState(null);

    const [formData, setFormData] = useState({
        nama: "",
        username: "",
        email:"",
        NIK:"",
        spesialis:"",
        tanggalLahir:"",
        no_str :"",

    });
    
    useEffect(() => {
        // Debug: pastikan props valid
        if (!idDokter || !token) {
            console.error("Tidak bisa fetch: idDokter/token tidak ada");
        return;
        }
    
        console.log("Fetching Dokter...", { idDokter, token });
    
    
        const fetchData = async () => {
        try {
            const response = await axios.get(
            `https://mjk-backend-production.up.railway.app/api/dokter/getbyid/${idDokter}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );
    
            console.log("Data diterima:", response.data);
            setDataDokterbyId(response.data);
        } catch (error) {
            console.error("Gagal fetch dokter:", {
            status: error.response?.status,
            message: error.message,
            data: error.response?.data,
            });
        }
        };
            fetchData();
    }, [idDokter, token]);
        

    useEffect(() => {
        if (!dataDokterbyId) return;

        // console.log("Data artikel diterima:", dataArtikel); // Debug

        setFormData({
            nama: dataDokterbyId.nama_dokter || "",
            username: dataDokterbyId.username_dokter || "",
            email: dataDokterbyId.email_dokter || "",
            NIK:dataDokterbyId.nik_dokter || "",
            alamat:dataDokterbyId.alamat_dokter || "",
            jeniskelamin:dataDokterbyId.jeniskelamin_dokter || "",
            tanggalLahir:dataDokterbyId.tgl_lahir_dokter
            ? new Date(dataDokterbyId.tgl_lahir_dokter).toISOString().split("T")[0]
            : "",
        foto_ktp:null,
        selfie_ktp_dokter:null,
        spesialis:dataDokterbyId.spesialis_dokter || "",
        no_str:dataDokterbyId.no_str_dokter || "",
    
    
        });
    }, [dataDokterbyId]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
        }));
    };

    // SUBMIT FORM TAMBAH DOKTER
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            for (const key in formData) {
                data.append("foto", formData.foto_profil_dokter); // file asli
            }
            const uploadRes = await axios.put(
                `https://mjk-backend-production.up.railway.app/api/dokter/update`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const imgPath = uploadRes.data.path;

            const dokterData = {
                nama_dokter: formData.nama,
                username_dokter: formData.username,
                email_dokter: formData.email,
                nik_dokter: formData.NIK,
                alamat_dokter: formData.alamat,
                jeniskelamin_dokter: formData.jeniskelamin,
                tgl_lahir_dokter: formData.tanggalLahir,
                foto_profil_dokter: imgPath,
                spesialis_dokter: formData.spesialis,
                no_str_dokter: formData.no_str,
            };


            const res = await axios.post(
                `https://mjk-backend-production.up.railway.app/api/dokter/create`,
                dokterData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Response:", uploadRes.data);
            showSuccessToast("Berhasil mengupdate data dokter");
            onClose();
        } catch (error) {
            console.error("Error updating data:", error);
            showErrorToast("Gagal mengupdate data dokter");
        }
    };

    const handleEditSubmitDokter = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
            }
            const uploadRes = await axios.put(
                `https://mjk-backend-production.up.railway.app/api/dokter/update`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const imgPath = uploadRes.data.path;

            const dokterData = {
                nama_dokter: formData.nama,
                username_dokter: formData.username,
                email_dokter: formData.email,
                alamat_dokter: formData.alamat,
                jeniskelamin_dokter: formData.jeniskelamin,
                tgl_lahir_dokter: formData.tanggalLahir,
                foto_profil_dokter: imgPath,
                spesialis_dokter: formData.spesialis,
                no_str_dokter: formData.no_str,
            };

            await axios.patch(
                `https://mjk-backend-production.up.railway.app/api/dokter/update/${idDokter}`,
                dokterData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
                showSuccessToast("Berhasil mengupdate data dokter");
                onClose();
        } catch (error) {
            console.error("Error updating data:"|| error.message);
            showErrorToast("Gagal mengupdate data dokter");
        }}




  return ({
    dataDokterbyId,
    formData,
    handleEditSubmitDokter,
    
    }
  )
}
