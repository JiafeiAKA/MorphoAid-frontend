import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
const token = user?.accessToken;

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
});

export default instance;
