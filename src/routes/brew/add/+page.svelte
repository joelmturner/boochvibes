<script lang="ts">
	import Select from 'svelte-select';
	import { card, flex, input } from 'styled-system/patterns';
	import type { PageData } from './$types';
	import { css } from 'styled-system/css';

	let filterText = '';
	let created: any[] = [];
	export let data: PageData;

	$: ({ brands } = data);
	$: items = brands.map((brand: any) => ({ label: brand.name, value: brand.id }));

	function handleChange(e) {
		if (e.detail.created) {
			created = [...created, e.detail];
		}
	}

	function handleFilter(e) {
		if (e.detail.length === 0 && filterText.length > 0) {
			const prev = [...items, ...created].filter((i) => !i.created);
			created = [...prev, { value: filterText, label: filterText, created: true }];
		}
	}
</script>

<div class={flex({ direction: 'column', gap: '4' })}>
	<div class={card()}>
		<h1 class={css({ fontSize: '3xl', fontWeight: 'bold' })}>Add a new booch</h1>
		<form class={flex({ direction: 'column', gap: '3' })} method="POST" action="?/add">
			<div class={flex({ direction: 'column', gap: '1' })}>
				<label for="name">Name</label>
				<input class={input()} type="text" id="name" name="name" placeholder="Booch Name" />
			</div>

			<div class={flex({ direction: 'column', gap: '1' })}>
				<label for="brand">Brand</label>
				<Select
					id="brand"
					name="brand"
					on:change={handleChange}
					on:filter={handleFilter}
					items={created.length > 0 ? created : items}
					bind:filterText
				>
					<div slot="item" let:item>
						{item.created ? 'Add new: ' : ''}
						{item.label}
					</div>
				</Select>
			</div>

			<div class={flex({ direction: 'column', gap: '1' })}>
				<label for="description">Description</label>
				<input
					class={input()}
					type="text"
					id="description"
					name="description"
					placeholder="Booch Description"
				/>
			</div>

			<div class={flex({ direction: 'column', gap: '1' })}>
				<label for="image_url">Image URL</label>
				<input
					class={input()}
					type="text"
					id="image_url"
					name="image_url"
					placeholder="Booch Image URL"
				/>
			</div>

			<div class={flex({ direction: 'column', gap: '1' })}>
				<label for="booch_url">Booch URL</label>
				<input
					class={input()}
					type="text"
					id="booch_url"
					name="booch_url"
					placeholder="Booch URL"
				/>
			</div>

			<label class={flex({ alignItems: 'center', gap: '3' })} for="organic"
				>It is organic? <input class={input()} type="checkbox" id="organic" name="organic" /></label
			>

			<button type="submit">Submit</button>
		</form>
	</div>
</div>
