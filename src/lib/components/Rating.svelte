<script lang="ts">
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';

	export let rating: number;
	export let count: number | null = null;
	export let size: 'md' | 'lg' = 'md';
	export let onclick: (() => void) | null = null;
	const stars = Array.from({ length: 5 }, (_, i) => i + 1);
</script>

<div
	class={flex({ gap: '0', alignItems: 'center' })}
	on:click|preventDefault={onclick}
	on:keydown={(event) => {
		if (onclick && ['Enter', ' '].includes(event.key)) {
			onclick();
		}
	}}
	role="button"
	tabindex="0"
>
	{#each stars as star, index}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			class={css({
				w: size === 'md' ? '4' : '8',
				h: size === 'md' ? '4' : '8',
				fill: index + 1 > rating ? 'transparent' : 'textMuted',
				stroke: 'textMuted',
			})}
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
			/>
		</svg>
	{/each}
	{#if count !== null}
		<span class={css({ fontSize: size === 'md' ? 'small' : 'lg' })}>({count})</span>
	{/if}
</div>
