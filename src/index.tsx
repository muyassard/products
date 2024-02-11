import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Containers } from 'modules/auth';
import Routes from 'routes';

import 'assets/styles/tailwind.css';
import axios from 'axios';

axios.interceptors.request.use(req => {
  console.log(req);
  return req;
});

const root = createRoot(document.getElementById('root')!);

root.render(
  <BrowserRouter>
    <Containers.Auth>
      <Routes />
    </Containers.Auth>
  </BrowserRouter>
);
