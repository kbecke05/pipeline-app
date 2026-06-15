/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        status: {
          wishlist:     '#6366f1',
          applied:      '#3b82f6',
          phone_screen: '#f59e0b',
          interview:    '#8b5cf6',
          offer:        '#10b981',
          rejected:     '#ef4444',
          withdrawn:    '#6b7280',
        },
      },
    },
  },
  plugins: [],
}
