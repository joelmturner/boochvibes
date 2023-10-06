<script lang="ts">
	import { css } from 'styled-system/css';
	import { card, flex } from 'styled-system/patterns';
	import ReviewEdit from '@components/ReviewEdit.svelte';
	import Card from '@components/Card.svelte';
	import Reviews from '@components/Reviews.svelte';
	import RatingDetailed from '@components/RatingDetailed.svelte';

	let detailedRatingsOpen = false;

	export let data;

	$: ({ kombucha } = data);
	function handleCloseRatings() {
		detailedRatingsOpen = false;
	}
</script>

<div class={flex({ direction: 'column', gap: '6' })}>
	{#if detailedRatingsOpen}
		<div class={card({ size: 'md' })}>
			<svg
				on:click|preventDefault={handleCloseRatings}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class={css({ w: '4', h: '4' })}
				on:keydown={(event) => {
					if (handleCloseRatings && ['Enter', ' '].includes(event.key)) {
						handleCloseRatings();
					}
				}}
				role="button"
				tabindex="0"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
				/>
			</svg>
			<RatingDetailed rating={kombucha.rating} />
		</div>
	{:else}
		<Card {kombucha} highlight onRatingClick={() => (detailedRatingsOpen = true)} />
	{/if}

	{#if data.reviewedSuccess}
		<div class={css({ color: 'green.500' })}>Review added!</div>
	{:else if !data.userHasReviewed && data.isLoggedIn}
		<ReviewEdit kombuchaId={kombucha.id} />
	{/if}

	{#if (kombucha?.reviews?.length ?? 0) > 0}
		<Reviews reviews={kombucha.reviews} />
	{/if}
</div>
