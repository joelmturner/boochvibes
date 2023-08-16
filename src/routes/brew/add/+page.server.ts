import { AuthApiError } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const { data: brands, error: err } = await locals.supabase.from('brands').select();
	return {
		brands,
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, locals: { supabase, getSession } }) => {
		const body = Object.fromEntries(await request.formData());
		const userId = (await getSession())?.user.id;

		const { data: kombucha, error: kombuchaError } = await supabase
			.from('kombucha')
			.insert({
				name: body.name,
			})
			.select();

		// if (kombuchaError) {
		// 	console.log('kombuchaError', kombuchaError);
		// }

		const brand: { label: string; value: string } = JSON.parse(body.brand as string);
		let brandId = brand.value;

		// if it's a new brand, add it first
		if (brand.value === brand.label) {
			const { data: brands, error: brandError } = await supabase
				.from('brands')
				.insert({
					name: brand.label,
				})
				.select();

			brandId = brands?.[0].id;
		}

		const { error: err } = await supabase.from('attributes').insert({
			kombucha_id: kombucha?.[0].id,
			description: body.description,
			image_url: body.image_url,
			product_url: body.booch_url,
			added_by_user: userId,
			ingredients: body.ingredients,
			brand_id: brandId,
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid credentials',
					name: body.name,
					description: body.description,
					image_url: body.image_url,
					product_url: body.booch_url,
					ingredients: body.ingredients,
				});
			}
			return fail(500, {
				message: 'Server error. Try again later.',
				name: body.name,
				description: body.description,
				image_url: body.image_url,
				product_url: body.booch_url,
				ingredients: body.ingredients,
			});
		}

		return { happy: true };
	},
};
