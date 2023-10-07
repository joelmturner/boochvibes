<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { css } from 'styled-system/css';
	import { card, flex } from 'styled-system/patterns';
	import { fade } from 'svelte/transition';
	import '../app.css';
	import Nav from '@components/Nav.svelte';

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
			<Nav loggedIn={!!data.session} />
		</div>
	</div>
</div>

<div class={css({ maxW: { base: '100%', lg: '4xl' }, mx: 'auto', px: { base: '0', lg: '6' } })}>
	<slot />
</div>
