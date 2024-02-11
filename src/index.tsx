import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Containers } from 'modules/auth';
import Routes from 'routes';

import 'assets/styles/tailwind.css';
import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    // Modify the request configuration or add headers
    config.headers.Authorization = `Bearer `;
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
const root = createRoot(document.getElementById('root')!);

root.render(
  <BrowserRouter>
    <Containers.Auth>
      <Routes />
    </Containers.Auth>
  </BrowserRouter>
);
