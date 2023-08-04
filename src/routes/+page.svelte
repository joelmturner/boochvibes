<script>
	import { css } from 'styled-system/css';
	export let data;
</script>

<div
	class={css({
		fontSize: '2xl',
		fontWeight: 'bold'
	})}
>
	Booch Town Baby! 🍺

	<ul>
		{#each data.kombuchas as kombucha}
			<li>{kombucha.name}</li>
		{/each}
	</ul>
</div>
