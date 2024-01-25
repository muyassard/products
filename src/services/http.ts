import axios from 'axios';

export const http = axios.create({ baseURL: 'http://10.10.2.146:4000/api' });
