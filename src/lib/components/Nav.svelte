<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { css, cx } from 'styled-system/css';
	import { nav } from '../../recipes/nav.recipe';

	export let loggedIn = false;

	const settingsSync = writable(true);
	const hideMeltUI = writable(false);

	const {
		elements: { trigger, menu, item, separator, arrow },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
		states: { open },
	} = createDropdownMenu({
		forceVisible: true,
	});

	const {
		elements: { subMenu, subTrigger },
		states: { subOpen },
	} = createSubmenu();

	const {
		elements: { radioGroup, radioItem },
		helpers: { isChecked },
	} = createMenuRadioGroup({
		defaultValue: 'Hunter Johnston',
	});

	const {
		elements: { checkboxItem },
	} = createCheckboxItem({
		checked: settingsSync,
	});

	const {
		elements: { checkboxItem: checkboxItemA },
	} = createCheckboxItem({
		checked: hideMeltUI,
	});

	const classes = nav({ size: 'md' });
</script>

<button
	type="button"
	class={cx(css({ color: 'text', _hover: { bg: 'backgroundMuted' } }), classes.trigger)}
	use:melt={$trigger}
	aria-label="Update dimensions"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class={css({ w: '6', h: '6', cursor: 'pointer', stroke: 'text' })}
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
		/>
	</svg>
	<span
		class={css({
			position: 'absolute',
			width: '1px',
			height: '1px',
			padding: '0',
			margin: '-1px',
			overflow: 'hidden',
			clip: 'rect(0, 0, 0, 0)',
			whiteSpace: 'nowrap',
			borderWidth: '0',
		})}
	>
		Open Popover
	</span>
</button>

{#if $open}
	<div class={classes.menu} use:melt={$menu} transition:fly={{ duration: 150, y: -10 }}>
		{#if loggedIn}
			<div class={classes.item} use:melt={$item}>
				<a href="/profile">Profile</a>
			</div>
			<div class={classes.item} use:melt={$item}>
				<a href="/brew/add">Add New Booch</a>
			</div>
			<div class={cx(css({ bg: 'background' }), classes.separator)} use:melt={$separator} />
			<div use:melt={$item}>
				<form action="/logout" method="POST" class={css({ fontSize: 'xl' })}>
					<button
						type="submit"
						class={cx(
							css({
								cursor: 'pointer',
								w: 'full',
								textAlign: 'left',
							}),
							classes.item
						)}><span class={css({ color: 'text' })}>Logout</span></button
					>
				</form>
			</div>
		{:else}
			<div class={classes.item} use:melt={$item}>
				<a href="/login">Login</a>
			</div>
			<div class={classes.item} use:melt={$item}>
				<a href="/register">Register</a>
			</div>
		{/if}
	</div>
{/if}
