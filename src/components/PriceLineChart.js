import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { sub } from 'date-fns';
import Tabs from './Tabs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, TimeScale);

const PriceLineChart = () => {
  const chartRef = useRef(null);
  const [timeRange, setTimeRange] = useState('ALL');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/price-data')
      .then(response => {
        const loadedData = response.data.map(d => ({
          time: new Date(d.Date),
          price: +d.Price
        }));
        setData(loadedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filterData = (range) => {
    const now = new Date();
    switch (range) {
      case '1W':
        return data.filter(datapoint => datapoint.time > sub(now, { weeks: 1 }));
      case '1M':
        return data.filter(datapoint => datapoint.time > sub(now, { months: 1 }));
      case '3M':
        return data.filter(datapoint => datapoint.time > sub(now, { months: 3 }));
      case '6M':
        return data.filter(datapoint => datapoint.time > sub(now, { months: 6 }));
      case '1Y':
        return data.filter(datapoint => datapoint.time > sub(now, { years: 1 }));
      case 'ALL':
      default:
        return data;
    }
  };

  const transformedData = filterData(timeRange).map(datapoint => ({
    x: datapoint.time,
    y: datapoint.price
  }));

  const dataFinal = {
    datasets: [
      {
        label: 'Price',
        data: transformedData.map(datapoint => ({ x: datapoint.x.getTime(), y: datapoint.y })),
        borderColor: '#5475d8',
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(84, 117, 216, 1)');
          gradient.addColorStop(1, 'rgba(84, 117, 216, 0)');
          return gradient;
        },
        fill: true,
        tension: 0,
        borderWidth: 1.8,
        pointRadius: 0
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
    <div style={{ height: '450px', width: '100%', overflowY: 'auto', paddingBottom: '100px' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
        Price Line Chart
      </div>

      <div style={{ marginBottom: '30px' }}>
        <Tabs
          list={['1W', '1M', '3M', '6M', '1Y', 'ALL']}
          value={timeRange}
          onChange={(newRange) => setTimeRange(newRange)}
        />
      </div>

      <Line data={dataFinal} options={options} ref={chartRef} />

      <div style={{ height: '50px' }}></div>
    </div>
  );
};

export default PriceLineChart;
