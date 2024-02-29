<script lang="ts">
	import { flex } from 'styled-system/patterns';
	import Review from '@components/Review.svelte';

	export let reviews: any[];
	function getFilteredReviews(reviews: any[]) {
		return reviews.filter((review) => !!review.review);
	}
</script>

{#if getFilteredReviews(reviews)?.length > 0}
	<div class={flex({ direction: 'column', gap: { base: '5', lg: '7' } })}>
		{#each getFilteredReviews(reviews) as review}
			<Review {review} />
		{/each}
	</div>
{/if}
