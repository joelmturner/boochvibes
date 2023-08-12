import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, url, locals: { supabase } }) => {
		const body = Object.fromEntries(await request.formData());

		const { error: err } = await supabase.auth.signInWithPassword({
			email: body.email,
			password: body.password
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid credentials',
					email: body.email,
					password: body.password
				});
			}
			return fail(500, {
				message: 'Server error. Try again later.',
				email: body.email,
				password: body.password
			});
		}

		throw redirect(303, url.pathname);
	}
};
