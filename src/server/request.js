import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8520/assert'
});

export default instance;