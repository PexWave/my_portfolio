import axios from 'axios';
const BASE_URL = 'https://my-portfolio-x0jq.onrender.com/';



export const baseAxios = axios.create({
    baseURL: BASE_URL,

});

