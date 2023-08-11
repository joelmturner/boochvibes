import { defineGlobalStyles } from '@pandacss/dev';
import { defineConfig } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
	'html, body': {
		bg: 'sky.700'
	}
});

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ['./src/**/*.{js,ts,svelte}'],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {}
	},

	// The output directory for your css system
	outdir: 'styled-system',

	globalCss
});
