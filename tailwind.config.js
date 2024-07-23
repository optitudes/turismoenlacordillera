import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        colors: {
            'salmon':'#d59688',
            'redwinee':'#520120',
            'aquadark':'#217976',
            'mediumseagreen':'#3cb371',
            'springgreen':'#00ff7f',
        }
        }
    },

    plugins: [forms],
};
