<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import { CldImage, CldOgImage } from 'svelte-cloudinary';
	import Nav from '@components/Nav.svelte';
	import { themeChange } from 'theme-change';

	import '../app.css';
	import { page } from '$app/stores';
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		themeChange(false);

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event: any, _session: any) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<CldOgImage
	src="boochtown/ui/Booch_Vibes_Scene.png"
	tint="100:0762a0"
	opacity="40"
	overlays={[
		{
			text: {
				color: '#8E4505',
				fontFamily: 'Source Sans Pro',
				fontSize: 200,
				fontWeight: 'bold',
				text: 'Review That Booch!',
			},
			appliedEffects: [{ shadow: true }],
		},
	]}
	alt="beach scene with text Review That Booch! in the sky"
	twitterTitle="Review That Booch!"
/>

<svelte:head>
	<title>Review That Booch!</title>
	<meta
		name="description"
		content="A place for Booch bums to rate their favorite kombuchas and find new ones."
	/>
</svelte:head>

<div
	class={flex({
		bg: 'backgroundStrong',
	})}
>
	<div
		class={flex({
			justifyContent: 'space-between',
			alignItems: 'center',
			w: 'full',
			maxW: { base: '100%', lg: '5xl' },
			mx: 'auto',
			py: '3',
			px: { base: '3', lg: '6' },
		})}
	>
		<div class={css({ fontSize: '3xl', fontWeight: 'bold' })}>
			{#if $page.url.pathname !== '/'}
				<a href="/">
					<CldImage
						src="boochtown/ui/booch-vibes-logo_small.png"
						alt="boochvibes logo beachy scene"
						width={125}
						height={125}
					/>
				</a>
			{/if}
		</div>
		<div class={flex({ gap: '2' })}>
			<div class={flex({ justifyContent: 'center', alignItems: 'center' })}>
				<button
					data-toggle-theme="dark,light"
					data-act-class="active-theme"
					class={css({ cursor: 'pointer' })}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						class={css({
							w: 5,
							h: 5,
							display: 'none',
							'.active-theme &': {
								display: 'block',
							},
							stroke: 'text',
						})}
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
						/>
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 128 128"
						class={css({
							w: 5,
							h: 5,
							display: 'block',
							'.active-theme &': {
								display: 'none',
							},
							fill: 'text',
						})}
					>
						<path
							d="M52.44 53.27c-1.03-1.71-3.17-5.28-18.55-5.69c-10.54-.36-16.68.93-18.81 3.97c-.93 1.46-1.85 5-.95 13.57c1.56 14.33 8.76 14.71 17.89 15.18l.69.04c.99.05 1.92.08 2.8.08c12.94 0 15.2-5.65 16.86-13.48c1.48-6.67 1.51-11.26.07-13.67m60.26-1.76c-2.1-3.01-8.24-4.29-18.78-3.93c-15.39.42-17.53 3.98-18.56 5.69c-1.44 2.41-1.42 7 .08 13.64c1.67 7.85 3.92 13.49 16.86 13.49c.88 0 1.82-.03 2.8-.08l.69-.04c9.12-.47 16.33-.85 17.89-15.18c.89-8.55-.03-12.09-.98-13.59"
						/>
						<path
							fill="#616161"
							d="M123.8 47.84s-1-1.7-19.03-3.41c-18.93-1.8-28.35 2-32.25 4.41c-.7.3-1.9.6-3.31.5h-.3c-1.9-.1-3.61-.2-5.61-.2h-.1c-1.1 0-3.51.1-5.21.2c-.8.1-1.5 0-2.1-.2c-3.61-2.4-13.02-6.61-32.75-4.71C5.1 46.14 4.1 47.84 4.1 47.84L4 54.65s2.7.8 4.41 2.9c1.7 2.1 2.5 14.12 5.41 19.73c4.4 8.72 26.14 6.52 26.14 6.52s8.91.7 13.22-6.81c3.71-6.41 5.21-15.43 5.61-17.63c.9-.9 2.6-2 5.11-2.1c2.8 0 4.61 1.4 5.41 2.4c.4 2.7 1.9 11.22 5.51 17.33c4.31 7.51 13.22 6.81 13.22 6.81s21.74 2.2 26.14-6.51c2.8-5.61 3.61-17.63 5.41-19.73c1.7-2.2 4.41-2.9 4.41-2.9zM51.38 66.71c-1.7 8.01-3.91 13.42-18.63 12.62c-9.52-.5-16.13-.5-17.63-14.32c-.9-8.61.1-11.82.8-12.92c.7-1 3.21-4.01 17.93-3.51c14.72.4 16.83 3.71 17.73 5.21c.9 1.5 1.6 4.91-.2 12.92m61.3-1.7c-1.5 13.82-8.11 13.82-17.63 14.32c-14.72.8-16.93-4.61-18.63-12.62c-1.8-8.01-1.1-11.42-.2-12.92c.9-1.5 3.01-4.81 17.73-5.21c14.72-.5 17.23 2.5 17.93 3.51c.7 1.1 1.7 4.3.8 12.92"
						/>
						<path
							fill="#82aec0"
							d="M26.82 52.22c4.33-.84 5.79 1.26 5.37 3.14c-.77 3.47-4.11 1.62-9 4.6c-2.06 1.26-2.9 2.16-3.66 2.13c-.73-.03-1.36-.78-1.01-2.2c.63-2.58 1.68-6.39 8.3-7.67m56.84.99c1.77-.99 6.74-1.88 7.27.73c.54 2.69-1.99 3.43-3.78 4.04c-4.23 1.44-4.93 3.49-5.81 4.05c-.59.37-2.33 1.21-2.14-1.34c.22-3.24 1.28-5.69 4.46-7.48"
						/>
					</svg>
				</button>
			</div>
			<div class={flex({ direction: 'column', gap: '3', position: 'relative' })}>
				<Nav loggedIn={!!data.session} />
			</div>
		</div>
	</div>
</div>

<div class={css({ maxW: { base: '100%', lg: '4xl' }, mx: 'auto', px: { base: 4, lg: 6 } })}>
	<slot />
</div>
