<script lang="ts">
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import Rating from './Rating.svelte';
	import Image from './Image.svelte';
	import type { Review } from '../../app';

	export let review: Review;

	let reviewHeight = 0;
	let reviewExpanded = false;

	$: hideReview = !reviewExpanded && reviewHeight > 100;
</script>

<div class={flex({ direction: 'column', gap: '2', alignItems: 'flex-start' })}>
	<div class={flex({ gap: '3' })}>
		<Image
			src={review.user.profile_url}
			alt={`profile pic for ${review.user.username}`}
			className={css({ rounded: 'full', w: '12', h: '12' })}
			width={40}
			height={40}
		/>
		<div
			class={flex({
				gap: '0',
				alignItems: 'flex-start',
				direction: 'column',
				lg: {
					gap: '3',
					alignItems: 'center',
					flexDirection: 'row',
				},
			})}
		>
			<h2 class={css({ fontSize: { base: 'md', lg: 'xl' }, fontWeight: 'bold' })}>
				{review.user.username}
			</h2>
			<Rating rating={review.rating} />
		</div>
	</div>
	<div
		bind:clientHeight={reviewHeight}
		class={css({
			fontSize: { base: 'md', lg: 'xl' },
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
				background: 'linear-gradient(transparent, gray.200)',
				display: hideReview ? 'block' : 'none',
			},
		})}
	>
		{review.review}
	</div>
	{#if !reviewExpanded && hideReview}
		<button
			class={css({ color: 'gray.500', mx: 'auto' })}
			on:click={() => (reviewExpanded = !reviewExpanded)}>See more</button
		>
	{/if}
</div>
