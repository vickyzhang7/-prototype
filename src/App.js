import React, { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import BarChart from './components/BarChart';
import LayoutManager from './components/LayoutManager';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fakeData = [
      { name: 'Item A', value: 30 },
      { name: 'Item B', value: 20 },
      { name: 'Item C', value: 50 },
      { name: 'Item D', value: 40 }
    ];
    setData(fakeData);
  }, []);

  return (
    <div className="App">
      <h1>React Looker & BigQuery Project</h1>
      <LayoutManager>
        <DataTable data={data} />
        <BarChart data={data} />
      </LayoutManager>
    </div>
  );
}

export default App;
