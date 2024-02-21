<script lang="ts">
	import { PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public';
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import { onMount } from 'svelte';

	let widget: any;
	export let preset: 'boochtown_profile' | 'boochtown_product' = 'boochtown_profile';
	export let setUrl: (url: string) => void;

	onMount(() => {
		if ('cloudinary' in window) {
			widget = (window.cloudinary as any).createUploadWidget(
				{
					cloudName: PUBLIC_CLOUDINARY_CLOUD_NAME,
					uploadPreset: preset,
				},
				(error: any, result: any) => {
					if (result?.info?.secure_url) {
						setUrl(result.info.secure_url);
					}
				}
			);
		}
	});

	function handleClick() {
		if (widget) {
			widget.open();
		}
	}
</script>

<div
	data-id="trigger"
	class={css({ fontSize: 'xl', cursor: 'pointer', position: 'relative' })}
	on:click|preventDefault={handleClick}
	on:keydown={handleClick}
	role="button"
	tabindex="0"
>
	<slot />
	<div
		class={flex({
			opacity: 0,
			position: 'absolute',
			inset: 0,
			justifyContent: 'center',
			alignItems: 'center',
			// bg: 'rgba(255, 255, 255, 0.8)',
			rounded: 'full',
			transition: 'background-color 100ms, border 100ms, opacity 100ms',
			'[data-id="trigger"]:hover &': {
				opacity: 1,
			},
		})}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class={css({ w: '10', h: '10' })}
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
			/>
		</svg>
	</div>
</div>
