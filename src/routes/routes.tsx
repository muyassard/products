import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import { Auth, Dashboard } from 'pages';
import Protected from './protected';
import { session } from 'services';

const Routes: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(!!session.get());

  const refresh = () => {
    setIsAuthenticated(!!session.get());
  };

  return (
    <Switch>
      <Route path="auth" element={<Protected allow={!isAuthenticated} to="/dashboard" />}>
        <Route path="login" element={<Auth.Login refresh={refresh} />} />
        <Route path="register" element={<Auth.Register />} />
        <Route index path="*" element={<Navigate to="/auth/login" />} />
      </Route>

      <Route path="dashboard" element={<Protected allow={isAuthenticated} to="/auth" />}>
        <Route index element={<Dashboard refresh={refresh} />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
      
      <Route index path="*" element={<Navigate to="/auth/login" />} />
    </Switch>
  );
};
export default Routes;
