<script lang="ts">
	import { css } from 'styled-system/css';
	import type { PageData } from './$types';
	import { card, flex, input } from 'styled-system/patterns';
	import ImageUploadWidget from '@components/ImageUploadWidget.svelte';

	export let data: PageData & any;
	export let profileUrl = '';
	function handleSetUrl(url: string) {
		profileUrl = url;
	}
</script>

<div class={card({ size: 'md' })}>
	<div class={flex({ gap: '3' })}>
		<ImageUploadWidget setUrl={handleSetUrl} preset="boochtown_product">
			{#if data?.user?.profile_url}
				<img
					src={!!profileUrl ? profileUrl : data.user.profile_url}
					alt={`profile pic for ${data.user.username}`}
					class={css({ rounded: 'full' })}
				/>
			{:else}
				<div class={css({ rounded: 'full', border: 'ActiveBorder' })} />
			{/if}
		</ImageUploadWidget>
		{#if data?.user?.username}
			<h2 class={css({ fontSize: '2xl', fontWeight: 'bold' })}>{data.user.username}</h2>
		{/if}
	</div>

	<form action="?/update" method="POST" class={flex({ direction: 'column', gap: '3' })}>
		<div class={flex({ direction: 'column', gap: '2' })}>
			<label for="username" class={css({ color: 'gray.700' })}>Username</label>
			<input id="username" name="username" class={input()} bind:value={data.user.username} />
		</div>

		<input
			type="hidden"
			name="profile_url"
			id="profile_url"
			value={profileUrl ?? data.user.profile_url}
		/>
		<button>Update Profile</button>
	</form>
</div>
