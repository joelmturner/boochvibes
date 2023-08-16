<script lang="ts">
	import { css } from 'styled-system/css';
	import { card, flex, input } from 'styled-system/patterns';
	import { loginSchema } from './zSchema.js';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const { form, errors, enhance } = superForm(data.form, {
		validators: loginSchema,
		taintedMessage: null,
	});
</script>

<div class={card({ size: 'md' })}>
	<h1 class={css({ fontSize: 'xl', fontWeight: 'bold' })}>Login into BoochTown</h1>

	<form method="POST" class={flex({ direction: 'column', gap: '3' })} use:enhance>
		<div class={flex({ direction: 'column', gap: '1' })}>
			<label for="email" class={css({ color: 'gray.700' })}>Email</label>
			<input bind:value={$form.email} id="email" name="email" class={input()} />
			{#if $errors?.email}
				<small class={css({ color: 'red.500' })}>{$errors.email.join(', ')}</small>
			{/if}
		</div>
		<div class={flex({ direction: 'column', gap: '1' })}>
			<label for="password" class={css({ color: 'gray.700' })}>Password</label>
			<input
				bind:value={$form.password}
				id="password"
				type="password"
				name="password"
				class={input()}
			/>
			{#if $errors?.password}
				<small class={css({ color: 'red.500' })}>{$errors.password.join(', ')}</small>
			{/if}
		</div>

		<button>Sign in</button>
	</form>
</div>
