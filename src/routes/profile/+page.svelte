<script lang="ts">
	import { css } from 'styled-system/css';
	import { btn, card, flex, hero, input } from 'styled-system/patterns';
	import ImageUploadWidget from '@components/ImageUploadWidget.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Image from '@components/Image.svelte';
	import { profileSchema } from './zSchema';
	import SocialLinks from '@components/SocialLinks.svelte';
	import { zod } from 'sveltekit-superforms/adapters';

	export let data;
	const { form, errors, enhance, message } = superForm(data.form, {
		validators: zod(profileSchema),
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
	<div class={hero()}>
		<p class={css({ color: 'red.500', mb: '3' })}>You must be logged in to view this page.</p>
		<a href="/login" class={css({ color: 'blue.500' })}>Login</a>
	</div>
{:else}
	<div class={hero({ size: 'md' })}>
		<div class={flex({ gap: '3' })}>
			<div
				class={flex({
					direction: 'column',
					color: 'textMuted',
					flex: '1 1 0',
				})}
			>
				<div
					class={css({
						fontSize: '2xl',
						fontWeight: 'bold',
						lineHeight: 1,
					})}
				>
					{$form.first_name ?? ''}
					{$form.last_name ?? ''}
				</div>
				<div
					class={css({
						fontSize: 'md',
						color: 'text',
					})}
				>
					{$form.username}
				</div>

				<div class={css({ letterSpacing: 'wide', mt: '2' })}>
					{$form.bio ?? ''}
				</div>

				<SocialLinks socialLinks={$form.social_links} />
			</div>

			<div
				class={flex({
					// bg: 'white',
					w: '1/3',
					py: '2',
					justifyContent: 'center',
					alignItems: 'center',
				})}
			>
				{#if $form.profile_url}
					<Image
						src={$form.profile_url}
						alt={`avatar of ${$form.first_name}`}
						className={css({ rounded: 'full' })}
					/>
				{/if}
			</div>
		</div>
	</div>
	<form method="POST" class={flex({ direction: 'column', gap: '3', p: '4' })} use:enhance>
		<div class={css({ w: '36', h: '36' })}>
			<ImageUploadWidget setUrl={handleSetUrl} preset="boochtown_profile">
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
			<label for="first_name" class={css({ color: 'text' })}>First name</label>
			<input id="first_name" name="first_name" class={input()} bind:value={$form.first_name} />
			{#if $errors?.first_name}
				<small class={css({ color: 'red.500' })}>{$errors.first_name.join(', ')}</small>
			{/if}
		</div>

		<div class={flex({ direction: 'column', gap: '1' })}>
			<label for="last_name" class={css({ color: 'text' })}>Last name</label>
			<input id="last_name" name="last_name" class={input()} bind:value={$form.last_name} />
			{#if $errors?.last_name}
				<small class={css({ color: 'red.500' })}>{$errors.last_name.join(', ')}</small>
			{/if}
		</div>

		<div class={flex({ direction: 'column', gap: '1' })}>
			<label for="username" class={css({ color: 'text' })}>Username</label>
			<input id="username" name="username" class={input()} bind:value={$form.username} />
			{#if $errors?.username}
				<small class={css({ color: 'red.500' })}>{$errors.username.join(', ')}</small>
			{/if}
		</div>

		<fieldset class={flex({ direction: 'column', gap: '1' })}>
			<label for="bio" class={css({ color: 'text' })}>Bio: (optional)</label>
			<textarea id="bio" name="bio" class={input({ multiline: true })} bind:value={$form.bio} />
		</fieldset>

		<div class={flex({ direction: 'column', gap: '1' })}>
			<label for="username" class={css({ color: 'text' })}>Username</label>
			<input id="username" name="username" class={input()} bind:value={$form.username} />
			{#if $errors?.username}
				<small class={css({ color: 'red.500' })}>{$errors.username.join(', ')}</small>
			{/if}
		</div>

		<button class={btn({ variant: 'primary', size: 'lg' })}>Update Profile</button>
	</form>
{/if}
