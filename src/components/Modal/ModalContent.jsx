import React from "react";
import axios from "axios";
import useArtikel from "../_hooks/useArtikel";
import useMasyarakat from "../_hooks/useMasyarakat";
import useDokter from "../_hooks/useDokter";
import TipTap from '../TipTap/TipTap'

import Select from "react-select";
import { FaEye, FaHeartbeat } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";  
import { IoCalendarOutline } from "react-icons/io5";
import DOMPurify from "dompurify";
import "../../index.css";



export default function ModalContent({ 
  modalType, 
  onClose, 
  dataArtikel,
  token,
  idArtikel,
  dataMasyarakatbyId,
  idMasyarakat,
  dataDokterbyId,
  idDokter,
  onAddSuccess}) 



  {   
    // DEBUG
  //  const data = dataArtikel; 
  //  console.log("Data di ModalContent:", data);
   const {
      formData: formArtikel,
      handleChange: handleChangeArtikel,
      handleEditSubmit: handleEditSubmitArtikel,
      handleFileChange: handleFileChangeArtikel,
      handleSubmit:handleSubmitArtikel,
      handleChangeKategori:handleChangeKategoriArtikel
   } = useArtikel({idArtikel, token,dataArtikel, onClose});

  //  const data = dataMasyarakatbyId;
  //  console.log("Data di masyarakat:", data);

   const {
    formData: formMasyarakat,
    handleChange: handleChangeMasyarakat,
    handleEditSubmit: handleEditSubmitMasyarakat,
    handleFotoKTPChange: handleFotoKTPChange,
    previewFotoKTP: previewFotoKTP,
   }= useMasyarakat({idMasyarakat, token, onClose,dataMasyarakatbyId});

  // const data = dataDokterbyId;
  // console.log("Data di dokter:", data);
  
  const {
    formData: formDokter,
    handleChange: handleChangeDokter,
    handleEditSubmitDokter: handleEditSubmitDokter,
    handleFileChange: handleFileChangeDokter,
    handleChangeSelect: handleChangeSelectDokter,
    handleSubmit:handleSubmitDokter,
    handleResetFile:handleResetFileDokter
    
  } = useDokter({idDokter, token,dataDokterbyId, onClose,onAddSuccess });
  
   const options = [
    
      { value: "Umum", label: <><img src="../icon_poli/poli_umum.svg" className="inline mr-2 w-5 h-5"/> Spesialis Umum</> },
      { value: "Mata", label: <><img src="../icon_poli/poli_mata.svg" className="inline mr-2 w-5 h-5"/> Spesialis Mata</> },
      { value: "Anak", label: <><img src="../icon_poli/poli_anak.svg" className="inline mr-2 w-5 h-5"/> Spesialis Anak</> },
      { value: "Gigi", label: <><img src="../icon_poli/poli_gigi.svg" className="inline mr-2 w-5 h-5"/> Spesialis Gigi</> },
      { value: "THT", label: <><img src="../icon_poli/poli_tht.svg" className="inline mr-2 w-5 h-5"/> Spesialis THT</> },
      { value: "Jantung", label: <><img src="../icon_poli/poli_jantung.svg" className="inline mr-2 w-5 h-5"/>Spesialis Jantung </> },
      { value: "Kandungan", label: <><img src="../icon_poli/poli_kandungan.svg" className="inline mr-2 w-5 h-5"/> Spesialis Kandungan</> },
      { value: "Bedah", label: <><img src="../icon_poli/poli_bedah.svg" className="inline mr-2 w-5 h-5"/> Spesialis Bedah</> },
      { value: "Syaraf", label: <><img src="../icon_poli/poli_syaraf.svg" className="inline mr-2 w-5 h-5"/> Spesialis syaraf</> },
      { value: "Paru", label: <><img src="../icon_poli/poli_paru.svg" className="inline mr-2 w-5 h-5"/> Spesialis Paru</> },
      { value: "Kulit", label: <><img src="../icon_poli/kulit.png" className="inline mr-2 w-6 h-6"/> Spesialis Kulit</> },
      { value: "Darah", label: <><img src="../icon_poli/darah.svg" className="inline mr-2 w-5 h-5"/> Darah</> },
      { value: "Fisioterapi", label: <><img src="../icon_poli/fisioterapi.svg" className="inline mr-2 w-5 h-5"/> Fisioterapi</> },
      { value: "Lambung", label: <><img src="../icon_poli/lambung.png" className="inline mr-2 w-5 h-5"/> Lambung</> },
      { value: "Hati", label: <><img src="../icon_poli/hati.svg" className="inline mr-2 w-5 h-5"/> Hati</> },

    ];
    const [showPassword, setShowPassword] = useState(false);
   
    const optionKategori = [
      { value: 'Kesehatan', label: 'Kesehatan' },
      { value: 'Obat', label: 'Obat' },
    ]

  switch (modalType) {
    // ARTIKEL
    case "editdataartikel":
      return (
        <>
          <div className="text-start w-full">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-xl font-[raleway] text-[#004A76] underline font-extrabold mb-6">Edit Data Artikel</h1>

            <form
              onSubmit={handleEditSubmitArtikel}
              className="space-y-6"
            >
              {/* Judul */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="judul"
                  className="w-1/5 font-medium text-black dark:text-black" style={{fontFamily: 'Nunito Sans'}}
                >
                  Judul
                </label>
                <textarea
                  id="judul"
                  name="judul"
                  rows="1"
                  className="block p-2.5 w-4/5 text-sm  text-gray-900 bg-gray-30 rounded-md border border-gray-300 focus:ring-[#004A76]"
                  placeholder="judul artikel"
                  value={formArtikel.judul}
                  onChange={handleChangeArtikel}
                  required
                />
              </div>


              {/* Foto Artikel */}
              <div className="flex items-start gap-4">
                <label
                  htmlFor="dropzone-file"
                  className="w-1/5 font-medium text-gray-900 dark:text-black " 
                >
                  Sampul Artikel
                </label>
                <div className="w-4/5">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-30 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Klik Untuk Mengunggah</span>{" "}
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      name="foto"
                      type="file"
                      className="hidden"
                      onChange={handleFileChangeArtikel}
                      accept="image/*"
                    />
                  </label>

                  {/* Preview gambar yang dipilih */}
                  {formArtikel.foto ? (
                    <img
                      src={URL.createObjectURL(formArtikel.foto)}
                      alt="preview"
                      className="w-[200px] h-[100px] object-cover rounded-xl border border-black"
                    />
                  ) : dataArtikel?.gambar_artikel ? ( // <-- tambahkan tanda tanya (optional chaining)
                    <img
                      src={dataArtikel.gambar_artikel}
                      alt="foto artikel lama"
                      className="w-[200px] h-[100px] object-cover rounded-xl border border-black"
                    />
                  ) : null}
                </div>
              </div>

              {/* Kategori */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="kategori"
                  className="w-1/5 font-medium text-gray-900 dark:text-black"
                >
                  Kategori
                </label>
                <select
                    id="kategori"
                    name="kategori"
                    className="bg-gray-30 border border-gray-300 text-gray-900 text-sm rounded-lg block w-4/5 p-2.5"
                    value={formArtikel.kategori}
                    onChange={handleChangeKategoriArtikel}
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {optionKategori.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
              </div>

              {/* Deskripsi */}
              <div className="flex items-start gap-4">
                <label
                  htmlFor="deskripsi"
                  className="w-1/5 font-medium text-gray-900 dark:text-black"
                >
                  Deskripsi
                </label>
                <div className="w-4/5 h-auto  border-2 border-gray-100 rounded-lg" >
                  <TipTap 
                    id="deskripsi"
                    rows="4"
                    className="w-4/5 p-2 border rounded"
                    name="deskripsi"
                    value={formArtikel.deskripsi} 
                     onChange={(html) => handleChangeArtikel("deskripsi", html)}
                    required
                    />
                </div>
      
              </div>

              {/* Tombol Submit */}
              <div className="text-center mt-5">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#004A76] hover:bg-[#039FFC]/70 text-white rounded-xl cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </>
      );

    case "detailartikel":
      return (
        <>
          <div className="text-start w-full ">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-2xl font-extrabold font-[raleway] underline text-[#004A76]">Detail  Artikel</h1>
            <div className="flex-1 flex-row">
              <div className="flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label className="block mb-2 font-extrabold text-medium text-gray-900 dark:text-black w-1/5" style={{fontFamily: 'Nunito Sans'}}>
                  Judul
                </label>
                <div className="w-4/5">
                  <div className="flex items-center w-full" style={{fontFamily: 'Nunito Sans'}}>
                    : {dataArtikel?.nama_artikel || "-"}
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5">
                  Tanggal Terbit
                </label>
                <div className="w-4/5">
                  <div className="flex items-center w-full">
                    :{" "}
                    {dataArtikel?.tgl_terbit_artikel
                      ? new Date(
                          dataArtikel.tgl_terbit_artikel
                        ).toLocaleDateString()
                      : "-"}
                  </div>
                </div>
              </div> */}

              <div className="flex flex-column w-full justify-center items-start gap-10 mt-8">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5">
                  Foto Artikel
                </label>
                <div className="flex flex-col h-auto w-4/5 justify-center items-start gap-2">
                  <div className="flex w-full">
                    :
                    <img
                      src={dataArtikel?.gambar_artikel || null}
                      alt="foto artikel"
                      className="ml-2 border border-black w-[200px] h-[100px] object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5">
                  Kategori
                </label>
                <div className="w-4/5">
                  <div className="flex items-center w-full">
                    : {dataArtikel?.kategori_artikel || "-"}
                  </div>
                </div>
              </div>

              <div className="flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5">
                  Deskripsi
                </label>
                <div className="w-4/5 bg-gray-50 rounded-lg p-4">
                  
                  <div
                    className="artikel-detail-content w-full  list-inside list-decimal"
                    style={{ listStyleType: 'disc', paddingLeft: '1.25rem' }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataArtikel?.detail_artikel || " ") }}
                    />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="px-4 py-2 bg-[#004A76] hover:bg-[#039FFC]/70 text-white rounded-xl cursor-pointer mt-5"
               onClick={() => onClose(false)}             
              >
                Tutup
              </button>
            </div>
          </div>
        </>
      );

    case "tambahartikel":
      return (
        <>
          <div className="text-start w-full relative">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-xl font-[raleway] text-[#004A76] underline font-extrabold mb-6" >
              Tambah Data Artikel
            </h1>

            <form onSubmit={handleSubmitArtikel} className="space-y-6">

              {/*Add Judul */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="judul"
                  className="w-1/5 font-medium text-black dark:text-black" style={{fontFamily: 'Nunito Sans'}}
                >
                  Judul
                </label>
                <textarea
                  id="judul"
                  name="judul"
                  rows={1}
                  className="block p-2.5 w-4/5 text-sm  text-gray-900 bg-gray-30 rounded-md border border-gray-300 focus:ring-[#004A76]"
                  placeholder="Masukkan Judul Artikel"
                  value={formArtikel.judul}
                  onChange={handleChangeArtikel}
                  required
                />
              </div>
              
              {/* Add foto */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="foto"
                  className="w-1/5 font-medium text-gray-900 dark:text-black " 
                >
                  Sampul Artikel
                </label>
                <div className="w-4/5">
                  <label
                    htmlFor="foto"
                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-30 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Klik untuk mengunggah</span>{" "}
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="foto"
                      name="foto"
                      type="file"
                      className="hidden"
                      onChange={handleFileChangeArtikel}
                    />
                  </label>
                  <div className="font-light text-[14px] self-start text-lime-500">
                    {formArtikel.foto
                      ? formArtikel.foto.name
                      : "Belum ada file yang dipilih"}
                  </div>
                </div>
              </div>

              {/* Update Kategori */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="kategori"
                  className="w-1/5 font-medium text-gray-900 dark:text-black"
                >
                  Kategori
                </label>
                <select
                  id="kategori"
                  name="kategori"
                  className="bg-gray-30 border border-gray-300 text-gray-900 text-sm rounded-lg block w-4/5 p-2.5"
                  value={formArtikel.kategori}
                  onChange={handleChangeKategoriArtikel}
                  required
                >
                  <option value="kategori">Pilih Kategori</option>
                  {optionKategori.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

                {/* Deskripsi */}
              <div className="flex items-start gap-4">
                <label
                  htmlFor="deskripsi"
                  className="w-1/5 font-medium text-gray-900 dark:text-black"
                >
                  Deskripsi
                </label>
                <div className="w-4/5 h-auto  border-2 border-gray-100 rounded-lg" >
                  <TipTap 
                    id="deskripsi_artikel"
                    rows="4"
                    name="deskripsi"
                    value={formArtikel.deskripsi} 
                    onChange={(html) => handleChangeArtikel("deskripsi", html)}/>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl cursor-pointer mt-5 bg-[#004A76] hover:bg-[#039FFC]/70 text-white justify-between"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </>
      );

    // MODAL MASAYARAKAT
    case "detailprofilmasyarakat":
      // console.log("Data di modal:", dataMasyarakat);
      return (
        <>
          <div className="text-start flex flex-col justify-center items-center ">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold text-[#025F96] font-[raleway]">Detail Profil Masyarakat</h1>

            <div className="flex flex-col justify-center items-center gap-4 w-4/5 mt-7 ">
              <div className=" border-2 border-[#025F96] rounded-full p-12">foto</div>
              <div className=" grid grid-cols-2 gap-5 w-full text-center p-4">
                <div className=" grid grid-rows-2 gap-2 w-full text-left px-10  bg-yellow-200">
                  <span className="text-[#025F96] font-bold underline bg-blue-400">Nama</span>
                  <div className="bg-red-400">{dataMasyarakatbyId?.nama_masyarakat || " "}</div>
                </div>
                <div className=" grid grid-rows-2 gap-2 w-full text-left px-10">
                  <div className="text-[#025F96] font-bold underline">Username</div>
                  <div>{dataMasyarakatbyId?.username_masyarakat || " "}</div>
                </div>
                <div className="grid grid-rows-2 gap-2 w-full text-left px-10">
                  <div className="text-[#025F96] font-bold underline">Email</div>
                  <div>{dataMasyarakatbyId?.email_masyarakat || " "}</div>
                </div>
                <div className="grid grid-rows-2 gap-2 w-full text-left px-10">
                  <div className="text-[#025F96] font-bold underline">NIK</div>
                  <div>{dataMasyarakatbyId?.nik_masyarakat}</div>
                </div>
                <div className="grid grid-rows-2 gap-2 w-full text-left px-10">
                  <div className="text-[#025F96] font-bold underline">Alamat</div>
                  <div>{dataMasyarakatbyId?.alamat_masyarakat}</div>
                </div>
                <div className="grid grid-rows-2 gap-2 w-full text-left px-10">
                  <div className="text-[#025F96] font-bold underline">Nomor Telepon</div>
                  <div>{dataMasyarakatbyId?.notlp_masyarakat}</div>
                </div>
                <div className="grid grid-rows-2 gap-2 w-full text-left px-10">

                  <div className="text-[#025F96] font-bold underline">Jenis Kelamin</div>
                  <div>{dataMasyarakatbyId?.jeniskelamin_masyarakat}</div>
                </div>
                <div className="grid grid-rows-2 gap-2 w-full text-left px-10">
                  <div className="text-[#025F96] font-bold underline">Tanggal Lahir</div>
                  <div>{dataMasyarakatbyId?.tgl_lahir_masyarakat?.slice(0, 10)}</div>
                </div>
                <div className="text-left px-10" >
                  <div className="text-[#025F96] font-bold underline">Foto KTP</div>
                  <div className=" bg-orange-200 h-50 rounded-xl">
                      <img
                        src={dataMasyarakatbyId?.foto_ktp_masyarakat}
                        alt="Foto KTP"
                        className="object-cover w-40 h-40 mx-auto"
                      />
                  </div>
                </div>
                <div className="text-left px-10">
                  <div className="text-[#025F96] font-bold underline">Selfie dengan KTP</div>
                  <div className="bg-orange-200 h-50 rounded-xl">
                     <img
                        src={dataMasyarakatbyId?.selfie_ktp_masyarakat}
                        alt="Selfie KTP"
                        className="object-cover w-40 h-40 mx-auto"
                      />
                  </div>
                </div>
              </div>
            </div>
            <div className=" text-center">
              <button
                className="px-4 py-2 bg-[#1177B3] text-white rounded-xl cursor-pointer mt-5"
                onClick={() => onClose(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </>
      );

    case "formeditmasyarakat":
      return (
        <>
          <div className="text-start ">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-xl font-bold text-[#004A76] underline">Edit Profil Masyarakat </h1>

            <form onSubmit={handleEditSubmitMasyarakat} className="space-y-6">
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="bg-red-200 rounded-full p-12">foto</div>
                <div className="grid grid-cols-2 gap-4 w-full text-center">
                  <div className="flex flex-col items-center">
                    <label className="text-[#025F96] font-bold">Nama</label>
                    <input
                      type="text"
                      name="nama"
                      defaultValue={formMasyarakat.nama}
                      className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={handleChangeMasyarakat}
                      maxLength={50}
                      required
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-[#025F96] font-bold">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        defaultValue={formMasyarakat.username}
                        onChange={handleChangeMasyarakat}
                        className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        maxLength={50}
                        required
                      />
                  </div>
    
                  <div className="flex flex-col items-center">
                    <label className="text-[#025F96] font-bold">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        defaultValue={formMasyarakat.email}
                        onChange={handleChangeMasyarakat}
                        className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        maxLength={50}
                        required
                      />
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-[#025F96] font-bold">NIK</label>
                     <input
                        type="text"
                        id="NIK"
                        name="NIK"
                        defaultValue={formMasyarakat.NIK}
                        onChange={handleChangeMasyarakat}
                        className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        maxLength={50}
                        required
                      />
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-[#025F96] font-bold">Alamat</label>
                    <input
                      type="text"
                      id="alamat"
                      name="alamat"
                      defaultValue={formMasyarakat.alamat}
                      className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={handleChangeMasyarakat}
                      maxLength={50}
                      required
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-[#025F96] font-bold">Nomor Telepon</label>
                    <input
                      type="text"
                      id="nomorTelepon"
                      name="nomorTelepon"
                      defaultValue={formMasyarakat.notlp}
                      className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={handleChangeMasyarakat}
                      maxLength={50}
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <label className="text-[#025F96] font-bold">Jenis Kelamin</label>
                    <select
                      name="jenisKelamin"
                      defaultValue={formMasyarakat.jeniskelamin}
                      className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={handleChangeMasyarakat}
                      required
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-[#025F96] font-bold">Tanggal Lahir</label>
                    <input
                      type="date"
                      id="tanggalLahir"
                      name="tanggalLahir"
                      defaultValue={formMasyarakat.tanggalLahir.slice(0, 10)}
                      className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={handleChangeMasyarakat}
                      maxLength={50}
                      required
                    />
                  </div>
                 
                  <div className="flex flex-col items-center gap-2">
                    <label className="text-[#025F96] font-bold">Foto KTP</label>
                      <div className="bg-orange-200 rounded-xl p-2 w-44 h-44 flex items-center justify-center">
                        {previewFotoKTP ? (
                          <img
                            src={previewFotoKTP}
                            alt="Preview Foto KTP"
                            className="object-cover w-full h-full rounded-xl"
                          />
                        ) : (
                          <span className="text-gray-600 text-center">Belum ada gambar</span>
                        )}
                      </div>
                      <input
                      type="file"
                      name="fotoKTP"
                      className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={handleChangeMasyarakat}
                      maxLength={50}
                      required
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2" >
                    <label className="text-[#025F96] font-bold">Selfie dengan KTP</label>
                    <div className="bg-orange-200 rounded-xl p-2 w-44 h-44 flex items-center justify-center gap-2">
                      {previewFotoKTP ? (
                        <img
                          src={previewFotoKTP}
                          alt="Preview Foto KTP"
                          className="object-cover w-full h-full rounded-xl"
                        />
                      ) : (
                        <span className="text-gray-600 text-center">Belum ada gambar</span>
                      )}
                    </div>
                    <input
                      type="file"
                      name="fotoKTP"
                      className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={handleChangeMasyarakat}
                      maxLength={50}
                      required
                    />
                  </div>
                </div>
                <div className=" text-center flex flex-row gap-4 mt-5 items-center">
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded-xl w-50 hover:bg-gray-500 transition duration-200 ease-in-out"
                    onClick={() => setShowModal(false)}
                    
                  >
                    Batalkan
                  </button>
                  <button
                     className="px-4 py-2 bg-[#1177B3] text-white rounded-xl hover:bg-[#0d5e90] w-50 transition duration-200 ease-in-out"
                    onClick={handleEditSubmitMasyarakat}
                    
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </form>


          </div>
        </>
      );

    // DOKTER
    case "tambahdatadokter":
      return (
        <>
          <div className="text-start w-full ">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold underline text-[#004A76]">Tambah Data Dokter</h1>
            <form onSubmit={handleSubmitDokter} className="space-y-6" >
              
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5" 
                    style={{fontFamily: 'Nunito Sans'}}
                  >
                    Nama
                  </label>
                    <textarea
                      name="nama_dokter"
                      id="nama_dokter"
                      rows="4"
                      className="block p-2.5 w-4/5 h-12 text-sm text-gray-900 bg-gray-30 rounded-md 
                            border dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 
                            dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="dr. Tirta, Sp.O"
                      value={formDokter.nama_dokter ||""}
                      onChange={handleChangeDokter}
                    ></textarea>
                
                </div>
                <div className=" flex flex-column w-full justify-center items-start gap-10 mt-6">
                  <label
                    htmlFor="foto_profil_dokter"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5" style={{fontFamily: 'Nunito Sans'}}
                  >
                    Foto Profil
                  </label>

                  <div className=" flex flex-col h-auto w-4/5 justify-center items-start gap-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="foto_profil_dokter"
                        className="flex flex-col items-center justify-center w-full h-28 border-1 border-gray-300 border-dashed rounded-md  cursor-pointer bg-gray-30  dark:bg-white hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-white"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Klik untuk Mengunggah</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input 
                          name="foto_profil_dokter"
                          id="foto_profil_dokter" 
                          type="file" 
                          className="hidden"
                          onChange={handleFileChangeDokter}
                          />
                      </label>
                    </div>
                    <div className="font-light text-[14px] self-start text-lime-500">
                    {formDokter.foto_profil_dokter
                      ? formDokter.foto_profil_dokter.name
                      : "Belum ada file yang dipilih"}
                    </div>

                    <button type="button" onClick={handleResetFileDokter} className=" px-3 py-1 border-2 rounded-xl font-sm cursor-pointer text-[#0c4a6e] hover:bg-[#004A76] hover:text-white"style={{fontFamily: 'Nunito Sans'}}>
                    Batalkan
                    </button>
                  </div>
                </div>
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-6">
                  <label
                    htmlFor="spesialis"
                    className="block w-1/5 mb-2 text-sm font-medium text-gray-900 dark:text-black focus-ring-gray-500" style={{fontFamily: 'Nunito Sans'}}
                  >
                    Spesialis
                  </label>
                
                  <Select
                    name="spesialis"
                    id="spesialis"
                    options={options}
                    className="text-sm focus:ring-2 w-4/5 focus:ring-gray-500 scrollbar-thumb-rounded-full"
                    value = {formDokter.spesialis}
                    placeholder="Buka Spesialis"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? '#6B7280' : base.borderColor,
                        boxShadow: state.isFocused ? '0 0 0 2px rgba(107,114,128,0.5)' : base.boxShadow,
                        '&:hover': {
                          borderColor: '#6B7280',
                        },}),}}
                    onChange={handleChangeSelectDokter}
              
                  />
  
                </div>
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5" style={{fontFamily: 'Nunito Sans'}} 
                  >
                    Email
                  </label>

                    <textarea
                      name="email_dokter"
                      id="email_dokter"
                      rows="1"
                      className="block p-2.5 w-4/5 text-sm text-gray-900 bg-gray-30 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Masukkan Email"
                      value={formDokter.email_dokter||""}
                      onChange={handleChangeDokter}
                    ></textarea>

                </div>
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-6">
                  <label
                    htmlFor="notlp_dokter"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5" style={{fontFamily: 'Nunito Sans'}} 
                  >
                    No. Handphone
                  </label>
                  <textarea
                      id="notlp_dokter"
                      name="notlp_dokter"
                      rows="1"
                      className="block p-2.5 w-4/5 text-sm text-gray-900 bg-gray-30 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Masukkan No. Handphone"
                      value={formDokter.notlp_dokter||""}
                      onChange={handleChangeDokter}
                    ></textarea>
                </div>
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-6">
                  <label
                    htmlFor="no_str"
                    className="block mb-2 text-sm  font-medium text-gray-900 dark:text-black w-1/5"
                  >
                    No. STR
                  </label>

                    <textarea
                      id="str_dokter"
                      name="str_dokter"
                      rows="1"
                      className="block p-2.5 text-sm w-4/5 text-gray-900 bg-gray-30 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Masukkan No. STR"
                      value={formDokter.str_dokter||""}
                      onChange={handleChangeDokter}
                    ></textarea>
                </div>
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-6">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5" style={{fontFamily: 'Nunito Sans'}}
                  >
                    Username
                  </label>
                    <textarea
                      id="username_dokter"
                      name="username_dokter"
                      rows="1"
                      className="block p-2.5 w-4/5 text-sm text-gray-900 bg-gray-30 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Masukkan Username"
                      value={formDokter.username_dokter||""}
                      onChange={handleChangeDokter}
                    ></textarea>
                
                </div>
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-5">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5" style={{fontFamily: 'Nunito Sans'}}
                  >
                    Password
                  </label>

                  <div className="relative w-4/5">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password_dokter"
                      id="password_dokter"
                      className="block w-full p-2.5 text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Masukkan Password"
                      value={formDokter.password_dokter ||""}
                      onChange={handleChangeDokter}
                      
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
              
              </div>
              <div className=" text-center">
                <button type="submit" className="px-4 py-2 bg-[#004A76] text-white rounded-xl cursor-pointer mt-5 font-[raleway] hover:bg-[#039FFC]/70"
                  
                >
                  Tambah Data
                </button>
              </div>
            </form>
          
          </div>
        </>
      );

    case "editdatadokter":
      return (
        <>
          <div className="text-start w-full ">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold font-[raleway] underline text-[#004A76]">Edit Data Dokter</h1>
             <form onSubmit={handleEditSubmitDokter} className="space-y-6" >
              
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5" 
                    style={{fontFamily: 'Nunito Sans'}}
                  >
                    Nama
                  </label>
                    <textarea
                      name="nama_dokter"
                      id="nama_dokter"
                      rows="4"
                      className="block p-2.5 w-4/5 h-12 text-sm text-gray-900 bg-gray-30 rounded-md 
                            border dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 
                            dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="dr. Tirta, Sp.O"
                      value={formDokter.nama_dokter}
                      onChange={handleChangeDokter}
                    ></textarea>
                
                </div>
                <div className=" flex flex-column w-full justify-center items-start gap-10 mt-6">
                  <label
                    htmlFor="foto_profil_dokter"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5" style={{fontFamily: 'Nunito Sans'}}
                  >
                    Foto Profil
                  </label>

                  <div className=" flex flex-col h-auto w-4/5 justify-center items-start gap-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="foto_profil_dokter"
                        className="flex flex-col items-center justify-center w-full h-28 border-1 border-gray-300 border-dashed rounded-md  cursor-pointer bg-gray-30  dark:bg-white hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-white"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Klik untuk Mengunggah</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input 
                          name="foto_profil_dokter"
                          id="foto_profil_dokter" 
                          type="file" 
                          className="hidden"
                          onChange={handleFileChangeDokter}
                          />
                      </label>
                       {/* Preview gambar yang dipilih */}
                      {formDokter.foto_profil_dokter ? (
                        <img
                          src={URL.createObjectURL(formDokter.foto_profil_dokter)}
                          alt="preview"
                          className="w-[200px] h-[100px] object-cover rounded-xl border border-black"
                        />
                      ) : dataDokterbyId?.foto_profil_dokter ? ( // <-- tambahkan tanda tanya (optional chaining)
                        <img
                          src={dataDokterbyId.foto_profil_dokter}
                          alt=""
                          className="w-[200px] h-[100px] object-cover rounded-xl border border-black"
                        />
                  ) : null}
                    </div>
                    <div className="font-light text-[14px] self-start text-lime-500">
                    {formDokter.foto_profil_dokter
                      ? formDokter.foto_profil_dokter.name
                      : "Belum ada file yang dipilih"}
                    </div>

                    <button type="button" className=" px-3 py-1 border-2 rounded-xl font-sm cursor-pointer text-[#0c4a6e] hover:bg-[#004A76] hover:text-white"style={{fontFamily: 'Nunito Sans'}}>
                    Batalkan
                    </button>
                  </div>
                </div>
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-6">
                  <label
                    htmlFor="spesiali"
                    className="block w-1/5 mb-2 text-sm font-medium text-gray-900 dark:text-black focus-ring-gray-500" style={{fontFamily: 'Nunito Sans'}}
                  >
                    Spesialis
                  </label>
                  <Select
                    name="spesialis"
                    id="spesialis"
                    options={options}
                    className="text-sm focus:ring-2 w-4/5 focus:ring-gray-500 scrollbar-thumb-rounded-full"
                    value = {formDokter.spesialis}
                    placeholder="Buka Spesialis"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? '#6B7280' : base.borderColor,
                        boxShadow: state.isFocused ? '0 0 0 2px rgba(107,114,128,0.5)' : base.boxShadow,
                        '&:hover': {
                          borderColor: '#6B7280',
                        },}),}}
                    onChange={handleChangeSelectDokter}
              
                  />
  
                </div>
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5" style={{fontFamily: 'Nunito Sans'}} 
                  >
                    Email
                  </label>

                    <textarea
                      name="email_dokter"
                      id="email_dokter"
                      rows="1"
                      className="block p-2.5 w-4/5 text-sm text-gray-900 bg-gray-30 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Masukkan Email"
                      value={formDokter.email_dokter}
                      onChange={handleChangeDokter}
                    ></textarea>

                </div>
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-6">
                  <label
                    htmlFor="notlp_dokter"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5" style={{fontFamily: 'Nunito Sans'}} 
                  >
                    No. Handphone
                  </label>
                   <textarea
                      id="notlp_dokter"
                      name="notlp_dokter"
                      rows="1"
                      className="block p-2.5 w-4/5 text-sm text-gray-900 bg-gray-30 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Masukkan No. Handphone"
                      value={formDokter.notlp_dokter}
                      onChange={handleChangeDokter}
                    ></textarea>
                </div>
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-6">
                  <label
                    htmlFor="no_str"
                    className="block mb-2 text-sm  font-medium text-gray-900 dark:text-black w-1/5"
                  >
                    No. STR
                  </label>

                    <textarea
                      id="no_str"
                      name="no_str"
                      rows="1"
                      className="block p-2.5 text-sm w-4/5 text-gray-900 bg-gray-30 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Masukkan No. STR"
                      value={formDokter.str_dokter}
                      onChange={handleChangeDokter}
                    ></textarea>
                </div>
                <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-6">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5" style={{fontFamily: 'Nunito Sans'}}
                  >
                    Username
                  </label>
                    <textarea
                      id="username_dokter"
                      name="username_dokter"
                      rows="1"
                      className="block p-2.5 w-4/5 text-sm text-gray-900 bg-gray-30 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Masukkan Username"
                      value={formDokter.username_dokter}
                      onChange={handleChangeDokter}
                    ></textarea>
                
                </div>
             
              <div className=" text-center">
                <button type="submit" className="px-4 py-2 bg-[#004A76] text-white rounded-xl cursor-pointer mt-5">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </>
      );

    case "detailprofildokter":
      return (
        <>
          <div className="">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <p className="text-center text-xl font-bold items-center py-2">
              Detail Profil Dokter
            </p>

            <div className="flex flex-col justify-center items-center gap-4">
              <div className="bg-red-200 rounded-full p-12 border-2 border-[#025F96] font-bold">foto</div>
              <div className="grid grid-cols-2 gap-4 w-full text-center ">
                <div>
                  <div className="text-[#025F96] font-bold underline">Nama</div>
                  <div>{dataDokterbyId?.nama_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]  font-bold underline">Username</div>
                  <div>{dataDokterbyId?.username_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]  font-bold underline">Email</div>
                  <div>{dataDokterbyId?.email_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]  font-bold underline">Rating Dokter</div>
                  <div>{dataDokterbyId?.rating_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]  font-bold underline">Bidang Dokter</div>
                  <div>{dataDokterbyId?.spesialis_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]  font-bold underline ">Nomor Telepon</div>
                  <div>{dataDokterbyId?.notlp_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]  font-bold underline">Nomor.STR Kedokteran</div>
                  <div>{dataDokterbyId?.str_dokter}</div>
                </div>
                
              </div>
              <div className=" text-center">
                <button className="px-4 py-2 bg-[#004A76] text-white rounded-xl cursor-pointer mt-5"
                 onClick={() => onClose(false)}>
                 Tutup
                </button>
            </div>
            </div>
          </div>
        </>
      );

    default:
      return null;
  }};