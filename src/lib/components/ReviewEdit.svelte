<script lang="ts">
	import { css } from 'styled-system/css';
	import { flex, input } from 'styled-system/patterns';
	import RatingEdit from './RatingEdit.svelte';

	export let kombuchaId: number;
	export let close: () => void;
</script>

<form
	action="?/addReview"
	method="POST"
	class={flex({ direction: 'column', gap: '3', rounded: 'lg', bg: 'backgroundMuted', p: '4' })}
>
	<input type="hidden" name="kombuchaId" value={kombuchaId} />

	<div class={flex({ justifyContent: 'space-between', alignItems: 'flex-start' })}>
		<div>
			<h2 class={css({ fontSize: '2xl', fontWeight: 'bold', color: 'text' })}>Rate this booch!</h2>
			<p class={css({ fontSize: 'lg', color: 'textMuted' })}>Select a star to rate</p>
		</div>

		<!-- add close icon -->
		<button
			type="button"
			class={css({
				color: 'textMuted',
				fontSize: 'xl',
				fontWeight: 'bold',
				cursor: 'pointer',
				rounded: 'full',
				borderColor: 'textMuted',
			})}
			on:click|preventDefault={close}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class={css({ w: '5', h: '5' })}
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
			</svg>
		</button>
	</div>

	<RatingEdit />

	<fieldset class={flex({ direction: 'column', gap: '2', fontSize: 'lg', fontWeight: 'bold' })}>
		<label for="review" class={css({ color: 'text' })}>Review: (optional)</label>
		<textarea id="review" name="review" class={input({ multiline: true })} />
	</fieldset>

	<button
		type="submit"
		class={css({
			bg: { _dark: 'orange.300', base: 'orange.500' },
			color: 'textInverse',
			textTransform: 'uppercase',
			letterSpacing: '2px',
			fontWeight: 'bold',
			shadow: 'md',
			rounded: 'md',
			px: '3',
			py: '2',
			cursor: 'pointer',
			_hover: {
				bg: { _dark: 'orange.400', base: 'orange.600' },
			},
		})}>Submit</button
	>
</form>
