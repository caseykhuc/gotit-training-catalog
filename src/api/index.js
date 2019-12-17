import { baseURL } from './config';

export const request = (path, options = {}) => fetch(`${baseURL}${path}`, { ...options, mode: 'no-cors' });
