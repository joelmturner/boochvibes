import { AuthApiError } from '@supabase/supabase-js';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { profileSchema } from './zSchema';
import { zod } from 'sveltekit-superforms/adapters';

export async function load(event) {
	const userId = (await event.locals.getSession())?.user.id;
	const { data: user, error } = await event.locals.supabase
		.from('user_details')
		.select('*')
		.eq('user_id', userId);

	const form = await superValidate(event, zod(profileSchema));

	if (user?.[0]) {
		form.data = user[0];
	}

	return {
		form,
		userLoggedIn: userId,
	};
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(profileSchema));

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const {
			locals: { supabase, getSession },
		} = event;

		const userId = (await getSession())?.user.id;

		const record: Partial<Record<'user_id' | 'username' | 'profile_url', string>> = {};

		Object.keys(form.data).forEach((key) => {
			if ((form.data as any)[key]) {
				(record as any)[key] = (form.data as any)[key] as string;
			}
		});

		const { error: err } = await supabase.from('user_details').update(record).eq('user_id', userId);

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid credentials',
					form,
				});
			}
			return fail(500, {
				message: 'Server error. Try again later.',
				form,
			});
		}

		return message(form, 'Profile updated successfully');
	},
};
