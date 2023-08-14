<script lang="ts">
	import { css } from 'styled-system/css';
	import { card, grid } from 'styled-system/patterns';
	import Card from '@components/Card.svelte';

	export let data;
</script>

{#if data.justRegistered}
	<p class={card({ color: 'green.500', mb: '3' })}>
		Successfully sent! Please check your email to complete the registration.
	</p>
{/if}

<h1 class={css({ fontSize: '3xl', color: 'white', mb: '4' })}>Howdy {data.username}!</h1>
<div
	class={grid({
		columns: { base: 1, lg: 3 },
		gap: '4'
	})}
>
	{#each data.kombuchas as kombucha}
		<Card {kombucha} />
	{/each}
</div>
