import { defineGlobalStyles } from '@pandacss/dev';
import { defineConfig } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
	'html, body': {
		bg: 'background',
		color: 'text',
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
		semanticTokens: {
            colors: {
                background: {
                    value: {base: '{colors.gray.800}', _light: '{colors.gray.200}'},
                },
                backgroundStrong: {
                    value: {base: '{colors.gray.900}', _light: 'white'},
                },
                backgroundMuted: {
                    value: {base: '{colors.gray.700}', _light: '{colors.gray.100}'},
                },
                text: {
                    value: {base: '{colors.gray.100}', _light: '{colors.gray.900}'},
                },
                textMuted: {
                    value: {base: '{colors.gray.400}', _light: '{colors.gray.600}'},
                },
                textInverse: {
                    value: {base: '{colors.gray.900}', _light: '{colors.gray.100}'},
                }
            }
        }
	},

	// The output directory for your css system
	outdir: 'styled-system',

	globalCss,

    conditions: {
        extend: {
            dark: '.dark &, [data-theme="dark"] &',
            light: '.light &, [data-theme="light"] &',
        }
    },

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
						bg: 'backgroundStrong',
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
						bg: {base: 'slate.900', _light: 'white'},
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
						color: 'text',
                        bg: 'backgroundMuted',
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
							color: 'text',
						},
						secondary: {
							bg: 'transparent',
							borderColor: 'gray.400',
							color: 'text',
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
