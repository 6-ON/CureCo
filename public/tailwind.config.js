/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["../views/**/*.{html,php,js}"],
    darkMode: "class",
    theme: {
        extend: {
            animation: {
                'shake': 'shake 500ms ease-in-out'
            },
            keyframes: {
                'shake': {
                    '10%, 90%': {transform: 'translate3d(-1px, 0, 0)'},
                    '20%, 80%': {transform: 'translate3d(2px, 0, 0)'},
                    '30%, 50%, 70%': {transform: 'translate3d(-4px, 0, 0)'},
                    '40%, 60%': {transform: ' translate3d(4px, 0, 0)'}
                }
            }

        },
    },
    plugins: [],
}