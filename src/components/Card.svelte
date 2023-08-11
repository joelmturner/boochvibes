<script lang="ts">
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import Image from '@components/Image.svelte';
	import Rating from './Rating.svelte';
	import { getRatingCounts } from '$lib';

	export let kombucha: any;
	const { avg: rating, ratingCount: count } = getRatingCounts(kombucha.reviews);
</script>

<div
	class={flex({
		rounded: 'xl',
		direction: 'column',
		overflow: 'hidden',
		bg: 'white',
		shadow: 'lg',
		p: '2'
	})}
>
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
			p: 4,
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
