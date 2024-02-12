import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Segmented } from 'antd';
import { AuthContext } from 'modules/auth/context';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = React.useContext(AuthContext);

  return (
    <nav className="box-border flex w-full items-center justify-between  px-6 py-2">
      <div className=""></div>
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
      <h2 className="!m-0 !p-0 font-bold">{user?.firstName || '--'}</h2>
    </nav>
  );
};

export default Navbar;
