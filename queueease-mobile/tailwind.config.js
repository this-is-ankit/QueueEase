module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './index.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#10B981',
        danger: '#EF4444',
        cardBg: '#F9FAFB',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
      }
    },
  },
  plugins: [],
};
