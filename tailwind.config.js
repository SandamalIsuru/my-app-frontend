/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      screens: {
        xxs: '540px',
        // => @media (min-width: 540px) { ... }
        sm: '640px',
        // => @media (min-width: 640px) { ... }
        md: '768px',
        // => @media (min-width: 768px) { ... }
        lg: '1024px',
        // => @media (min-width: 1024px) { ... }
        xl: '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        primary: 'var(--theme-primary)',
        secondary: 'var(--theme-secondary)',
        textPrimary: 'var(--theme-text-primary)',
        textSecondary: 'var(--theme-text-secondary)',
      },
      fontFamily: {
        inter: ['Inter'],
      },
      fontSize: {
        sm: '12px',
        base: '14px',
        md: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      fontWeight: {
        thin: '100',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      lineHeight: {
        tight: '12px',
        snug: '16px',
        normal: '20px',
        relaxed: '24px',
        loose: '28px',
        xloose: '36px',
      },
      animation: {
        fade: 'fadeOut .9s ease-in-out',
      },
      keyframes: (theme) => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.red.300') },
          '100%': { backgroundColor: theme('colors.transparent') },
        },
      }),
    },
  },
  plugins: [],
};
