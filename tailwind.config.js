import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Importante para tu diseño oscuro
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                primary: "#49ec13",        // Verde Neón
                "primary-dark": "#36b00e",
                "background-light": "#f6f8f6",
                "background-dark": "#152210", // Verde Bosque Profundo
                "surface-dark": "#1e2f18",    // Tarjetas
                "border-green": "#2c4823",    // Bordes
                "text-muted": "#a0c992"       // Textos secundarios
            },
            fontFamily: {
                sans: ['Public Sans', ...defaultTheme.fontFamily.sans],
                display: ['Public Sans', 'sans-serif'],
            },
        },
    },

    plugins: [forms],
};