import React from 'react';
import { Button } from 'antd';
import { MainContext } from 'main';
import { Navbar } from 'components';

const Dashboard: React.FC = () => {
  const { logout } = React.useContext(MainContext);
  
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start gap-2 p-4 px-6">
        Hello Dashboard
        <Button onClick={logout}>Log out</Button>
      </div>
    </>
  );
};

export default Dashboard;
