import axios from 'axios'

export const clientAxios = axios.create({
  withCredentials: true
});

export const serverAxios = req => axios.create({
  baseURL: 'http://localhost:' + process.env.port,
  headers: {
    cookie: req.header.cookie || ''
  }
});
