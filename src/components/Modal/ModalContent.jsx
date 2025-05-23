import React from "react";
import axios from "axios";
import useArtikel from "../_hooks/useArtikel";
import useMasyarakat from "../_hooks/useMasyarakat";
import useDokter from "../_hooks/useDokter";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";  
import { IoCalendarOutline } from "react-icons/io5";


export default function ModalContent({ 
  modalType, 
  onClose, 
  dataArtikel,
  token,
  idArtikel,
  dataMasyarakatbyId,
  idMasyarakat,
  dataDokterbyId,
  idDokter,}) 



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
   } = useArtikel({idArtikel, token,dataArtikel, onClose});

   const data = dataMasyarakatbyId;
   console.log("Data di masyarakat:", data);

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
    handleEditSubmit: handleEditSubmitDokter,
    handleFileChange: handleFileChangeDokter,
    handleSubmit:handleSubmitDokter,
  } = useDokter({idDokter, token,dataDokterbyId, onClose});

   

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
            <h1 className="text-2xl font-bold text-[#004A76] underline">Edit Data Artikel</h1>

            <form
              onSubmit={handleEditSubmitArtikel}
              className="flex flex-col gap-6 mt-4"
            >
              {/* Judul */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="judul"
                  className="block w-1/5 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Judul
                </label>
                <textarea
                  id="judul"
                  name="judul"
                  rows="1"
                  className="w-4/5 p-2 border rounded"
                  placeholder="judul artikel"
                  value={formArtikel.judul}
                  onChange={handleChangeArtikel}
                  required
                />
              </div>

              {/* Tanggal Terbit */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="tanggalTerbit"
                  className="block w-1/5 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Tanggal Terbit
                </label>
                <input
                  type="date"
                  id="tanggalTerbit"
                  name="tanggalTerbit"
                  value={formArtikel.tanggalTerbit}
                  onChange={handleChangeArtikel}
                  className="w-4/5 p-2 border rounded"
                  required
                />
              </div>

              {/* Foto Artikel */}
              <div className="flex items-start gap-4">
                <label
                  htmlFor="dropzone-file"
                  className="block w-1/5 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Foto Artikel
                </label>
                <div className="flex flex-col w-4/5 gap-2">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-30 hover:bg-gray-100 dark:bg-white dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-white"
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
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
                  className="block w-1/5 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Kategori
                </label>
                <select
                  id="kategori"
                  name="kategori"
                  value={formArtikel.kategori}
                  onChange={handleChangeArtikel}
                  className="w-4/5 p-2 border rounded"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  <option value="kesehatan">Kesehatan</option>
                  <option value="obat">Obat</option>
                </select>
              </div>

              {/* Deskripsi */}
              <div className="flex items-start gap-4">
                <label
                  htmlFor="deskripsi"
                  className="block w-1/5 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  rows="4"
                  className="w-4/5 p-2 border rounded"
                  placeholder="Deskripsi artikel"
                  value={formArtikel.deskripsi}
                  onChange={handleChangeArtikel}
                  required
                />
              </div>

              {/* Tombol Submit */}
              <div className="text-center mt-5">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-200 rounded-xl cursor-pointer"
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
                <label className="block mb-2 font-extrabold font-medium text-gray-900 dark:text-black w-1/5" style={{fontFamily: 'Nunito Sans'}}>
                  Judul
                </label>
                <div className="w-4/5">
                  <div className="flex items-center w-full" style={{fontFamily: 'Nunito Sans'}}>
                    : {dataArtikel?.nama_artikel || "-"}
                  </div>
                </div>
              </div>

              <div className="flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
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
              </div>

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
                <div className="w-4/5">
                  <div className="flex items-center w-full">
                    : {dataArtikel?.detail_artikel || "-"}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="px-4 py-2 bg-red-200 rounded-xl cursor-pointer mt-5">
                Save change
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
                  className="block p-2.5 w-4/5 text-sm  italic text-gray-900 bg-gray-30 rounded-md border border-gray-300 focus:ring-[#004A76]"
                  placeholder="Masukkan Judul Artikel"
                  value={formArtikel.judul}
                  onChange={handleChangeArtikel}
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <label
                  htmlFor="foto"
                  className="w-1/5 font-medium text-gray-900 dark:text-black  style={{ font-family: 'Nunito Sans' }}"
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
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
                  onChange={handleChangeArtikel}
                  required
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Obat">Obat</option>
                </select>
              </div>

              <div className="flex items-start gap-4">
                <label
                  htmlFor="deskripsi"
                  className="w-1/5 font-medium text-gray-900 dark:text-black"
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  rows={4}
                  className="block p-2.5 w-4/5 text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Deskripsi artikel"
                  value={formArtikel.deskripsi}
                  onChange={handleChangeArtikel}
                  required
                />
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
            <h1 className="text-2xl font-bold">Detail Profil Masyarakat</h1>

            <div className="flex flex-col justify-center items-center gap-4 w-full">
              <div className="bg-red-500 rounded-full p-12">foto</div>
              <div className="grid grid-cols-2 gap-4 w-full text-center">
                <div>
                  <div className="text-[#025F96] font-bold underline">Nama</div>
                  <div>{dataMasyarakatbyId?.nama_masyarakat || " "}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">User</div>
                  <div>{dataMasyarakatbyId?.username_masyarakat || " "}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Email</div>
                  <div>{dataMasyarakatbyId?.email_masyarakat || " "}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">NIK</div>
                  <div>{dataMasyarakatbyId?.nik_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Alamat</div>
                  <div>{dataMasyarakatbyId?.alamat_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Nomor Telepon</div>
                  <div>{dataMasyarakatbyId?.notlp_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Jenis Kelamin</div>
                  <div>{dataMasyarakatbyId?.jeniskelamin_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Tanggal Lahir</div>
                  <div>{dataMasyarakatbyId?.tgl_lahir_masyarakat?.slice(0, 10)}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Foto KTP</div>
                  <div className=" bg-orange-200 h-50 rounded-xl">
                      <img
                        src={dataMasyarakatbyId?.foto_ktp_masyarakat}
                        alt="Foto KTP"
                        className="object-cover w-40 h-40 mx-auto"
                      />
                  </div>
                </div>
                <div>
                  <div className="text-[#025F96]">Selfie dengan KTP</div>
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
                        id="username"
                        name="username"
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
                        id="username"
                        name="username"
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
            <h1 className="text-2xl font-bold">Tambah Data Dokter</h1>
            <div className=" flex-1 flex-row">
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Nama
                </label>
                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full h-12 text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column w-full justify-center items-start gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Foto Profil
                </label>

                <div className=" flex flex-col h-auto w-4/5 justify-center items-start gap-2">
                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-30  dark:bg-white hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-white"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" class="hidden" />
                    </label>
                  </div>

                  <button className=" px-4 py-2 border-2 border-gray-200 rounded-xl cursor-pointer text-[#0c4a6e] hover:bg-[#004A76] hover:text-white">
                    Cancel
                  </button>
                </div>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Spesialis
                </label>

                <form class="w-4/5">
                  <label
                    for="Spesialis"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  ></label>
                  <select
                    id="Spesialis"
                    class="bg-gray-30 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Buka Spesialis</option>
                    <option>Jantung</option>
                    <option>Mata</option>
                    <option>Mata</option>
                    <option>Mata</option>
                    <option>Mata</option>
                    <option>Mata</option>
                  </select>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Email
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  No. Handphone
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  No. STR
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Username
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Password
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
            </div>
            <div className=" text-center">
              <button className="px-4 py-2 bg-[#004A76] text-white rounded-xl cursor-pointer mt-5">
                Tambah Data
              </button>
            </div>
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
            <div className=" flex-1 flex-row">
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Nama
                </label>
                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full h-12 text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column w-full justify-center items-start gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Foto Profil
                </label>

                <div className=" flex flex-col h-auto w-4/5 justify-center items-start gap-2">
                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-30  dark:bg-white hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-white"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" class="hidden" />
                    </label>
                  </div>

                  <button className=" px-4 py-2 border-2 border-gray-200 rounded-xl cursor-pointer text-[#0c4a6e] hover:bg-[#004A76] hover:text-white">
                    Cancel
                  </button>
                </div>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Spesialis
                </label>

                <form class="w-4/5">
                  <label
                    for="Spesialis"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  ></label>
                  <select
                    id="Spesialis"
                    class="bg-gray-30 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Buka Spesialis</option>
                    <option>Jantung</option>
                    <option>Mata</option>
                    <option>Mata</option>
                    <option>Mata</option>
                    <option>Mata</option>
                    <option>Mata</option>
                  </select>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Email
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  No. Handphone
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  No. STR
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Username
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Password
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-30 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
            </div>
            <div className=" text-center">
              <button className="px-4 py-2 bg-[#004A76] text-white rounded-xl cursor-pointer mt-5">
                Tambah Data
              </button>
            </div>
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
              <div className="bg-red-200 rounded-full p-12">foto</div>
              <div className="grid grid-cols-2 gap-4 w-full text-center">
                <div>
                  <div className="text-[#025F96]">Nama</div>
                  <div>{dataDokterbyId?.nama_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Username</div>
                  <div>{dataDokterbyId?.username_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Email</div>
                  <div>{dataDokterbyId?.email_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">NIK</div>
                  <div>{dataDokterbyId?.nik_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Bidang Dokter</div>
                  <div>{dataDokterbyId?.spesialis_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Nomor Telepon</div>
                  <div>{dataDokterbyId?.notlp_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Tanggal Lahir</div>
                  <div>{dataDokterbyId?.username_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Nomor.STR Kedokteran</div>
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