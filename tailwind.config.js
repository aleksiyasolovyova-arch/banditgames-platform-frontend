/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#6d8bc2',
                    'primary-hover': '#334d8a',
                    'primary-dark': '#2943af',
                    secondary: '#6b7280',
                    'secondary-hover': '#4b5563',
                    accent: '#10b981',
                    'accent-hover': '#059669',
                },
                status: {
                    success: '#10b981',
                    'success-light': '#d1fae5',
                    warning: '#f59e0b',
                    'warning-light': '#fef3c7',
                    danger: '#ef4444',
                    'danger-light': '#fee2e2',
                    info: '#3b82f6',
                    'info-light': '#dbeafe',
                },
                background: {
                    primary: '#111827',
                    secondary: '#1f2937',
                    tertiary: '#374151',
                },
                game: {
                    dark: '#0f172a',
                    card: '#1e293b',
                    hover: '#334155',
                    border: '#475569',
                },
            },
        },
    },
    plugins: [],
}
