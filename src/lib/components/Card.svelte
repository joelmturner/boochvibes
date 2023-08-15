<script lang="ts">
	import { css } from 'styled-system/css';
	import { card, flex } from 'styled-system/patterns';
	import Image from '@components/Image.svelte';
	import Rating from './Rating.svelte';
	import type { Kombucha } from '../../app';

	export let kombucha: Kombucha;
	$: ({ avg: rating, count } = kombucha.rating);
</script>

<div class={card({ size: 'md' })}>
	<div
		class={flex({
			bg: 'white',
			w: 'full',
			py: '2',
			justifyContent: 'center',
			alignItems: 'center'
		})}
	>
		<a href={`/brew/${kombucha.id}`}><Image src={kombucha.image_url} alt={kombucha.name} /></a>
	</div>
	<div
		class={flex({
			direction: 'column',
			color: 'gray.800',
			gap: '2'
		})}
	>
		<div class={flex({ direction: 'column' })}>
			<div
				class={css({
					fontSize: 'md'
				})}
			>
				<a href={`/brand/${kombucha.brand.id}`}>{kombucha.brand.name}</a>
			</div>
			<div
				class={css({
					fontSize: 'xl',
					fontWeight: 'bold',
					lineHeight: 1,
					mb: '1'
				})}
			>
				<a href={`/brew/${kombucha.id}`}>{kombucha.name}</a>
			</div>
			<Rating {rating} {count} />
			{#if kombucha.description}
				<div class={css({ letterSpacing: 'wide', mt: '2' })}>
					{kombucha.description}
				</div>
			{/if}
		</div>
	</div>
</div>
