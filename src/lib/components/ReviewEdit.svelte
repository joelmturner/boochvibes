<script lang="ts">
	import { css } from 'styled-system/css';
	import { flex, input } from 'styled-system/patterns';
	import RatingEdit from './RatingEdit.svelte';

	export let kombuchaId: number;
</script>

<form
	action="?/addReview"
	method="POST"
	class={flex({ direction: 'column', gap: '3', rounded: 'lg', bg: 'backgroundMuted', p: '4' })}
>
	<input type="hidden" name="kombuchaId" value={kombuchaId} />

	<h2 class={css({ fontSize: '2xl', fontWeight: 'bold', color: 'text' })}>Rate this booch!</h2>
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
