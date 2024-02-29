<script lang="ts">
	import { card, flex, grid, hero } from 'styled-system/patterns';
	import Card from '@components/Card.svelte';
	import type { PageData } from './$types';
	import { css } from 'styled-system/css';

	export let data: PageData;
	$: ({ brand, kombuchas } = data);
</script>

<svelte:head>
	<title>{`${brand.name} | BoochVibes`}</title>
	<meta
		name="description"
		content={`Rate kombuchas from ${brand.name} and see what others think!`}
	/>
</svelte:head>

<div class={flex({ direction: 'column', gap: '4' })}>
	<div class={hero({ gap: '1' })}>
		<h1 class={css({ fontSize: '3xl' })}>{brand.name}</h1>
		<div class={css({ fontSize: 'md' })}>
			{brand.city}, {brand.state}
		</div>
		{#if brand.url}
			<a
				href={brand.url}
				class={css({ fontSize: 'md', color: 'textMuted', textDecoration: 'underline' })}
				target="_blank"
				rel="noopener noreferrer">{`Visit ${brand.name}`}</a
			>
		{/if}
	</div>

	<div
		class={grid({
			columns: { base: 1, lg: 2 },
			gap: '4',
			pb: '4',
		})}
	>
		{#each kombuchas as kombucha}
			<div class={card()}><Card {kombucha} /></div>
		{/each}
	</div>
</div>
