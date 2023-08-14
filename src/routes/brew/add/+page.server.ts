import { AuthApiError } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const { data: brands, error: err } = await locals.supabase.from('brands').select();
	return {
		brands
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, locals: { supabase, getSession } }) => {
		const body = Object.fromEntries(await request.formData());
		const userId = (await getSession())?.user.id;

		const { data: kombucha, error: kombuchaError } = await supabase
			.from('kombucha')
			.insert({
				name: body.name
			})
			.select();

		const { error: err } = await supabase.from('attributes').insert({
			kombucha_id: kombucha?.[0].id,
			description: body.description,
			image_url: body.image_url,
			product_url: body.booch_url,
			added_by_user: userId,
			brand_id: body.brand ? JSON.parse(body.brand as any).value : null
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid credentials',
					name: body.name,
					description: body.description,
					image_url: body.image_url,
					product_url: body.booch_url
				});
			}
			return fail(500, {
				message: 'Server error. Try again later.',
				name: body.name,
				description: body.description,
				image_url: body.image_url,
				product_url: body.booch_url
			});
		}

		return { happy: true };
	}
};
