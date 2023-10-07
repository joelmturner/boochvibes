<script lang="ts">
	import { flex } from 'styled-system/patterns';
	import type { SocialLink } from '../../types/supabase';
	import SocialIcon from './SocialIcon.svelte';

	export let socialLinks: Partial<Record<SocialLink, string | null | undefined>>;

	$: links = socialLinks ? (Object.entries(socialLinks) as any[]) : [];
</script>

<div class={flex({ gap: '1' })}>
	{#each links as linkItem}
		{#if linkItem[1]}
			<a href={linkItem[1]} target="_blank" rel="noopener noreferrer">
				<SocialIcon network={linkItem[0]} />
			</a>
		{/if}
	{/each}
</div>
