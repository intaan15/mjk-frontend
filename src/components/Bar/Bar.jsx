import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

function Bar() {
  const data = {
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
        borderRadius: 5 // opsional, hanya berlaku di beberapa chart
      }
    ]
  };

  return (
    <div className='doughnut w-[120px]'>
      <Doughnut data={data} />
    </div>
  );
}

export default Bar;
