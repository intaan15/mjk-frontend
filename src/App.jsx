import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import "./App.css";
import Layout from "./pages/MainLayout/Layout";
import Splashscreen from "./pages/root/Splashscreen";
import Loginakun from "./pages/root/Loginakun";
import Dashboard from "./pages/Dashboard/Dashboard";
import Artikel from "./pages/Artikel/Artikel";
import Konsultasi from "./pages/Konsultasi/Konsultasi";
import Dokter from "./pages/Dokter/Dokter";
import Jadwal from "./pages/Dokter/Jadwal";
import DataMasyarakat from "./pages/Masyarakat/DataMasyarakat";
import Verifikasi from "./pages/Masyarakat/Verifikasi";
import Modal from "./components/Modal/Modal";
import PrivateRoute from "./components/Privateroutes";
import Outtabel from "./components/Table/Outtabel";
import Mal from "../src/pages/Dashboard/mal";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splashscreen />} />
        <Route path="/login" element={<Loginakun />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/mal" element={<Mal />} />
        

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboardadmin" element={<Dashboard />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/konsultasi" element={<Konsultasi />} />
          <Route path="/dokter/datadokter" element={<Dokter />} />
          <Route path="/dokter/jadwal" element={<Jadwal />} /> 
          <Route path="/masyarakat/data" element={<DataMasyarakat />} />
          <Route path="/masyarakat/verifikasi" element={<Verifikasi />} />
          <Route path="/outable" element={<Outtabel/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
