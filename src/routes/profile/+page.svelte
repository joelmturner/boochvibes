<script lang="ts">
	import { css } from 'styled-system/css';
	import { card, flex, input } from 'styled-system/patterns';
	import ImageUploadWidget from '@components/ImageUploadWidget.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Image from '@components/Image.svelte';
	import { profileSchema } from './zSchema';

	export let data;
	const { form, errors, enhance, message } = superForm(data.form, {
		validators: profileSchema,
		dataType: 'json',
	});

	function handleSetUrl(url: string) {
		$form.profile_url = url;
	}
</script>

{#if $message}
	<p class={card({ color: 'green.500', mb: '3' })}>{$message}</p>
{/if}

{#if !data.userLoggedIn}
	<div class={card()}>
		<p class={css({ color: 'red.500', mb: '3' })}>You must be logged in to view this page.</p>
		<a href="/login" class={css({ color: 'blue.500' })}>Login</a>
	</div>
{:else}
	<div class={card({ size: 'md' })}>
		<form method="POST" class={flex({ direction: 'column', gap: '3' })} use:enhance>
			<div class={css({ w: '36', h: '36' })}>
				<ImageUploadWidget setUrl={handleSetUrl} preset="boochtown_product">
					{#if $form?.profile_url}
						<Image
							src={$form?.profile_url}
							alt={`profile pic for ${$form.username}`}
							className={css({ rounded: 'full' })}
						/>
					{:else}
						<div class={css({ rounded: 'full', border: 'ActiveBorder' })} />
					{/if}
				</ImageUploadWidget>
				<input type="hidden" name="profile_url" id="profile_url" value={$form?.profile_url} />
			</div>

			<div class={flex({ direction: 'column', gap: '1' })}>
				<label for="first_name" class={css({ color: 'gray.700' })}>First name</label>
				<input id="first_name" name="first_name" class={input()} bind:value={$form.first_name} />
				{#if $errors?.first_name}
					<small class={css({ color: 'red.500' })}>{$errors.first_name.join(', ')}</small>
				{/if}
			</div>

			<div class={flex({ direction: 'column', gap: '1' })}>
				<label for="last_name" class={css({ color: 'gray.700' })}>Last name</label>
				<input id="last_name" name="last_name" class={input()} bind:value={$form.last_name} />
				{#if $errors?.last_name}
					<small class={css({ color: 'red.500' })}>{$errors.last_name.join(', ')}</small>
				{/if}
			</div>

			<div class={flex({ direction: 'column', gap: '1' })}>
				<label for="username" class={css({ color: 'gray.700' })}>Username</label>
				<input id="username" name="username" class={input()} bind:value={$form.username} />
				{#if $errors?.username}
					<small class={css({ color: 'red.500' })}>{$errors.username.join(', ')}</small>
				{/if}
			</div>

			<fieldset class={flex({ direction: 'column', gap: '1' })}>
				<label for="bio" class={css({ color: 'gray.700' })}>Bio: (optional)</label>
				<textarea id="bio" name="bio" class={input({ multiline: true })} bind:value={$form.bio} />
			</fieldset>

			<button>Update Profile</button>
		</form>
	</div>
{/if}
