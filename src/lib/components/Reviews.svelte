<script lang="ts">
	import { card } from 'styled-system/patterns';
	import Review from '@components/Review.svelte';

	export let reviews: any[];
	function getFilteredReviews(reviews: any[]) {
		return reviews.filter((review) => !!review.review);
	}
</script>

{#if getFilteredReviews(reviews)?.length > 0}
	<div class={card({ size: 'md', gap: '8' })}>
		{#each getFilteredReviews(reviews) as review}
			<Review {review} />
		{/each}
	</div>
{/if}
