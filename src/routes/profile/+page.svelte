<script lang="ts">
	import { css } from 'styled-system/css';
	import type { PageData } from './$types';
	import { card, flex, input } from 'styled-system/patterns';

	export let data: PageData & any;
</script>

<div class={card({ size: 'md' })}>
	<div class={flex({ gap: '3' })}>
		{#if data?.user?.profile_url}
			<img
				src={data.user.profile_url}
				alt={`profile pic for ${data.user.username}`}
				class={css({ rounded: 'full' })}
			/>
		{/if}
		{#if data?.user?.username}
			<h2 class={css({ fontSize: '2xl', fontWeight: 'bold' })}>{data.user.username}</h2>
		{/if}
	</div>

	<form action="?/update" method="POST" class={flex({ direction: 'column', gap: '3' })}>
		<div class={flex({ direction: 'column', gap: '2' })}>
			<label for="username" class={css({ color: 'gray.700' })}>Username</label>
			<input id="username" name="username" class={input()} />
		</div>
		<div class={flex({ direction: 'column', gap: '2' })}>
			<label for="profile_url" class={css({ color: 'gray.700' })}>Profile Url</label>
			<input id="profile_url" type="profile_url" name="profile_url" class={input()} />
		</div>

		<button>Update Profile</button>
	</form>
</div>
