import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import { Auth, Dashboard } from 'pages';
import Protected from './protected';
import { AuthContext } from 'modules/auth/context';
import { Navbar } from 'components';

const Routes: React.FC = () => {
  const { user } = React.useContext(AuthContext);
  const isAuthenticated = !!user;
  // const isAuthenticated = true;

  return (
    <Switch>
      <Route path="auth" element={<Protected allow={!isAuthenticated} to="/dashboard" />}>
        <Route path="login" element={<Auth.Login />} />
        <Route path="register" element={<Auth.Register />} />
        <Route index path="*" element={<Navigate to="/auth/login" />} />
      </Route>

      <Route path="dashboard" element={<Protected allow={isAuthenticated} to="/auth/login" />}>
        <Route
          index
          element={
            <div className="flex h-[100%]">
              <Navbar />
              <Dashboard />
            </div>
          }
        />

        <Route
          path=":serviceId"
          element={<Protected allow={isAuthenticated} to="/auth/login" element={<h1>Single Service</h1>} />}
        />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>

      <Route index path="*" element={<Navigate to="/dashboard" />} />
    </Switch>
  );
};
export default Routes;
