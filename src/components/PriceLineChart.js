import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, TimeScale);

const PriceLineChart = () => {
  const chartRef = useRef(null);


  const dummyData = [
    { time: new Date(2024, 5, 1), price: 100 },
    { time: new Date(2024, 5, 2), price: 105 },
    { time: new Date(2024, 5, 3), price: 110 },
    { time: new Date(2024, 5, 4), price: 95 },
    { time: new Date(2024, 5, 5), price: 100 }
  ];


  const transformedData = dummyData.map((datapoint) => ({
    x: datapoint.time,
    y: datapoint.price
  }));


  const dataFinal = {
    datasets: [
      {
        label: 'Price',
        data: transformedData.map((datapoint) => ({ x: datapoint.x.getTime(), y: datapoint.y })),
        borderColor: '#5475d8',
        backgroundColor: 'rgba(84, 117, 216, 0.5)',
        fill: true,
        tension: 0,
        borderWidth: 1.8,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        ticks: {
          color: '#48484880',
          maxTicksLimit: 8
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: '#48484880',
          callback: function (value) {
            return '$' + value.toLocaleString();
          }
        },
        grid: {
          display: true
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y}`;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line data={dataFinal} options={options} ref={chartRef} />
    </div>
  );
};

export default PriceLineChart;
