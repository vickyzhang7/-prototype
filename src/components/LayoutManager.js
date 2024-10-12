import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const LayoutManager = ({ children }) => {
  const breakpoints = { lg: 1200, md: 900, sm: 600, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 };

  const layouts = {
    lg: [
      { i: 'table', x: 0, y: 0, w: 6, h: 10 },
      { i: 'chart', x: 6, y: 0, w: 6, h: 10 },
      { i: 'lineChart', x: 0, y: 1, w: 12, h: 10 }  
    ],
    md: [
      { i: 'table', x: 0, y: 0, w: 6, h: 10 },
      { i: 'chart', x: 6, y: 0, w: 6, h: 10 },
      { i: 'lineChart', x: 0, y: 1, w: 12, h: 10 }
    ],
    sm: [
      { i: 'table', x: 0, y: 0, w: 6, h: 10 },
      { i: 'chart', x: 0, y: 1, w: 6, h: 10 },
      { i: 'lineChart', x: 0, y: 2, w: 6, h: 10 }
    ],
    xs: [
      { i: 'table', x: 0, y: 0, w: 4, h: 10 },
      { i: 'chart', x: 0, y: 1, w: 4, h: 10 },
      { i: 'lineChart', x: 0, y: 2, w: 4, h: 10 }
    ],
    xxs: [
      { i: 'table', x: 0, y: 0, w: 2, h: 10 },
      { i: 'chart', x: 0, y: 1, w: 2, h: 10 },
      { i: 'lineChart', x: 0, y: 2, w: 2, h: 10 }
    ]
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={breakpoints}
      cols={cols}
      rowHeight={30}
      margin={[20, 20]}
      width={1200}
    >
      <div key="table" data-grid={{ i: 'table', x: 0, y: 0, w: 6, h: 10 }}>
        {children[0]}
      </div>
      <div key="chart" data-grid={{ i: 'chart', x: 6, y: 0, w: 6, h: 10 }}>
        {children[1]}
      </div>
      <div key="lineChart" data-grid={{ i: 'lineChart', x: 0, y: 1, w: 12, h: 10 }}>
        {children[2]}
      </div>
    </ResponsiveGridLayout>
  );
};

export default LayoutManager;
