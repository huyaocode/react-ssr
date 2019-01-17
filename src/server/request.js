import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8899'
});

export default instance;