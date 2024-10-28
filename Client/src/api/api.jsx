import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/', // replace with your actual API base URL
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
});

export default api;
