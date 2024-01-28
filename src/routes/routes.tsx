import { Auth } from 'pages';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

const Routes: React.FC = () => (
  <Switch>
    <Route path="auth">
      <Route path="login" element={<Auth.Login />} />
      <Route path="register" element={<Auth.Register />} />
      <Route index path="*" element={<Navigate to="/auth/login" />} />
    </Route>
    <Route path="shops" element={<h1>Shops Page</h1>} />
    <Route path="products" element={<h1>Products Page</h1>} />

    <Route index path="*" element={<Navigate to="/auth/login" />} />
  </Switch>
);

export default Routes;
