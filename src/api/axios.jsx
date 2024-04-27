import axios from 'axios';
const BASE_URL = 'https://www.sarhanasakil.site/';


export const baseAxios = axios.create({
    baseURL: BASE_URL
});

