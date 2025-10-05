/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                avenir: ['Avenir', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
            fontSize: {
                'page-title': ['45px', { lineHeight: '1.2' }],
                'product-title': ['14px', { lineHeight: '1.4' }],
                'price': ['45px', { lineHeight: '1.1' }],
                'metal-type': ['15px', { lineHeight: '1.5' }],
                'popularity': ['15px', { lineHeight: '1.5' }],
            },
            colors: {
                'gold-yellow': '#E6CA97',
                'gold-white': '#D9D9D9',
                'gold-rose': '#E1A4A9',
            }
        },
    },
    plugins: [],
}