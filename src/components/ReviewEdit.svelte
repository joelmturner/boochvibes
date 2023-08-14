<script lang="ts">
	import { css } from 'styled-system/css';
	import { flex, input } from 'styled-system/patterns';
	import RatingEdit from './RatingEdit.svelte';

	export let kombuchaId: number;
</script>

<form
	action="?/addReview"
	method="POST"
	class={flex({ direction: 'column', gap: '3', rounded: 'lg', bg: 'white', p: '4' })}
>
	<input type="hidden" name="kombuchaId" value={kombuchaId} />

	<h2 class={css({ fontSize: '2xl', fontWeight: 'bold', color: 'gray.700' })}>Rate this booch!</h2>
	<RatingEdit />

	<fieldset class={flex({ direction: 'column', gap: '2', fontSize: 'lg', fontWeight: 'bold' })}>
		<label for="review" class={css({ color: 'gray.700' })}>Review: (optional)</label>
		<textarea id="review" name="review" class={input({ multiline: true })} />
	</fieldset>

	<button
		type="submit"
		class={css({
			bg: 'orange.400',
			color: 'white',
			textTransform: 'uppercase',
			letterSpacing: '2px',
			fontWeight: 'bold',
			shadow: 'md',
			rounded: 'md',
			px: '3',
			py: '2',
			cursor: 'pointer',
			_hover: {
				bg: 'orange.500'
			}
		})}>Submit</button
	>
</form>
