import React from 'react';
import { Segmented } from 'antd';
import { AuthContext } from 'modules/auth/context';

import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user } = React.useContext(AuthContext);
  return (
    <div className=" flex    justify-between gap-5 bg-white px-6 py-3">
      <nav className="box-border flex w-full items-center justify-center  px-6 py-2">
        <Segmented
          size="large"
          value={pathname}
          onChange={path => navigate(path as string)}
          options={[
            { label: 'Dashboard', value: '/app/dashboard' },
            { label: 'Shops', value: '/app/shops' },
            { label: 'Purchases', value: '/app/purchases' },
            { label: 'Payouts', value: '/app/payouts' }
          ]}
        />
      </nav>
      <h2 className="!m-0 !p-0 font-bold">{user?.firstName || '--'}</h2>
    </div>
  );
};

export default Navbar;
