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
    'primary': '#352F44',
    'secondary': '#59595a',
    'tertiary': '#B9B4C7',
    'quaternary': '#FAF0E6',
    },
extend: {},
};
export const plugins = [
    
]; 

