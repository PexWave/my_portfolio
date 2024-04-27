import axios from 'axios';
const BASE_URL = 'https://sarhanasakil.site/';


export const baseAxios = axios.create({
    baseURL: BASE_URL
});

