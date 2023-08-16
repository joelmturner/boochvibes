import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from './zSchema';

export const load = async (event) => {
	const form = await superValidate(event, loginSchema);

	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, loginSchema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const { error: err } = await event.locals.supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password,
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return setError(form, 'email', 'Invalid credentials');
			}
			return fail(500, {
				message: 'Server error. Try again later.',
				form,
			});
		}

		throw redirect(303, '/');
	},
};
