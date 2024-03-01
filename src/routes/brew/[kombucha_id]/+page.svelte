<script lang="ts">
	import { css } from 'styled-system/css';
	import { btn, flex, grid } from 'styled-system/patterns';
	import ReviewEdit from '@components/ReviewEdit.svelte';
	import Reviews from '@components/Reviews.svelte';
	import RatingDetailed from '@components/RatingDetailed.svelte';
	import { CldImage } from 'svelte-cloudinary';
	import { getBrandSlug } from '$lib/utils.js';

	export let data;

	$: ({ kombucha } = data);

	let reviewEditOpen = false;
	let reviewsReadOpen = false;
	$: hasReviews = (kombucha?.reviews?.length ?? 0) > 0;
</script>

<svelte:head>
	<title>{`${kombucha.name} | BoochVibes`}</title>
	<meta
		name="description"
		content={`Rate ${kombucha.name} from ${kombucha.brand.name} and see what others think!`}
	/>
</svelte:head>

<div class={grid({ columns: { base: 1, md: 12 }, gap: '6', pt: 4 })}>
	<div
		class={flex({
			direction: 'column',
			color: 'text',
			justifyContent: 'center',
			alignItems: { base: 'center', md: 'flex-start' },
			gridColumn: { base: '1', md: 'span 4' },
		})}
	>
		<div
			class={css({
				fontSize: { base: '3xl', lg: '4xl' },
				fontWeight: 'bold',
				lineHeight: { base: 1, lg: 1.2 },
				textAlign: { base: 'center', md: 'left' },
			})}
		>
			<a href={`/brew/${kombucha.id}`}>{kombucha.name}</a>
		</div>
		<div
			class={css({
				fontSize: 'xl',
				color: 'textMuted',
				textAlign: { base: 'center', md: 'left' },
			})}
		>
			<a href={`/brand/${getBrandSlug(kombucha.brand)}`}>{kombucha.brand.name}</a>
		</div>
		{#if kombucha.description}
			<div class={css({ letterSpacing: 'wide', mt: '2', fontSize: 'md', hideBelow: 'md' })}>
				{kombucha.description}
			</div>
		{/if}
	</div>
	<div
		class={flex({
			justifyContent: { base: 'center', md: 'flex-start' },
			w: 'full',
			gridColumn: { base: '1', md: 'span 5' },
		})}
	>
		<a href={`/brew/${kombucha.id}`} class={css({ borderRadius: 'md', p: '1' })}>
			<CldImage
				src={kombucha.image_url}
				alt={kombucha.name ?? 'kombucha'}
				width={330}
				height={400}
				dpr="2"
				class={css({ width: '330px', height: '400px' })}
			/>
		</a>
	</div>
	<div
		class={flex({
			direction: 'column',
			gap: 2,
			justifyContent: 'center',
			alignItems: 'center',
			gridColumn: { base: '1', md: 'span 3' },
		})}
	>
		<RatingDetailed rating={kombucha.rating} />
	</div>
	{#if kombucha.description}
		<div class={css({ letterSpacing: 'wide', mt: '2', fontSize: 'md', hideFrom: 'md' })}>
			{kombucha.description}
		</div>
	{/if}
</div>

<div class={css({ p: 4 })}>
	{#if data.reviewedSuccess}
		<div class={css({ color: 'green.500' })}>Review added!</div>
	{:else if !data.userHasReviewed && data.isLoggedIn && reviewEditOpen}
		<ReviewEdit kombuchaId={kombucha.id} close={() => (reviewEditOpen = false)} />
	{/if}

	{#if !data.isLoggedIn}
		<div class={css({ color: 'textMuted' })}>Log in to add a review</div>
	{/if}

	{#if !reviewEditOpen && data.isLoggedIn && !data.userHasReviewed}
		<div class={flex({ justifyContent: 'flex-end', gap: 4 })}>
			<button
				on:click|preventDefault={() => (reviewEditOpen = true)}
				class={btn({ size: 'sm', order: 1 })}
			>
				Add Review
			</button>
		</div>
	{/if}

	{#if hasReviews}
		<Reviews reviews={kombucha.reviews} />
	{/if}
</div>
