/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
            }
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "dark", "cupcake"],
    },
};