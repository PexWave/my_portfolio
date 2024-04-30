import axios from 'axios';
const BASE_URL = 'https://f3f2-58-71-15-5.ngrok-free.app/';


export const baseAxios = axios.create({
    baseURL: BASE_URL,

});

