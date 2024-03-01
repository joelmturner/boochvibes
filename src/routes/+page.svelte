<script lang="ts">
	import { card, flex } from 'styled-system/patterns';
	import BoochGrid from '@components/BoochGrid.svelte';
	import { css } from 'styled-system/css';
	import { CldImage } from 'svelte-cloudinary';

	export let data;
</script>

<div class={flex({ direction: 'column', gap: 6 })}>
	<div class={flex({ direction: 'column', gap: 4, alignItems: 'center' })}>
		<a href="/" class={css({ textAlign: 'center' })}>
			<CldImage
				src="boochtown/ui/booch-vibes-logo_small.png"
				alt="boochvibes logo beachy scene"
				width={300}
				height={300}
			/>
		</a>

		<h1
			class={css({
				fontSize: '4xl',
				textAlign: 'center',
				fontWeight: 'bold',
				lineHeight: 1.1,
				maxW: 'md',
				color: 'textMuted',
			})}
		>
			Discover and Rate Your Favorite Kombucha Like Never Before
		</h1>
	</div>

	{#if data.justRegistered}
		<p class={card({ color: 'green.500', mb: '3' })}>
			Successfully sent! Please check your email to complete the registration.
		</p>
	{/if}

	<div class={flex({ direction: 'column', gap: 2 })}>
		<h2 class={css({ fontSize: '2xl', fontWeight: 'bold' })}>Recently Added</h2>
		<BoochGrid kombuchas={data.kombuchas} />
	</div>
</div>
