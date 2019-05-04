import axios from 'axios'

export const clientAxios = axios.create({
  withCredentials: true
});

export const serverAxios = req => axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    cookie: req.header.cookie || ''
  }
});
