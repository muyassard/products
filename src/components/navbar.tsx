import { Button } from 'antd';
import { MainContext } from 'main';
import React from 'react';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = props => {
  const { user } = React.useContext(MainContext);
  return (
    <nav className="box-border flex w-full items-center justify-between bg-blue-200 px-6 py-2">
      <Button href="#home">Docs App</Button>
      <h2 className="!m-0 !p-0 font-bold">{user?.firstName || '--'}</h2>
    </nav>
  );
};

export default Navbar;
