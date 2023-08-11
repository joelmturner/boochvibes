<script lang="ts">
	import { grid } from 'styled-system/patterns';
	import Card from '@components/Card.svelte';

	export let data;
	console.log('data', data);
	console.log('data.kombucha', data.kombucha);
</script>

<div
	class={grid({
		columns: { base: 1, lg: 3 },
		gap: '4'
	})}
>
	{#each data.kombucha as kombucha}
		<Card {kombucha} />
	{/each}
</div>
