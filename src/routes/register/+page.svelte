<script lang="ts">
	import { css } from 'styled-system/css';
	import { card, flex, input } from 'styled-system/patterns';
</script>

<div class={card({ size: 'md' })}>
	<h1 class={css({ fontSize: 'xl', fontWeight: 'bold' })}>Register for BoochTown</h1>
	<form action="?/register" method="POST" class={flex({ direction: 'column', gap: '3' })}>
		<div class={flex({ direction: 'column', gap: '2' })}>
			<label for="email" class={css({ color: 'gray.700' })}>Email</label>
			<input id="email" name="email" class={input()} />
		</div>
		<div class={flex({ direction: 'column', gap: '2' })}>
			<label for="password" class={css({ color: 'gray.700' })}>Password</label>
			<input id="password" type="password" name="password" class={input()} />
		</div>

		<button type="submit">Sign up</button>
	</form>
</div>
