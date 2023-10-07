<script lang="ts">
	import { card, grid } from 'styled-system/patterns';
	import Card from '@components/Card.svelte';

	export let data;
</script>

{#if data.justRegistered}
	<p class={card({ color: 'green.500', mb: '3' })}>
		Successfully sent! Please check your email to complete the registration.
	</p>
{/if}

<div
	class={grid({
		columns: { base: 1, lg: 3 },
		gap: '4',
		py: '5',
	})}
>
	{#each data.kombuchas as kombucha}
		<div class={card()}><Card {kombucha} /></div>
	{/each}
</div>
