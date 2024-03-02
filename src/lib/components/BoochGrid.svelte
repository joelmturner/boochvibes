<script lang="ts">
	import { grid } from 'styled-system/patterns';
	import type { Kombucha } from '../../app';
	import BoochCard from './BoochCard.svelte';

	export let kombuchas: Array<
		Omit<Kombucha, 'description' | 'rating'> & {
			rating: {
				avg: number;
				count: number;
			};
		}
	>;
</script>

<div
	class={grid({
		columns: { base: 3, lg: 5 },
		gap: '4',
		py: '4',
	})}
>
	{#each kombuchas as kombucha}
		<BoochCard {kombucha} />
	{/each}
</div>
