/** @type {import('tailwindcss').Config} */
module.exports = {

    darkMode: 'class',

    content: [
        './assets/**/*.{vue,js,css}',
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        "./plugins/**/*.{js,ts}",
    ],

    theme: {
        extend: {
            colors: {
                "dark-500": "#121212",
                "dark-400": "#1E1E1E",
                "primary-500": "#BB86FC",
                "light-500": "#E2E2E2",
            },
        }
    },
    
    plugins: [

    ],
}

