import { Button, Tag } from 'antd';
import { DashboardContext } from 'modules/dashboard/context';
import React from 'react';

const Counter: React.FC = () => {
  const { count, increment } = React.useContext(DashboardContext);
  
  return (
    <div className="flex gap-2">
      <Tag className="grid place-items-center">{count}</Tag>
      <Button onClick={increment}>Increment</Button>
    </div>
  );
};

export default Counter;
