import React from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

interface ProtectedProps {
  allow: boolean;
  to: To;
  element?: JSX.Element;
}

const Protected: React.FC<ProtectedProps> = ({ allow, to, element }) => {
  if (allow) return element || <Outlet />;

  return <Navigate to={to} />;
};

export default Protected;