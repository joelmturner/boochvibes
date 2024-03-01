<script lang="ts">
	import { css } from 'styled-system/css';
	import { card, flex, grid } from 'styled-system/patterns';
	import Image from '@components/Image.svelte';
	import Rating from './Rating.svelte';
	import type { Kombucha } from '../../app';
	import { getBrandSlug, slugify } from '$lib/utils';

	export let kombucha: Kombucha;
	export let highlight: boolean = false;
	export let onRatingClick: (() => void) | null = null;
	$: ({ avg: rating, count } = kombucha.rating);
</script>

<div class={grid({ gap: '1', columns: 3 })}>
	<div
		class={flex({
			direction: 'column',
			color: 'text',
			gridColumn: 'span 2',
		})}
	>
		<div
			class={css({
				fontSize: { base: '2xl', lg: highlight ? '4xl' : '2xl' },
				fontWeight: 'bold',
				lineHeight: { base: 1, lg: 1.2 },
			})}
		>
			<a href={`/brand/${getBrandSlug(kombucha.brand)}/${slugify(kombucha.name)}`}
				>{kombucha.name}</a
			>
		</div>
		<div
			class={css({
				fontSize: { base: 'md', lg: highlight ? 'xl' : 'md' },
				color: 'textMuted',
			})}
		>
			<a href={`/brand/${getBrandSlug(kombucha.brand)}`}>{kombucha.brand.name}</a>
		</div>
		<Rating {rating} {count} size={highlight ? 'lg' : 'md'} onclick={onRatingClick} />
		{#if kombucha.description}
			<div class={css({ letterSpacing: 'wide', mt: '2', fontSize: 'md' })}>
				{kombucha.description}
			</div>
		{/if}
	</div>

	<div
		class={flex({
			justifyContent: 'center',
			alignItems: 'flex-start',
		})}
	>
		<a
			href={`/brand/${getBrandSlug(kombucha.brand)}/${slugify(kombucha.name)}`}
			class={css({ w: 'full', background: 'white', borderRadius: 'md', p: '1' })}
		>
			<Image src={kombucha.image_url} alt={kombucha.name ?? 'kombucha'} />
		</a>
	</div>
</div>
