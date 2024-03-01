<script lang="ts">
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns/flex';
	import RatingComponent from './Rating.svelte';
	import Progress from './Progress.svelte';
	import type { Rating } from '../../app';

	export let rating: Rating;
	const total = Object.values(rating.starCounts).reduce((acc, curr) => acc + curr, 0);
</script>

<div class={flex({ mx: 'auto', direction: 'column', gap: '2' })}>
	<div
		class={css({
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			fontSize: '3xl',
			fontWeight: 'bold',
			textAlign: 'center',
			bg: 'backgroundMuted',
			rounded: 'full',
			aspectRatio: '1/1',
			w: '16',
			mx: 'auto',
			hideBelow: 'md',
		})}
	>
		{rating.avg}
	</div>
	<div>
		<RatingComponent rating={rating.avg} count={rating.count} size="lg" />
		<div class={css({ fontSize: 'xl', hideBelow: 'md' })}>based on {rating.count} reviews</div>
	</div>
</div>
<div
	class={flex({
		width: 'full',
		direction: 'column',
		gap: 0,
		fontSize: 'md',
		mx: 'auto',
		hideBelow: 'md',
	})}
>
	{#each Object.keys(rating.starCounts).reverse() as starCountKey}
		<div class={flex({ alignItems: 'center', gap: '2' })}>
			{starCountKey}
			<Progress val={rating.starCounts[starCountKey]} {total} />
		</div>
	{/each}
</div>
