<script lang="ts">
	import { card } from 'styled-system/patterns';
	import BoochGrid from '@components/BoochGrid.svelte';

	export let data;
</script>

{#if data.justRegistered}
	<p class={card({ color: 'green.500', mb: '3' })}>
		Successfully sent! Please check your email to complete the registration.
	</p>
{/if}

<BoochGrid kombuchas={data.kombuchas} />
