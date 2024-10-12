import React from 'react';
import { Radio } from 'antd';

const Tabs = ({ list, value, onChange }) => {
  return (
    <div>
      <Radio.Group
        value={value}  
        onChange={(e) => onChange(e.target.value)}  
        buttonStyle="solid"
      >
        {list.map((tab) => (
          <Radio.Button
            key={tab}
            value={tab}
            style={{ width: 'auto', margin: '0 8px' }}
          >
            {tab}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};

export default Tabs;
