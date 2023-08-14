<script lang="ts">
	import { card, flex, grid } from 'styled-system/patterns';
	import Card from '@components/Card.svelte';
	import type { PageData } from './$types';
	import { css } from 'styled-system/css';

	export let data: PageData;
	$: ({ brand, kombuchas } = data);
</script>

<div class={flex({ direction: 'column', gap: '4' })}>
	<div class={card({ gap: '1' })}>
		<h1 class={css({ fontSize: '3xl' })}>{brand.name}</h1>
		<div class={css({ fontSize: 'md' })}>
			{brand.city}, {brand.state}
		</div>
	</div>

	<div
		class={grid({
			columns: { base: 1, lg: 2 },
			gap: '4'
		})}
	>
		{#each kombuchas as kombucha}
			<Card {kombucha} />
		{/each}
	</div>
</div>
