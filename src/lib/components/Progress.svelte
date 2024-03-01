<script lang="ts">
	import { createProgress, melt } from '@melt-ui/svelte';
	import { writable } from 'svelte/store';
	import { css } from '../../../styled-system/css';

	export let val: number;
	export let total: number;
	const value = writable(val);

	const {
		elements: { root },
		options: { max },
	} = createProgress({
		value,
		max: total,
	});
</script>

<div
	use:melt={$root}
	class={css({ h: '2', w: 'full', bg: 'backgroundMuted', overflow: 'hidden', rounded: 'md' })}
>
	<div
		class={css({ w: 'full', h: 'full', bg: 'textMuted' })}
		style={`transform: translateX(-${100 - (100 * ($value ?? 0)) / ($max ?? 1)}%)`}
	/>
</div>
