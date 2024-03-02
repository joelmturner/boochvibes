import { AuthApiError } from '@supabase/supabase-js';
import { fail } from '@sveltejs/kit';
import { addBoochSchema } from './zSchema';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { slugify } from '$lib/utils';

export const load = (async (event) => {
	const { data: brands } = await event.locals.supabase
		.from('brands')
		.select()
		.order('name', { ascending: true });
        
	const form = await superValidate(event, zod(addBoochSchema));
	return {
		brands,
		form,
	};
}) ;

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(addBoochSchema));
		const {
			locals: { supabase, getSession },
		} = event;

		const userId = (await getSession())?.user.id;
		let brandId = form.data.brand?.value;

		// if it's a new brand, add it first
		if (typeof brandId === 'string') {
			const { data: brands } = await supabase
				.from('brands')
				.insert({
					name: brandId,
				})
				.select();

			brandId = brands?.[0].id;
		}

		const { error: err } = await supabase.from('kombuchas').insert({
			name: form.data.name,
			description: form.data.description,
			image_url: form.data.image_url,
			product_url: form.data.product_url,
			added_by_user: userId,
			ingredients: form.data.ingredients,
			brand_id: brandId,
			organic: form.data.organic,
            slug: slugify(form.data.name)
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid email or password',
					form,
				});
			}
			return fail(500, {
				error: 'Server error. Please try again later',
				form,
			});
		}

		return message(
			form,
			'Thank you for submitting this booch. We will review it and publish it soon.'
		);
	},
};
