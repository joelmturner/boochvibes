<script lang="ts">
	import { css, cx } from 'styled-system/css';
	import { CldImage } from 'svelte-cloudinary';

	export let src: string;
	export let alt: string;
	export let className: string | undefined = undefined;
	export let width: number = 400;
	export let height: number = 400;
</script>

<CldImage
	{width}
	{height}
	{src}
	{alt}
	class={cx(css({ borderRadius: 'md' }), className)}
	sizes="40vw"
	objectFit="contain"
	crop="thumb"
	gravity="center"
/>
