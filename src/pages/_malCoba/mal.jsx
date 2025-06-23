// komponen  react
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';

const Mal = async (loginData) => {
  try {
    // Contoh: panggil API login dan dapat token
    const response = await axios.get("https://mjk-backend-production.up.railway.app/api/admin/getall", loginData);
    const token = response.data.token;
    // console.log(token)

    // Simpan token ke localStorage
    localStorage.setItem("token", token);

    // Decode token untuk ambil data user (misal username)
    const decoded = jwt_decode(token);

    if (decoded.username) {
      // Simpan data user ke Redux
      dispatch(setUser({ username: decoded.username }));
    }
    
    // Bisa lanjut ke step lain, misal redirect atau update UI
  } catch (error) {
    console.error("Login gagal:", error);
    // Tampilkan error ke user kalau perlu
  }
};
// console.log(Mal)

export default Mal