// Bar.jsx
import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";



function Bar({ values }) {

  const data = {
    labels: ["Masyarakat", "Artikel", "Dokter", "Konsultasi"],
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
          "rgba(54, 162, 235, 0.5)", // hijau
          "rgba(75, 192, 192, 0.5)", //kuning
          "rgba(255, 206, 86, 0.5)",// biru
          "rgba(255, 99, 132, 0.5)", // merah
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    cutout: "60%",
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "#333",
          font: { size: 12 },
          
        },
      },
    },
  };

  return (
    <div className="doughnut w-[300px] h-[300px]">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default Bar;
