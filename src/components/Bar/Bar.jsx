// Bar.jsx
import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";



function Bar({ values,className }) {
  

  const data = {
    labels: [
      `Konsultasi (${values?.konsultasi ?? 0})`, 
      `Artikel (${values?.artikel ?? 0})`, 
      `Dokter (${values?.dokter ?? 0})`, 
      `Masyarakat (${values?.masyarakat ?? 0})`
    ],
    datasets: [
      {
        label: "Statistik",
        data: [
          values?.konsultasi ?? 0,
          values?.artikel ?? 0,
          values?.dokter ?? 0,
          values?.masyarakat ?? 0,
        ],                       
        backgroundColor: [
          "#FD809B", // pink untuk Konsultasi
          "#FDD576", // kuning untuk Artikel  
          "#5CB3ED", // biru muda untuk Dokter
          "#4CD7D7", // tosca untuk Masyarakat
        ],
        borderColor: [
         "#FD809B", // pink untuk Konsultasi
          "#FDD576", // kuning untuk Artikel  
          "#5CB3ED", // biru muda untuk Dokter
          "#4CD7D7", // tosca untuk Masyarakat
        ],
        borderWidth: 0,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    cutout: "50%",
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          color: "#333",
          font: { size: 13 },
          boxWidth: 20,
          boxHeight: 20,
          padding: 20,
          usePointStyle: true,

          
        },
      },
    },
  };

  return (
    <div className={className}>
      <Doughnut data={data} options={options}  />
    </div>
  );
}

export default Bar;
