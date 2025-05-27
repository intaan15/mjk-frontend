import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from '../Modal/ToastModal';
import { rating } from '@material-tailwind/react';
import.meta.env.VITE_BASE_URL

export default function useDokter ({idDokter,token,onClose}) {
    // console.log("idDokter:", idDokter);
    // console.log("token:", token);
    const [dataDokterbyId, setDataDokterbyId] = useState(null);

    const [formData, setFormData] = useState({
        nama_dokter: "",
        username: "",
        email_dokter:"",
        rating_dokter:"",
        spesialis:null,
        tanggalLahir:"",
        str_dokter :"",
        notlp_dokter:"",
        foto_profil_dokter:null,

    });
    
    useEffect(() => {
        // Debug: pastikan props valid
        if (!idDokter || !token) {
            console.error("Tidak bisa fetch: idDokter/token tidak ada");
        return;
        }
    
        // console.log("Fetching Dokter...", { idDokter, token });
    
    
        const fetchData = async () => {
        try {
            const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/dokter/getbyid/${idDokter}`,
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
            nama_dokter: dataDokterbyId.nama_dokter || "",
            username: dataDokterbyId.username_dokter || "",
            email_dokter: dataDokterbyId.email_dokter || "",
            NIK:dataDokterbyId.nik_dokter || "",
            alamat:dataDokterbyId.alamat_dokter || "",
            notlp_dokter : dataDokterbyId.notlp_dokter || "",
            jeniskelamin:dataDokterbyId.jeniskelamin_dokter || "",
            rating_dokter:dataDokterbyId.rating_dokter || "",
            tanggalLahir:dataDokterbyId.tgl_lahir_dokter
            ? new Date(dataDokterbyId.tgl_lahir_dokter).toISOString().split("T")[0]
            : "",
            foto_profil_dokter:null,
            selfie_ktp_dokter:null,
            spesialis: dataDokterbyId.spesialis_dokter
                ? { label: dataDokterbyId.spesialis_dokter, value: dataDokterbyId.spesialis_dokter }
                : null,
            str_dokter:dataDokterbyId.str_dokter || "",
    
    
        });
    }, [dataDokterbyId]);
    
    const handleChangeSelect = (selectedOption) => {
        setFormData((prev) => ({
            ...prev,
            spesialis: selectedOption
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

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
             foto_profil_dokter: e.target.files[0],
        }));
    };

    // SUBMIT FORM TAMBAH DOKTER
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("foto_profil_dokter", formData.foto_profil_dokter); 

            const uploadRes = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/dokter/upload`,
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
                nama_dokter: formData.nama_dokter,
                username_dokter: formData.username,
                email_dokter: formData.email_dokter,
                nik_dokter: formData.NIK,
                alamat_dokter: formData.alamat,
                jeniskelamin_dokter: formData.jeniskelamin,
                tgl_lahir_dokter: formData.tanggalLahir,
                foto_profil_dokter: imgPath,
                spesialis_dokter: formData.spesialis,
                str_dokter: formData.str_dokter,
               
            };
            console.log(dokterData)


            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/dokter/create`,
                dokterData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Response:", res.data);
            showSuccessToast("Berhasil menambah data dokter");
            onClose();
        } catch (error) {
            console.error("Error updating data:",  error.response?.data || error.message);
            showErrorToast("Gagal menambah data dokter");
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
                `${import.meta.env.VITE_BASE_URL}/api/dokter/upload`,
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
                email_dokter: formData.email_dokter,
                alamat_dokter: formData.alamat,
                jeniskelamin_dokter: formData.jeniskelamin,
                tgl_lahir_dokter: formData.tanggalLahir,
                foto_profil_dokter: imgPath,
                spesialis_dokter: formData.spesialis?.value || "",
                no_str_dokter: formData.no_str,
              
            };

            await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/api/dokter/update/${idDokter}`,
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
    handleInputChange,
    handleEditSubmitDokter,
    handleChange,
    handleFileChange,
    handleSubmit,
    handleChangeSelect

    
    }
  )
}
