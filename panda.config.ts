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

	globalCss,

	patterns: {
		extend: {
			card: {
				description: 'A basic card',
				properties: {
					// sizing to adjust padding and gap
					size: { type: 'enum', value: ['sm', 'md', 'lg'] }
				},
				transform(props) {
					const { size = 'md', ...rest } = props;
					const SIZE_VS_PADDING = {
						sm: '2',
						md: '4',
						lg: '6'
					};
					return {
						display: 'flex',
						flexDirection: 'column',
						gap: SIZE_VS_PADDING[size],
						padding: SIZE_VS_PADDING[size],
						rounded: 'xl',
						overflow: 'hidden',
						bg: 'white',
						shadow: 'lg',
						...rest
					};
				}
			},
			input: {
				description: 'input and textarea styles',
				properties: {
					// sizing to adjust padding and gap
					multiline: { type: 'boolean' }
				},
				transform(props) {
					const { size, multiline = false, ...rest } = props;

					return {
						rounded: 'xl',
						borderWidth: '1px',
						borderStyle: 'solid',
						borderColor: 'gray.400',
						minHeight: multiline ? '36' : '12',
						py: '3',
						px: '4',
						lineHeight: 'relaxed',
						resize: 'vertical',
						flexShrink: '1',
						color: 'gray.800',
						...rest
					};
				}
			}
		}
	}
});
