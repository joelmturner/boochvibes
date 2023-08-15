<script lang="ts">
	import Select from 'svelte-select';
	import { card, flex, grid, gridItem, input } from 'styled-system/patterns';
	import type { PageData } from './$types';
	import { css } from 'styled-system/css';
	import ImageUploadWidget from '@components/ImageUploadWidget.svelte';
	import Image from '@components/Image.svelte';

	let filterText = '';
	let created: any[] = [];
	export let data: PageData;

	$: ({ brands } = data);
	$: items = brands.map((brand: any) => ({ label: brand.name, value: brand.id }));

	function handleChange(e: any) {
		if (e.detail.created) {
			created = [...created, e.detail];
		}
	}

	function handleFilter(e: any) {
		if (e.detail.length === 0 && filterText.length > 0) {
			const prev = [...items, ...created].filter((i) => !i.created);
			created = [...prev, { value: filterText, label: filterText, created: true }];
		}
	}

	export let image_url = '';
	function handleSetUrl(url: string) {
		image_url = url;
	}
</script>

<div class={flex({ direction: 'column', gap: '4' })}>
	<div class={card()}>
		<h1 class={css({ fontSize: '3xl', fontWeight: 'bold' })}>Add a new booch</h1>
		<form class={grid({ columns: 2, gap: '3' })} method="POST" action="?/add">
			<div class={flex({ direction: 'column', gap: '3' })}>
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
					<label for="booch_url">Booch URL</label>
					<input
						class={input()}
						type="text"
						id="booch_url"
						name="booch_url"
						placeholder="Booch URL"
					/>
				</div>

				<div class={flex({ direction: 'column', gap: '1' })}>
					<label for="ingredients">Ingredients</label>
					<input
						class={input()}
						type="text"
						id="ingredients"
						name="ingredients"
						placeholder="ingredients"
					/>
				</div>

				<label class={flex({ alignItems: 'center', gap: '3' })} for="organic"
					>It is organic? <input
						class={input()}
						type="checkbox"
						id="organic"
						name="organic"
					/></label
				>
			</div>

			<div
				class={flex({
					direction: 'column',
					gap: '1',
					alignItems: 'center'
				})}
			>
				<ImageUploadWidget setUrl={handleSetUrl} preset="boochtown_product">
					<div
						class={flex({
							rounded: 'lg',
							w: '72',
							h: '72',
							position: 'relative',
							overflow: 'hidden',
							justifyContent: 'center',
							alignItems: 'center',
							color: 'gray.400',
							border: '1px dashed',
							borderColor: 'gray.400'
						})}
					>
						{#if image_url}
							<Image src={image_url} alt="Product Image" />
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class={css({ w: '10', h: '10' })}
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
								/>
							</svg>
						{/if}
					</div>
				</ImageUploadWidget>
				<input type="hidden" name="image_url" id="image_url" value={image_url} />
			</div>

			<button
				type="submit"
				class={gridItem({
					colSpan: 2,
					border: '1px solid',
					borderColor: 'gray.400',
					w: 'xs',
					justifySelf: 'center',
					py: '2',
					px: '3',
					rounded: 'sm'
				})}>Submit</button
			>
		</form>
	</div>
</div>
