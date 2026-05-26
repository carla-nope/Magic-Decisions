/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['Nunito', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
				display: ['Quicksand', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// Warm cream palette
				cream: {
					50:  '#FEFCF8',
					100: '#FAF6F0',
					200: '#F5EEE6',
					300: '#E5DDD1',
					400: '#D8CEC0',
				},
				// Deep ink text
				ink: {
					600: '#2D3748',
					700: '#1F2937',
					800: '#1A1A2E',
					900: '#111827',
				},
				// Primary — goldenrod (warm amber)
				primary: {
					DEFAULT: '#E8B931',
					50:  '#FDF8E8',
					100: '#FBF0C4',
					200: '#F7E28B',
					300: '#F5D67A',
					400: '#E8B931',  // goldenrod
					500: '#D4A017',  // goldenrod dark
					600: '#B8860B',
					700: '#9A6E0A',
					foreground: '#1A1A2E',
				},
				// Secondary — faded teal
				secondary: {
					DEFAULT: '#5BA5A5',
					50:  '#E8F4F4',
					100: '#C8E4E4',
					200: '#A7D7D7',
					300: '#7FC4C4',
					400: '#5BA5A5',
					500: '#3D8888',
					600: '#2F6B6B',
					foreground: '#1A1A2E',
				},
				// Highlight — soft coral
				highlight: {
					DEFAULT: '#F09080',
					50:  '#FDF5F3',
					100: '#FBE8E4',
					200: '#FBD5D0',
					300: '#F8B4AD',
					400: '#F09080',
					500: '#E87268',
					foreground: '#1A1A2E',
				},
				accent: {
					DEFAULT: '#E8B931',
					foreground: '#1A1A2E',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				DEFAULT: '0.75rem',
				lg: '1rem',
				xl: '1.5rem',
				'2xl': '2rem',
				'3xl': '3rem',
				sm: 'calc(var(--radius) - 4px)',
				md: 'calc(var(--radius) - 2px)',
			},
			boxShadow: {
				'warm':     '0 4px 24px rgba(154, 130, 80, 0.12)',
				'warm-md':  '0 8px 32px rgba(154, 130, 80, 0.16)',
				'warm-lg':  '0 16px 48px rgba(154, 130, 80, 0.20)',
				'warm-gold': '0 4px 20px rgba(232, 185, 49, 0.25)',
				'warm-teal': '0 4px 20px rgba(91, 165, 165, 0.25)',
				'warm-coral': '0 4px 20px rgba(240, 144, 128, 0.25)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'warm-spin': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-8px) rotate(1deg)' },
				},
				'sparkle-burst': {
					'0%': { transform: 'scale(0) rotate(0deg)', opacity: 1 },
					'100%': { transform: 'scale(1.5) rotate(180deg)', opacity: 0 },
				},
				'gentle-bounce': {
					'0%': { transform: 'scale(0.85)', opacity: 0 },
					'50%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)', opacity: 1 },
				},
				'fade-up': {
					'0%': { transform: 'translateY(12px)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 },
				},
				'slide-right': {
					'0%': { transform: 'translateX(-12px)', opacity: 0 },
					'100%': { transform: 'translateX(0)', opacity: 1 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'warm-spin': 'warm-spin 5s ease-in-out infinite',
				'sparkle-burst': 'sparkle-burst 0.6s ease-out forwards',
				'gentle-bounce': 'gentle-bounce 0.5s ease-out',
				'fade-up': 'fade-up 0.4s ease-out',
				'slide-right': 'slide-right 0.3s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}