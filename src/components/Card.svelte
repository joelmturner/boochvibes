<script lang="ts">
	import { css } from 'styled-system/css';
	import { card, flex } from 'styled-system/patterns';
	import Image from '@components/Image.svelte';
	import Rating from './Rating.svelte';
	import { getRatingCounts } from '$lib';

	export let kombucha: any;
	$: rating = getRatingCounts(kombucha.reviews).avg;
	$: count = getRatingCounts(kombucha.reviews).ratingCount;
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
		<Image src={kombucha.attributes[0].image_url} alt={kombucha.name} />
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
				{kombucha.attributes[0].brand}
			</div>
			<div
				class={css({
					fontSize: '2xl',
					fontWeight: 'bold',
					lineHeight: 1,
					mb: '1'
				})}
			>
				<a href={`/brew/${kombucha.id}`}>{kombucha.name}</a>
			</div>
			<Rating {rating} {count} />
			<div class={css({ letterSpacing: 'wide', mt: '2' })}>
				{kombucha.attributes[0].description}
			</div>
		</div>
	</div>
</div>
