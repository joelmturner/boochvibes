<script lang="ts">
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import Rating from './Rating.svelte';

	export let review: any;

	let reviewHeight = 0;
	let reviewExpanded = false;

	$: hideReview = !reviewExpanded && reviewHeight > 100;
</script>

<div class={flex({ gap: '3', alignItems: 'flex-start' })}>
	<img
		src={review.user.profile_url}
		alt={`profile pic for ${review.user.username}`}
		class={css({ rounded: 'full', w: '12', h: '12' })}
	/>
	<div class={flex({ direction: 'column', gap: '3' })}>
		<div
			class={flex({
				gap: '1',
				alignItems: 'flex-start',
				direction: 'column',
				lg: {
					gap: '3',
					alignItems: 'center',
					flexDirection: 'row'
				}
			})}
		>
			<h2 class={css({ fontSize: '2xl', fontWeight: 'bold' })}>{review.user.username}</h2>
			<Rating rating={review.user.rating} />
		</div>
		<div
			bind:clientHeight={reviewHeight}
			class={css({
				fontSize: 'xl',
				whiteSpace: 'pre-line',
				maxHeight: !hideReview ? undefined : '28',
				overflow: 'hidden',
				position: 'relative',
				_after: {
					content: '""',
					position: 'absolute',
					bottom: '0',
					right: '0',
					width: '100%',
					height: '12',
					background: 'linear-gradient(transparent, white)',
					display: hideReview ? 'block' : 'none'
				}
			})}
		>
			{review.review}
		</div>
		{#if !reviewExpanded && hideReview}
			<button class={css({ color: 'gray.500' })} on:click={() => (reviewExpanded = !reviewExpanded)}
				>See more</button
			>
		{/if}
	</div>
</div>
