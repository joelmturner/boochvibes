<script lang="ts">
	import { css } from 'styled-system/css';
	import { card, flex, input } from 'styled-system/patterns';

	export const form = { email: '', password: '', error: '' };
</script>

<div class={card({ size: 'md' })}>
	<h1 class={css({ fontSize: 'xl', fontWeight: 'bold' })}>Login into BoochTown</h1>
	{#if form?.error}
		<p class={css({ color: 'red.500' })}>{form.error}</p>
	{/if}
	<form action="?/login" method="POST" class={flex({ direction: 'column', gap: '3' })}>
		<div class={flex({ direction: 'column', gap: '2' })}>
			<label for="email" class={css({ color: 'gray.700' })}>Email</label>
			<input bind:value={form.email} id="email" name="email" class={input()} />
		</div>
		<div class={flex({ direction: 'column', gap: '2' })}>
			<label for="password" class={css({ color: 'gray.700' })}>Password</label>
			<input
				bind:value={form.password}
				id="password"
				type="password"
				name="password"
				class={input()}
			/>
		</div>

		<button>Sign in</button>
	</form>
</div>
