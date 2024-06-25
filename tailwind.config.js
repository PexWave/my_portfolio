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
    'primary': '#F9F9FA',
    'secondary': '#1BB467',
    'tertiary': '#EBF8F2',
    'dull-gray': '#919EAB',
    'primary-dark': '#212B36',

    },
extend: {},
};
export const plugins = [
    
]; 

