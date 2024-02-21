<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { css } from 'styled-system/css';
	import { card, flex, input } from 'styled-system/patterns';
	import { registerSchema } from './zSchema.js';

	export let data;
	const { form, errors, enhance } = superForm(data.form, {
		validators: registerSchema,
	});
</script>

<div class={card({ size: 'md' })}>
	<h1 class={css({ fontSize: 'xl', fontWeight: 'bold' })}>Register for BoochVibes</h1>
	<form method="POST" class={flex({ direction: 'column', gap: '5' })} use:enhance>
		<div class={flex({ direction: 'column', gap: '1' })}>
			<label for="username" class={css({ color: 'gray.700' })}>Username</label>
			<input
				id="username"
				name="username"
				class={input({ error: !!$errors?.username })}
				bind:value={$form.username}
			/>
			{#if $errors?.username}
				<small class={css({ color: 'red.500' })}>{$errors.username.join(', ')}</small>
			{/if}
		</div>

		<div class={flex({ direction: 'column', gap: '1' })}>
			<label for="email" class={css({ color: 'gray.700' })}>Email</label>
			<input
				id="email"
				name="email"
				class={input({ error: !!$errors?.email })}
				bind:value={$form.email}
			/>
			{#if $errors?.email}
				<small class={css({ color: 'red.500' })}>{$errors.email.join(', ')}</small>
			{/if}
		</div>

		<div class={flex({ direction: 'column', gap: '1' })}>
			<label for="password" class={css({ color: 'gray.700' })}>Password</label>
			<input
				id="password"
				type="password"
				name="password"
				class={input({ error: !!$errors?.password })}
				bind:value={$form.password}
			/>
			{#if $errors?.password}
				<small class={css({ color: 'red.500' })}>{$errors.password.join(', ')}</small>
			{/if}
		</div>

		<div class={flex({ direction: 'column', gap: '1' })}>
			<label for="passwordConfirm" class={css({ color: 'gray.700' })}>Confirm Password</label>
			<input
				id="passwordConfirm"
				type="password"
				name="passwordConfirm"
				class={input({ error: !!$errors?.passwordConfirm })}
				bind:value={$form.passwordConfirm}
			/>
			{#if $errors?.passwordConfirm}
				<small class={css({ color: 'red.500' })}>{$errors.passwordConfirm.join(', ')}</small>
			{/if}
		</div>

		<button type="submit">Sign up</button>
	</form>
</div>
