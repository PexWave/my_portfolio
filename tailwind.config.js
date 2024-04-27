const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import(tailwindcss').Config */

export const content = [
    "./index.html",
    "./src/**/*.{html,js,jsx}"
];
export const theme = {
colors: {
    ...colors,
    'primary': '#EDDBC7',
    'secondary': '#09022b',
    'tertiary': '#F9F5E7',
    'quaternary': 'rgb(212, 50, 185)',
    'lightbeige':'#FAF0E6',
    },
extend: {},
};
export const plugins = [
    
]; 

