// Bar.jsx
import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

function Bar({ values }) {
  /* values = { masyarakat: 120, artikel: 6, dokter: 42, konsultasi: 18 } */

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
        ],                       // ←  isi dinamis
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    cutout: "70%",
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
