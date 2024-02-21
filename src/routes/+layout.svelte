<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import { CldImage } from 'svelte-cloudinary';
	import Nav from '@components/Nav.svelte';
	import { themeChange } from 'theme-change';

	import '../app.css';

	let navOpen = false;
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
			<a href="/"
				><CldImage
					src="boochtown/ui/booch-vibes-logo_small.png"
					alt="boochvibes logo beachy scene"
					width={125}
					height={125}
				/></a
			>
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
						stroke="currentColor"
						class={css({
							w: 5,
							h: 5,
							display: 'none',
							'.active-theme &': {
								display: 'block',
							},
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
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class={css({
							w: 5,
							h: 5,
							display: 'block',
							'.active-theme &': {
								display: 'none',
							},
						})}
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
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

<div class={css({ maxW: { base: '100%', lg: '4xl' }, mx: 'auto', px: { base: '0', lg: '6' } })}>
	<slot />
</div>
