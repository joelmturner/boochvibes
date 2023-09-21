<script lang="ts">
	import { flex } from 'styled-system/patterns';
	import type { SocialLink } from '../../types/supabase';

	export let socialLinks: Partial<Record<SocialLink, string | null | undefined>>;

	$: links = socialLinks ? Object.entries(socialLinks) : [];
</script>

<div class={flex({ gap: '1' })}>
	{#each links as linkItem}
		<a href={linkItem[1]} target="_blank" rel="noopener noreferrer">
			<img src={`/icons/${linkItem[0]}.svg`} alt={linkItem[0]} />
		</a>
	{/each}
</div>
