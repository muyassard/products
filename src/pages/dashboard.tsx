import React from 'react';
import Navbar from 'components/navbar';
import { DashboardContext } from 'modules/dashboard/context';
import Counter2 from 'components/counter-2';

interface DashboardProps {
  refresh(): void;
}

const Dashboard: React.FC<DashboardProps> = ({ refresh }) => {
  const [count, setCount] = React.useState(1);

  return (
    <DashboardContext.Provider value={{ count, increment: () => setCount(c => c + 1) }}>
      <div className="flex flex-col gap-2">
        <Navbar />
        <div className="container mx-auto bg-blue-200 p-2">
          <Counter2 />
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
