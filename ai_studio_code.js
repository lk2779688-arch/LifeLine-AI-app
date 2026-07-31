module.exports = {
  theme: {
    extend: {
      colors: {
        lifeline: {
          navy: '#1D3557',    // Professional/Medical
          red: '#E63946',     // Emergency/SOS
          mint: '#81C784',    // Healthy/Stable
          sky: '#457B9D',     // Primary Actions
          sand: '#F1FAEE'     // Backgrounds
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};