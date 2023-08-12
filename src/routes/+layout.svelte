<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { theme } from '$lib/stores';
	import { onMount } from 'svelte';
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import '../app.css';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
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
		justifyContent: 'space-between',
		alignItems: 'center',
		maxW: '5xl',
		mx: 'auto',
		py: '3',
		px: { base: '3', lg: '6' },
		color: 'white'
	})}
>
	<div class={css({ fontSize: '3xl', fontWeight: 'bold' })}>
		<a href="/">BoochTown</a>
	</div>
	<div class={flex({ gap: '3' })}>
		{#if data.session}
			<div class={css({ fontSize: 'xl' })}>
				<form action="/logout" method="POST">
					<button
						type="submit"
						class={css({
							cursor: 'pointer',
							color: 'currentColor',
							_hover: { color: 'gray.100' }
						})}>Logout</button
					>
				</form>
			</div>
		{:else}
			<div class={css({ fontSize: 'xl' })}><a href="/login">Login</a></div>
			<div class={css({ fontSize: 'xl' })}><a href="/register">Register</a></div>
		{/if}
	</div>
</div>

<div class={css({ maxW: '4xl', mx: 'auto', py: '6', px: { base: '3', lg: '6' } })}>
	<slot />
</div>
