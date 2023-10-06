<script lang="ts">
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns/flex';
	import RatingComponent from './Rating.svelte';
	import Progress from './Progress.svelte';
	import type { Rating } from '../../app';

	export let rating: Rating;
</script>

<div class={flex({ maxW: 's', mx: 'auto', direction: 'column', gap: '2' })}>
	<div class={css({ fontSize: '5xl', fontWeight: 'bold', textAlign: 'center' })}>
		{rating.avg}
	</div>
	<div>
		<RatingComponent rating={rating.avg} count={rating.count} size="lg" />
		<div>based on {rating.count} reviews</div>
	</div>
</div>
<div
	class={flex({
		width: { base: 'full', md: '1/2' },
		direction: 'column',
		gap: 0,
		fontSize: 'xs',
		mx: 'auto',
	})}
>
	{#each Object.keys(rating.starCounts).reverse() as starCountKey}
		<div class={flex({ alignItems: 'center', gap: '2' })}>
			{starCountKey}
			<Progress val={rating.starCounts[starCountKey]} />
		</div>
	{/each}
</div>
