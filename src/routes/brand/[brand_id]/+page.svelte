<script lang="ts">
	import { flex } from 'styled-system/patterns';
	import type { PageData } from './$types';
	import { css } from 'styled-system/css';
	import BoochGrid from '@components/BoochGrid.svelte';

	export let data: PageData;
	$: ({ brand, kombuchas } = data);
</script>

<svelte:head>
	<title>{`${brand.name} | BoochVibes`}</title>
	<meta
		name="description"
		content={`Rate kombuchas from ${brand.name} and see what others think!`}
	/>
</svelte:head>

<div class={flex({ direction: 'column', gap: '4' })}>
	<div class={flex({ gap: '1', direction: 'column', justifyContent: 'center' })}>
		<h1 class={css({ fontSize: '5xl', textAlign: 'center', lineHeight: 'tight' })}>{brand.name}</h1>
		<div class={flex({ direction: 'column', justifyContent: 'center', lineHeight: 'tight' })}>
			<div class={css({ fontSize: 'md', textAlign: 'center' })}>
				{brand.city}, {brand.state}
			</div>
			{#if brand.url}
				<a
					href={brand.url}
					class={css({
						fontSize: 'md',
						color: 'textMuted',
						textDecoration: 'underline',
						textAlign: 'center',
					})}
					target="_blank"
					rel="noopener noreferrer">{`Visit ${brand.name}`}</a
				>
			{/if}
		</div>
	</div>

	<BoochGrid {kombuchas} />
</div>
