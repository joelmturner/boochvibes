<script lang="ts">
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import Image from '@components/Image.svelte';
	import Rating from './Rating.svelte';
	import type { Kombucha } from '../../app';
	import { getBrandSlug } from '$lib/utils';

	export let kombucha: Omit<Kombucha, 'description' | 'rating'> & {
		rating: {
			avg: number;
			count: number;
		};
	};
	export let onRatingClick: (() => void) | null = null;
	$: ({ avg: rating, count } = kombucha.rating);
</script>

<div
	class={flex({
		direction: 'column',
		color: 'text',
		gap: '2',
	})}
>
	<div
		class={flex({
			justifyContent: 'center',
			alignItems: 'flex-start',
		})}
	>
		<a
			href={`/brew/${kombucha.id}`}
			class={css({ w: 'full', background: 'white', borderRadius: 'md', p: '1' })}
		>
			{#if kombucha.image_url}
				<Image src={kombucha.image_url} alt={kombucha.name ?? 'kombucha'} />
			{/if}
		</a>
	</div>
	<div class={flex({ direction: 'column', gap: 0.5 })}>
		<Rating {rating} {count} size={'md'} onclick={onRatingClick} />
		<div
			class={css({
				fontSize: 'sm',
				fontWeight: 'bold',
				lineHeight: { base: 1, lg: 1.2 },
			})}
		>
			<a href={`/brew/${kombucha.id}`}>{kombucha.name}</a>
		</div>
		<div
			class={css({
				fontSize: 'xs',
				lineHeight: 'tight',
				color: 'textMuted',
			})}
		>
			<a href={`/brand/${getBrandSlug(kombucha.brand)}`}>{kombucha.brand.name}</a>
		</div>
	</div>
</div>
