// Bar.jsx
import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";



function Bar({ values }) {

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
          values?.masyarakat ?? 0,
          values?.artikel ?? 0,
          values?.dokter ?? 0,
          values?.konsultasi ?? 0,
        ],                       
        backgroundColor: [
          "#FD809B", // pink untuk Konsultasi
          "#FDD576", // kuning untuk Artikel  
          "#5CB3ED", // biru muda untuk Dokter
          "#4CD7D7", // tosca untuk Masyarakat
        ],
        borderColor: [
          "#FF6B9D",
          "#FFD93D", 
          "#4ECDC4",
          "#45B7D1",
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
        position: "right",
        labels: {
          color: "#333",
          font: { size: 15 },
          
        },
      },
    },
  };

  return (
    <div className="doughnut w-md">
      <Doughnut data={data} options={options}  />
    </div>
  );
}

export default Bar;
