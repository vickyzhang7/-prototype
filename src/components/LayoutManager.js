import React from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const LayoutManager = ({ children }) => {
  const layout = [
    { i: 'table', x: 0, y: 0, w: 6, h: 10 },
    { i: 'chart', x: 6, y: 0, w: 6, h: 10 }
  ];

  return (
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
      <div key="table">{children[0]}</div>
      <div key="chart">{children[1]}</div>
    </GridLayout>
  );
};

export default LayoutManager;
