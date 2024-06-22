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
    'primary': '#fff',
    'secondary': '#8DECB4',
    'tertiary': '#1cd45f',
    'quaternary': '#5C8D89',
    'dull-gray': '#efeded',
    'primary-dark': '#56597e',
    'semi-dark': '#585555',
    'secondary-dark': '#6a6767',
    'secondary-light': '#A7D7C5',
    'txt':'#555',
    },
extend: {},
};
export const plugins = [
    
]; 

