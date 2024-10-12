import React from 'react';
import GridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


const ResponsiveGridLayout = WidthProvider(Responsive);

const LayoutManager = ({ children }) => {
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  

  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  
  const layouts = {
    lg: [
      { i: 'table', x: 0, y: 0, w: 6, h: 10 },
      { i: 'chart', x: 6, y: 0, w: 6, h: 10 }
    ],
    md: [
      { i: 'table', x: 0, y: 0, w: 10, h: 10 },
      { i: 'chart', x: 0, y: 1, w: 10, h: 10 }
    ],
    sm: [
      { i: 'table', x: 0, y: 0, w: 6, h: 10 },
      { i: 'chart', x: 0, y: 1, w: 6, h: 10 }
    ],
    xs: [
      { i: 'table', x: 0, y: 0, w: 4, h: 10 },
      { i: 'chart', x: 0, y: 1, w: 4, h: 10 }
    ],
    xxs: [
      { i: 'table', x: 0, y: 0, w: 2, h: 10 },
      { i: 'chart', x: 0, y: 1, w: 2, h: 10 }
    ]
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={breakpoints}
      cols={cols}
      rowHeight={30}
      width={1200}
    >
      <div key="table">{children[0]}</div>
      <div key="chart">{children[1]}</div>
    </ResponsiveGridLayout>
  );
};

export default LayoutManager;
