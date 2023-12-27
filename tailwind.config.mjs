/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'brand-pink': 'rgb(255,144,232)',
				'brand-yellow': 'rgb(255,201,0)',
			}
		},
	},
	plugins: [],
}
