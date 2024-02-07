import { Button } from 'antd';
import { AuthContext } from 'modules/auth/context';
import React, { useContext } from 'react';
import { FaInbox } from 'react-icons/fa';

import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const { user } = React.useContext(AuthContext);
  return (
    <div className="box-border flex w-52  flex-col   justify-between gap-5 bg-white px-6 py-2">
      <nav className="flex flex-col gap-5">
        <h2 className="!m-0 !p-0 font-bold">{user?.firstName || '--'}</h2>
        <Button href="#home">Docs App</Button>
        <NavLink to="/shops" className="item-center flex gap-5 rounded-lg p-1 pl-3 text-[#666] hover:bg-blue-300">
          <div className="icon relative top-1">
            <FaInbox />
          </div>
          <div className="">Shop</div>
        </NavLink>
      </nav>
      <Button onClick={logout}>Log out</Button>
    </div>
  );
};

export default Navbar;
