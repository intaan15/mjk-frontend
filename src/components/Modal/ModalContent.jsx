import React from "react";
import axios from "axios";
import useArtikel from "../_hooks/useArtikel";
import useMasyarakat from "../_hooks/useMasyarakat";
import useDokter from "../_hooks/useDokter";
import { ImagePreviewCard, ImagePreviewModal } from "./ImagePreviewCard"; 
import TipTap from '../TipTap/TipTap'

import Select from "react-select";
import { FaEye, FaHeartbeat } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";  
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
   // PERBAIKI DESTRUCTURING - HAPUS formData: formArtikel
   const {
      formArtikel,  // LANGSUNG GUNAKAN formArtikel
      handleChangeArtikel,
      handleEditSubmitArtikel,
      handleFileChangeArtikel,
      handleSubmit: handleSubmitArtikel,
      handleChangeKategoriArtikel,
      handleImageClick: handleImageClickArtikel,
      closeImageModal, 
      showImageModal, 
      selectedImage, 
      selectedImageAlt,
      dataArtikel: dataArtikelFromHook  // TAMBAHKAN INI
   } = useArtikel({idArtikel, token, dataArtikel, onClose});

   const {
    formData: formMasyarakat,
    handleChange: handleChangeMasyarakat,
    handleEditSubmit: handleEditSubmitMasyarakat,
    handleFotoKTPChange: handleFotoKTPChange,
    previewFotoKTP: previewFotoKTP,
   }= useMasyarakat({idMasyarakat, token, onClose,dataMasyarakatbyId});

   console.log("Data Masyarakat by ID:", formMasyarakat);

  const {
    formData: formDokter,
    handleChange: handleChangeDokter,
    handleEditSubmitDokter: handleEditSubmitDokter,
    handleFileChange: handleFileChangeDokter,
    handleChangeSelect: handleChangeSelectDokter,
    handleSubmit:handleSubmitDokter,
    handleResetFile:handleResetFileDokter,
    regeneratePassword:regeneratePasswordDokter,
    generatePassword:generatePasswordDokter
    
  } = useDokter({idDokter, token,dataDokterbyId, onClose,onAddSuccess, modalType });
  
 
  
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

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const openPreview = (imageSrc, imageAlt) => {
      setPreviewImage({ src: imageSrc, alt: imageAlt });
      setIsPreviewOpen(true);
    };

    const closePreview = () => {
      setIsPreviewOpen(false);
      setPreviewImage(null);
    };

  switch (modalType) {
    case "editdataartikel":
      return (
        <>
          <div className="text-start w-full">
            <button
              onClick={onClose}
              className=" cursor-pointer absolute top-0 right-2 text-gray-600 hover:text-red-500 text-4xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-xl font-[raleway] text-[#004A76] underline font-extrabold mb-6">
              Edit Data Artikel
            </h1>

            <form onSubmit={handleEditSubmitArtikel} className="space-y-6">
              {/* Judul */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="judul"
                  className="w-1/5 font-medium text-black dark:text-black"
                  style={{ fontFamily: "Nunito Sans" }}
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
              <div className="flex items-start gap-4 ">
                <label
                  htmlFor="dropzone-file"
                  className="w-1/5 font-medium text-gray-900 dark:text-black "
                >
                  Sampul Artikel
                </label>

                <div className=" flex flex-col h-auto w-4/5 justify-center items-start gap-2">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="gambar_artikel"
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
                          <span className="font-semibold">
                            Klik untuk Mengunggah
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        name="gambar_artikel"
                        id="gambar_artikel"
                        type="file"
                        className="hidden"
                        onChange={handleFileChangeArtikel}
                      />
                    </label>
                    {/* Preview gambar */}
                    {formArtikel.gambar_artikel && typeof formArtikel.gambar_artikel === 'object' ? (
                      <img
                        src={URL.createObjectURL(formArtikel.gambar_artikel)}
                        alt="preview"
                        className="w-[200px] h-[100px] object-cover rounded-xl border border-black"
                      />
                    ) : (dataArtikelFromHook || dataArtikel)?.gambar_artikel ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}${(dataArtikelFromHook || dataArtikel)?.gambar_artikel}`}
                        alt="current"
                        className="w-[200px] h-[100px] object-cover rounded-xl border border-black"
                      />
                    ) : null}
                  </div>
                  
                  {/* Status File */}
                  <div className="font-light text-[14px] self-start">
                    {formArtikel.gambar_artikel && formArtikel.gambar_artikel.name ? (
                      <span className="text-green-600">
                        ✅ File baru: {formArtikel.gambar_artikel.name}
                      </span>
                    ) : (dataArtikelFromHook || dataArtikel)?.gambar_artikel ? (
                      <span className="text-blue-600">
                        📷 Menggunakan gambar saat ini: {(dataArtikelFromHook || dataArtikel)?.gambar_artikel.split('/').pop()}
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        ❌ Belum ada file yang dipilih
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className=" px-3 py-1 border-2 rounded-xl font-sm cursor-pointer text-[#0c4a6e] hover:bg-[#004A76] hover:text-white"
                    style={{ fontFamily: "Nunito Sans" }}
                  >
                    Batalkan
                  </button>
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
                <div className="w-4/5 h-auto  border-2 border-gray-100 rounded-lg">
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
                  className="px-4 py-2 bg-[#004A76] hover:bg-[#039FFC]/70 text-white rounded-xl cursor-pointer mt-5"
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
              className=" cursor-pointer absolute top-0 right-2 text-gray-600 hover:text-red-500 text-4xl font-bold"
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
              <div className="flex flex-column w-full justify-center items-start gap-10 mt-8">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5">
                  Foto Artikel
                </label>
                <div className="flex flex-col h-auto w-4/5 justify-center items-start gap-2">
                  <div className="flex w-full">
                    :
                     <img
                          src={
                            dataArtikel?.gambar_artikel
                              ? `${import.meta.env.VITE_BASE_URL}${dataArtikel?.gambar_artikel}`
                              : null
                          }
                          alt="Sampul Artikel"
                          onClick={() => openPreview(
                            `${import.meta.env.VITE_BASE_URL}${dataArtikel?.gambar_artikel}`,
                            "Sampul Artikel"
                          )}
                          className="cursor-pointer rounded-xl p-2 w-60 h-40 border-2 border-[#025F96] object-cover "
                    />
                   
                  </div>
                   <ImagePreviewModal
                isOpen={isPreviewOpen}
                imageSrc={previewImage?.src}
                imageAlt={previewImage?.alt}
                onClose={closePreview}
              />
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
              <button className="w-40 px-4 py-2 bg-[#004A76] hover:bg-[#039FFC]/70 text-white rounded-xl cursor-pointer mt-5 transition duration-200 ease-in-out"
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
              className=" cursor-pointer absolute top-0 right-2 text-gray-600 hover:text-red-500 text-4xl font-bold"
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
                    {formArtikel.gambar_artikel
                      ? formArtikel.gambar_artikel.name
                      : "Belum ada file yang dipilih"}
                  </div>

                  {/* Preview Gambar */}
                  <div className="mt-4">
                    {formArtikel.gambar_artikel ? (
                      <img
                        src={URL.createObjectURL(formArtikel.gambar_artikel)}
                        alt="Preview"
                        className="w-[200px] h-[100px] object-cover rounded-lg border border-gray-400"
                      />
                    ) : dataArtikel?.gambar_artikel ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}${dataArtikel.gambar_artikel}`}
                        alt="Sampul Lama"
                        className="w-[200px] h-[100px] object-cover rounded-lg border border-gray-400"
                      />
                    ) : null}
                  </div>
                    <button  
                      onClick={() => FormArtikel({ ...formArtikel, gambar_artikel: null })}
                      className=" px-3 py-1 border-2 rounded-xl font-sm cursor-pointer text-[#0c4a6e] hover:bg-[#004A76] hover:text-white"style={{fontFamily: 'Nunito Sans'}}>
                      Batalkan
                    </button>
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
                  className="px-4 py-2 bg-[#004A76] hover:bg-[#039FFC]/70 text-white rounded-xl cursor-pointer mt-5"
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
              className=" cursor-pointer absolute top-0 right-2 text-gray-600 hover:text-red-500 text-4xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-xl font-bold text-[#004A76] underline text-center">Detail Profil Masyarakat</h1>

            <div className="flex flex-col justify-center items-center gap-4 py-3">
              {/* <div className=" border-2 border-[#025F96] rounded-full p-12">foto</div> */}
              <div className=" rounded-full p-1 w-40 h-40 border-2 border-[#025F96] font-bold">
                 {dataMasyarakatbyId?.foto_profil_masyarakat && (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${dataMasyarakatbyId?.foto_profil_masyarakat}`}
                      alt="foto"
                      className="w-40 h-40 rounded-full object-cover"
                    />
                  )}
              </div>
              <div className=" grid grid-cols-2 gap-5 w-full text-center p-4">
                <div className=" grid grid-rows-2 gap-2 w-full text-left px-10  ">
                  <span className="text-[#025F96] font-bold underline ">Nama</span>
                  <div className="">{dataMasyarakatbyId?.nama_masyarakat || " "}</div>
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
                <div className="flex flex-col gap-2 w-full text-left px-10" >
                  <div className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Foto KTP</div>
                  <div className=" rounded-xl p-2 w-60 h-40 flex items-center justify-center ">
                      <img
                          src={
                            dataMasyarakatbyId?.foto_ktp_masyarakat
                              ? `${import.meta.env.VITE_BASE_URL}/images-be/${dataMasyarakatbyId.foto_ktp_masyarakat}`
                              : null
                          }
                          alt="foto_ktp_masyarakat"
                          onClick={() => openPreview(
                            `${import.meta.env.VITE_BASE_URL}/images-be/${dataMasyarakatbyId.foto_ktp_masyarakat}`,
                            "Foto KTP"
                          )}
                          className="cursor-pointer rounded-xl p-2 w-60 h-40 border-2 border-[#025F96] object-cover transition-transform duration-300 hover:scale-150 hover:h-full"
                      />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full text-left px-10">
                  <div className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Selfie dengan KTP</div>
                  <div className="rounded-xl p-2 w-60 h-40 flex items-center justify-center ">
                     <img
                          src={
                            dataMasyarakatbyId?.selfie_ktp_masyarakat
                              ? `${import.meta.env.VITE_BASE_URL}/images-be/${dataMasyarakatbyId.selfie_ktp_masyarakat}`
                              : null
                          }
                          alt="Selfie dengan KTP"
                          onClick={() => openPreview(
                            `${import.meta.env.VITE_BASE_URL}/images-be/${dataMasyarakatbyId.selfie_ktp_masyarakat}`,
                            "Selfie dengan KTP"
                          )}
                          className="cursor-pointer rounded-xl p-2 w-60 h-40 border-2 border-[#025F96] object-cover transition-transform duration-300 hover:scale-150 hover:h-full"
                      />
                  </div>
                </div>
              </div>
              <ImagePreviewModal
                isOpen={isPreviewOpen}
                imageSrc={previewImage?.src}
                imageAlt={previewImage?.alt}
                onClose={closePreview}
              />
            </div>
            <div className=" text-center">
              <button
                className="w-40 px-4 py-2 bg-[#004A76] hover:bg-[#039FFC]/70 text-white rounded-xl cursor-pointer mt-5 transition duration-200 ease-in-out"
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
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-3xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-xl font-bold text-[#004A76] underline text-center" >
              Edit Profil Masyarakat 
            </h1>

            <form onSubmit={handleEditSubmitMasyarakat} className="py-3">
              <div className="flex flex-col  justify-center items-center gap-4">
                <div className="w-40 h-40 rounded-full border-2 border-[#025F96] overflow-hidden flex items-center justify-center ">
                  <img
                    src={
                          dataMasyarakatbyId?.foto_profil_masyarakat
                            ? `${import.meta.env.VITE_BASE_URL}${dataMasyarakatbyId.foto_profil_masyarakat}`
                            : "/default-avatar.jpg" 
                        }
                    alt="foto_profil_masyarakat"
                    className="w-40 h-40 p-1 border-2 border-[#025F96] rounded-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 w-full text-center">
                  <div className="flex flex-col gap-2 w-full text-left px-10">
                    <label className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Nama</label>
                    <input
                      type="text"
                      name="nama"
                      defaultValue={formMasyarakat.nama}
                      className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={handleChangeMasyarakat}
                      maxLength={50}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full text-left px-10">
                    <label className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Username</label>
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
    
                  <div className="flex flex-col gap-2 w-full text-left px-10">
                    <label className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Email</label>
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
                  <div className="flex flex-col gap-2 w-full text-left px-10">
                    <label className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">NIK</label>
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
                  <div className="flex flex-col gap-2 w-full text-left px-10">
                    <label className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Alamat</label>
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
                  <div className="flex flex-col gap-2 w-full text-left px-10">
                    <label className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Nomor Telepon</label>
                    <input
                      type="text"
                      id="notlp"
                      name="notlp"
                      defaultValue={formMasyarakat.notlp}
                      className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={handleChangeMasyarakat}
                      maxLength={50}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full text-left px-10">
                    <label className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Jenis Kelamin</label>
                    <select
                      name="jeniskelamin_masyarakat"
                      id="jeniskelamin_masyarakat"
                      value={formMasyarakat.jeniskelamin_masyarakat}
                      className="bg-[#f5f5f5] text-overflow: ellipsis; text-black border border-blue-300 rounded-md px-4 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={handleChangeMasyarakat}
                      required
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 w-full text-left px-10">
                    <label className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Tanggal Lahir</label>
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
                 
                  <div className="flex flex-col gap-2 w-full text-left px-10">
                    <label className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Foto KTP</label>
                      <div className=" rounded-xl p-2 w-60 h-40 flex items-center justify-center gap-2">
                        <img
                          src={
                            dataMasyarakatbyId?.foto_ktp_masyarakat
                              ? `${import.meta.env.VITE_BASE_URL}/images-be/${dataMasyarakatbyId.foto_ktp_masyarakat}`
                              : null
                          }
                          alt="foto_ktp_masyarakat"
                          onClick={() => openPreview(
                            `${import.meta.env.VITE_BASE_URL}/images-be/${dataMasyarakatbyId.foto_ktp_masyarakat}`,
                            "Foto KTP"
                          )}
                          className="cursor-pointer rounded-xl p-2 w-60 h-40 border-2 border-[#025F96] object-cover transition-transform duration-300 hover:scale-150 hover:h-full"
                        />
                      </div>
                      
                  </div>
                  <div className="flex flex-col gap-2 w-full text-left px-10" >
                    <label className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Selfie dengan KTP</label>
                    <div className="rounded-xl p-2 w-60 h-40 flex items-center justify-center gap-2">
                       <img
                          src={
                            dataMasyarakatbyId?.selfie_ktp_masyarakat
                              ? `${import.meta.env.VITE_BASE_URL}/images-be/${dataMasyarakatbyId.selfie_ktp_masyarakat}`
                              : null
                          }
                          alt="Selfie dengan KTP"
                          onClick={() => openPreview(
                            `${import.meta.env.VITE_BASE_URL}/images-be/${dataMasyarakatbyId.selfie_ktp_masyarakat}`,
                            "Selfie dengan KTP"
                          )}
                          className="cursor-pointer rounded-xl p-2 w-60 h-40 border-2 border-[#025F96] object-cover transition-transform duration-300 hover:scale-150 hover:h-full"
                        />
                    </div>
                   
                  </div>
                </div>
                <div className=" text-center flex flex-row gap-4 mt-5 items-center">
                   <button
                        type="button" 
                        className="w-50 px-4 py-2 bg-white text-[#004A76] border-2 hover:bg-gray-600 hover:text-white rounded-xl cursor-pointer mt-5 transition duration-200 ease-in-out"
                        onClick={onClose}// Fungsi untuk handle cancel
                      >
                        Batal
                    </button>
                 
                  <button
                    className="w-50 px-4 py-2 bg-[#004A76] hover:bg-[#039FFC]/70 text-white rounded-xl cursor-pointer mt-5 transition duration-200 ease-in-out"
                    onClick={handleEditSubmitMasyarakat}
                    
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
              <ImagePreviewModal
                isOpen={isPreviewOpen}
                imageSrc={previewImage?.src}
                imageAlt={previewImage?.alt}
                onClose={closePreview}
              />
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
              className=" cursor-pointer absolute top-0 right-2 text-gray-600 hover:text-red-500 text-4xl font-bold"
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

                  <div className=" flex flex-col h-auto w-4/5 justify-center items-start gap-6">
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
                        <div className="font-light text-[14px] self-start text-lime-500">
                          {formDokter.foto_profil_dokter
                            ?  `Upload 📷 : ${formDokter.foto_profil_dokter.name}`
                            : "❌ Belum ada file yang dipilih"}
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

                    {/* Preview gambar yang dipilih */}
                    <div className="mt-4" >
                        {formDokter.foto_profil_dokter ? (
                          <img
                            src={URL.createObjectURL(formDokter.foto_profil_dokter)}
                            alt="preview"
                            className="w-[200px] h-[100px] object-cover rounded-xl border border-black"
                          />
                        ) : dataDokterbyId?.foto_profil_dokter ? ( // <-- tambahkan tanda tanya (optional chaining)
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}${dataDokterbyId?.foto_profil_dokter}`}
                            alt=""
                            className="w-[200px] h-[100px] object-cover rounded-xl border border-black"
                          />
                        ) : null}
                    </div>
                   
                  </div >
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
                    <button
                      type="button"
                      onClick={regeneratePasswordDokter}
                      className="absolute right-12 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700"
                    >
                      🔄
                    </button>
                  </div>
              
              </div>
              <div className=" text-center">
                <button 
                  type="submit" 
                  onClick={() => console.log("Tombol ditekan")}
                  className="px-4 py-2 bg-[#004A76] hover:bg-[#039FFC]/70 text-white rounded-xl cursor-pointer mt-5 transition duration-200 ease-in-out"
                >
                  Tambah Data dokter
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
              className=" cursor-pointer absolute top-0 right-2 text-gray-600 hover:text-red-500 text-4xl font-bold"
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
                      {formDokter.foto_profil_dokter && typeof formDokter.foto_profil_dokter === 'object' ? (
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}${dataDokterbyId?.foto_profil_dokter}`}
                          alt="preview"
                          className="w-[200px] h-[100px] object-cover rounded-xl border border-black"
                        />
                      ) : dataDokterbyId?.foto_profil_dokter ? ( 
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}${dataDokterbyId?.foto_profil_dokter}`}
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
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-[#004A76] hover:bg-[#039FFC]/70 text-white rounded-xl cursor-pointer mt-5 transition duration-200 ease-in-out"
                >
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
              className=" cursor-pointer absolute top-0 right-2 text-gray-600 hover:text-red-500 text-4xl font-bold"
            >
              &times;
            </button>
            <p className="text-center text-xl font-bold items-center py-2 font-[raleway] underline text-[#004A76]">
              Detail Profil Dokter
            </p>

            <div className="flex flex-col justify-center items-center gap-4 py-3">
              <div className="w-40 h-40 rounded-full border-2 border-[#025F96] overflow-hidden flex items-center justify-center">
                <img
                  src={
                    dataDokterbyId?.foto_profil_dokter
                      ? `${import.meta.env.VITE_BASE_URL}${dataDokterbyId.foto_profil_dokter}`
                      : "/default-avatar.jpg" 
                  }
                  alt="Foto Dokter"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 w-full text-center px-10 ">
                <div className="flex flex-col gap-2 w-full text-left px-10">
                  <div className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Nama</div>
                  <div>{dataDokterbyId?.nama_dokter}</div>
                </div>
                <div className="flex flex-col gap-2 w-full text-left px-10">
                  <div className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Username</div>
                  <div>{dataDokterbyId?.username_dokter}</div>
                </div>
                <div className="flex flex-col gap-2 w-full text-left px-10"> 
                  <div className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Email</div>
                  <div>{dataDokterbyId?.email_dokter}</div>
                </div>
                <div className="flex flex-col gap-2 w-full text-left px-10">
                  <div className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Rating Dokter</div>
                  <div>{dataDokterbyId?.rating_dokter}</div>
                </div>
                <div className="flex flex-col gap-2 w-full text-left px-10">
                  <div className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Bidang Dokter</div>
                  <div>{dataDokterbyId?.spesialis_dokter}</div>
                </div>
                <div className="flex flex-col gap-2 w-full text-left px-10">
                  <div className="text-[#025F96] font-bold items-start px-1 underline font-[raleway] ">Nomor Telepon</div>
                  <div>{dataDokterbyId?.notlp_dokter}</div>
                </div>
                <div className="flex flex-col gap-2 w-full text-left px-10"> 
                  <div className="text-[#025F96] font-bold items-start px-1 underline font-[raleway]">Nomor.STR Kedokteran</div>
                  <div>{dataDokterbyId?.str_dokter}</div>
                </div>
                
              </div>
              <div className=" text-center">
                <button 
                 className="w-40 px-4 py-2 bg-[#004A76] hover:bg-[#039FFC]/70 text-white rounded-xl cursor-pointer mt-5 transition duration-200 ease-in-out"
                 onClick={() => onClose(false)}
                >
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