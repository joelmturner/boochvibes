<script lang="ts">
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import ReviewEdit from '@components/ReviewEdit.svelte';
	import Card from '@components/Card.svelte';

	export let data;
	const kombucha = data.kombucha[0];
	console.log('data', data);
</script>

<div class={flex({ direction: 'column', gap: '6' })}>
	<Card {kombucha} />
	{#if data.reviewedSuccess}
		<div class={css({ color: 'green.500' })}>Review added!</div>
	{:else if !data.userHasReviewed}
		<ReviewEdit kombuchaId={kombucha.id} />
	{/if}
</div>
