import axios from 'axios';
const BASE_URL = 'http://sarhanasakil.site/';


export const baseAxios = axios.create({
    baseURL: BASE_URL
});

