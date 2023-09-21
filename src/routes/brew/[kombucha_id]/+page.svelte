<script lang="ts">
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import ReviewEdit from '@components/ReviewEdit.svelte';
	import Card from '@components/Card.svelte';
	import Reviews from '@components/Reviews.svelte';

	export let data;
	$: ({ kombucha } = data);
</script>

<div class={flex({ direction: 'column', gap: '6' })}>
	<Card {kombucha} highlight />
	{#if data.reviewedSuccess}
		<div class={css({ color: 'green.500' })}>Review added!</div>
	{:else if !data.userHasReviewed && data.isLoggedIn}
		<ReviewEdit kombuchaId={kombucha.id} />
	{/if}
	{#if (kombucha?.reviews?.length ?? 0) > 0}
		<Reviews reviews={kombucha.reviews} />
	{/if}
</div>
