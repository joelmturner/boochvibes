import { fail, type Actions, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from './zSchema';
import { AuthApiError } from '@supabase/supabase-js';

export const load = async (event) => {
	const form = await superValidate(event, registerSchema);

	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, registerSchema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const { data: user, error: err } = await event.locals.supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					username: form.data.username,
				},
			},
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid email or password',
				});
			}
			return fail(500, {
				error: 'Server error. Please try again later',
			});
		}

		throw redirect(303, '/?registrationSuccess');
	},
};
