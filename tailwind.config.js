/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/*.{js,jsx,ts,tsx}',
        './components/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            screens: {
                xs: '420px',
            },
            colors: {
                offGray: '#9A9ABE',
            },
        },
    },
    fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
    },
    plugins: [],
};
