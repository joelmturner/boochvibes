<script lang="ts">
	import { css } from 'styled-system/css';
	import { CldImage } from 'svelte-cloudinary';

	export let src: string;
	export let alt: string;
</script>

<CldImage
	width="400"
	height="400"
	{src}
	{alt}
	class={css({ borderRadius: 'md' })}
	sizes="40vw"
	objectFit="contain"
/>
