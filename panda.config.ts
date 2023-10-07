import { defineGlobalStyles } from '@pandacss/dev';
import { defineConfig } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
	'html, body': {
		bg: 'gray.200',
	},
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
		extend: {},
	},

	// The output directory for your css system
	outdir: 'styled-system',

	globalCss,

	patterns: {
		extend: {
			hero: {
				description: 'A basic hero',
				properties: {
					// sizing to adjust padding and gap
					size: { type: 'enum', value: ['sm', 'md', 'lg'] },
				},
				transform(props) {
					const { size = 'md', ...rest } = props;
					const SIZE_VS_PADDING = {
						sm: '2',
						md: '4',
						lg: '6',
					};
					return {
						display: 'flex',
						flexDirection: 'column',
						gap: SIZE_VS_PADDING[size],
						padding: SIZE_VS_PADDING[size],
						roundedBottom: 'xl',
						overflow: 'hidden',
						bg: 'white',
						shadow: 'lg',
						...rest,
					};
				},
			},
			card: {
				description: 'A basic card',
				properties: {
					// sizing to adjust padding and gap
					size: { type: 'enum', value: ['sm', 'md', 'lg'] },
				},
				transform(props) {
					const { size = 'md', ...rest } = props;
					const SIZE_VS_PADDING = {
						sm: '2',
						md: '4',
						lg: '6',
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
                        maxW: '90%',
                        mx: 'auto',
                        w: '100%',
                        lg: {
                            maxW: '100%',
                        },
						...rest,
					};
				},
			},
			input: {
				description: 'input and textarea styles',
				properties: {
					// sizing to adjust padding and gap
					multiline: { type: 'boolean' },
					error: { type: 'boolean' },
				},
				transform(props) {
					const { size, multiline = false, error = false, ...rest } = props;

					return {
						rounded: 'xl',
						borderWidth: '1px',
						borderStyle: 'solid',
						borderColor: error ? 'red.500' : 'gray.400',
						minHeight: multiline ? '36' : '12',
						py: '3',
						px: '4',
						lineHeight: 'relaxed',
						resize: 'vertical',
						flexShrink: '1',
						color: 'gray.800',
						...rest,
					};
				},
			},
			btn: {
				description: 'CTA button',
				properties: {
					// sizing to adjust padding and gap
					variant: { type: 'enum', value: ['primary', 'secondary'] },
					size: { type: 'enum', value: ['sm', 'md', 'lg'] },
				},
				transform(props) {
					const { size = 'md', variant = 'primary', ...rest } = props;

					const VARIANT_VS_STYLES = {
						primary: {
							bg: 'primary',
							borderColor: 'gray.400',
							color: 'gray.800',
						},
						secondary: {
							bg: 'transparent',
							borderColor: 'gray.400',
							color: 'gray.800',
						},
					};

					const SIZE_VS_STYLES = {
						sm: { w: '2xs' },
						md: { w: '1/2' },
						lg: { w: 'full' },
					};

					return {
						rounded: 'xl',
						borderWidth: '1px',
						borderStyle: 'solid',
						minHeight: '12',
						py: '3',
						px: '4',
						flexShrink: '1',
						...SIZE_VS_STYLES[size],
						...VARIANT_VS_STYLES[variant],
						...rest,
					};
				},
			},
		},
	},
});
