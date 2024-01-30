import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import { Auth, Dashboard } from 'pages';
import Protected from './protected';
import { MainContext } from 'main';

const Routes: React.FC = () => {
  const { user } = React.useContext(MainContext);
  const isAuthenticated = !!user;

  return (
    <Switch>
      <Route path="auth" element={<Protected allow={!isAuthenticated} to="/dashboard" />}>
        <Route path="login" element={<Auth.Login />} />
        <Route path="register" element={<Auth.Register />} />
        <Route index path="*" element={<Navigate to="/auth/login" />} />
      </Route>

      <Route path="dashboard" element={<Protected allow={isAuthenticated} to="/auth/login" />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>

      <Route index path="*" element={<Navigate to="/auth/login" />} />
    </Switch>
  );
};
export default Routes;
