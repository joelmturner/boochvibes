<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { css } from 'styled-system/css';
	import { card, flex } from 'styled-system/patterns';
	import { fade } from 'svelte/transition';
	import '../app.css';

	let navOpen = false;
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
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
		bg: 'white',
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
			<a href="/">BoochTown</a>
		</div>
		<div class={flex({ direction: 'column', gap: '3', position: 'relative' })}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class={css({ w: '6', h: '6', cursor: 'pointer' })}
				on:click={() => (navOpen = !navOpen)}
				on:keydown={(event) => {
					if (['Enter', ' '].includes(event.key)) {
						navOpen = !navOpen;
					}
				}}
				role="button"
				tabindex="0"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>

			{#if navOpen}
				<div
					transition:fade={{
						duration: 150,
						delay: 0,
					}}
					class={card({
						size: 'sm',
						color: 'gray.900',
						px: '4',
						position: 'absolute',
						top: '110%',
						right: 0,
						w: 'xs',
						maxW: '2xl',
					})}
				>
					{#if data.session}
						<div class={css({ fontSize: 'xl' })}><a href="/profile">Profile</a></div>
						<div class={css({ fontSize: 'xl' })}><a href="/brew/add">Add New Booch</a></div>
						<form action="/logout" method="POST" class={css({ fontSize: 'xl' })}>
							<button
								type="submit"
								class={css({
									cursor: 'pointer',
									color: 'currentColor',
								})}>Logout</button
							>
						</form>
					{:else}
						<div class={css({ fontSize: 'xl' })}><a href="/login">Login</a></div>
						<div class={css({ fontSize: 'xl' })}><a href="/register">Register</a></div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<div class={css({ maxW: { base: '100%', lg: '4xl' }, mx: 'auto', px: { base: '0', lg: '6' } })}>
	<slot />
</div>
