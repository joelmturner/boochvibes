<script lang="ts">
	import { css, cx } from 'styled-system/css';
	import { CldImage } from 'svelte-cloudinary';

	export let src: string;
	export let alt: string;
	export let className: string;
</script>

<CldImage
	width="400"
	height="400"
	{src}
	{alt}
	class={cx(css({ borderRadius: 'md' }), className)}
	sizes="40vw"
	objectFit="contain"
	crop="thumb"
	gravity="center"
/>
