<script lang="ts">
	import { card } from 'styled-system/patterns';
	import Review from '@components/Review.svelte';

	export let reviews: any[];
</script>

<div class={card({ size: 'md', gap: '8' })}>
	{#each reviews as review}
		<Review {review} />
	{/each}
</div>
