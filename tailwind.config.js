/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  images: {
    domains: ['upload.wikimedia.org', 'flagcdn.com'],
  },
  theme: {
    extend: {
      screens: {
        xs: '375px',
      },
      colors: {
        'primary-color': 'var(--primary-color)',
        'primary-text': 'var(--primary-text)',
        'primary-light': 'var(--primary-light)',
        'secondary-text-gray': 'var(--secondary-text-gray)',
        'primary-color-blue': 'var(--primary-color-blue)',
        'light-green': 'var(--light-green)',
        'light-paid':'var(--light-paid)',
        'light-pending':'var(--light-pending)',
        'light-red':'var(--light-red)',
        
        blue: '#316E9D',
        black: '#000000',
        white: '#FFFFFF',
        red: '#C9311A',
        // gray: '#969696',
        green: '#41BA37',
        error: '#ff2400',
        'light-gray': '#E3E3E3',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      backgroundImage: {
        'primary-gradient': 'var(--primary-gradient)',
      },

      fontSize: {
        h1: ['var(--h1)'],
        h2: ['var(--h2)'],
        h3: ['var(--h3)'],
        h4: ['var(--h4)'],
        h5: ['var(--h5)'],
        h6: ['var(--h6)'],
        xl: ['var(--xl)'],
        lg: ['var(--lg)'],
        md: ['var(--md)'],
        sm: ['var(--sm)'],
      },
      maxWidth: {
        'super-container': '3840px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
