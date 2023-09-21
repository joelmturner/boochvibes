<script lang="ts">
	import { css } from 'styled-system/css';
	import { card, flex, grid } from 'styled-system/patterns';
	import Image from '@components/Image.svelte';
	import Rating from './Rating.svelte';
	import type { Kombucha } from '../../app';

	export let kombucha: Kombucha;
	export let highlight: boolean = false;
	$: ({ avg: rating, count } = kombucha.rating);
</script>

<div class={card({ size: 'md' })}>
	<div class={grid({ gap: '1', columns: 3 })}>
		<div
			class={flex({
				direction: 'column',
				color: 'gray.800',
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
				<a href={`/brew/${kombucha.id}`}>{kombucha.name}</a>
			</div>
			<div
				class={css({
					fontSize: { base: 'md', lg: highlight ? 'xl' : 'md' },
					color: 'gray.500',
				})}
			>
				<a href={`/brand/${kombucha.brand.id}`}>{kombucha.brand.name}</a>
			</div>
			<Rating {rating} {count} size={highlight ? 'lg' : 'md'} />
			{#if kombucha.description}
				<div class={css({ letterSpacing: 'wide', mt: '2', fontSize: 'md' })}>
					{kombucha.description}
				</div>
			{/if}
		</div>

		<div
			class={flex({
				bg: 'white',
				py: '2',
				justifyContent: 'center',
				alignItems: 'flex-start',
			})}
		>
			<a href={`/brew/${kombucha.id}`} class={css({ w: 'full' })}
				><Image src={kombucha.image_url} alt={kombucha.name} /></a
			>
		</div>
	</div>
</div>
