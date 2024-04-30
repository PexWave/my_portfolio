import axios from 'axios';
const BASE_URL = 'https://5e85-58-69-90-10.ngrok-free.app/';


export const baseAxios = axios.create({
    baseURL: BASE_URL,

});

