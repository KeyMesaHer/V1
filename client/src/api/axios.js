import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5505/api', //api url
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
}})

export default instance

