<script lang="ts">
	import { css } from 'styled-system/css';

	export let error: Error;
</script>

{#if error}
	<strong class={css({ color: 'red.600' })}>{error.message}</strong>
{/if}
