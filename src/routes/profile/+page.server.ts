import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const userId = (await locals.getSession())?.user.id;
	const { data: user, error } = await locals.supabase
		.from('user_details')
		.select('*')
		.eq('user_id', userId);

	return {
		user: user[0]
	};
}

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const body = Object.fromEntries(await request.formData());
		const userId = (await getSession())?.user.id;

		const record: Partial<Record<'user_id' | 'username' | 'profile_url', string>> = {};

		if (body.username) {
			record.username = body.username as string;
		}

		if (body.profile_url) {
			record.profile_url = body.profile_url as string;
		}

		const { error: err } = await supabase.from('user_details').update(record).eq('user_id', userId);

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid credentials',
					username: body.username,
					profile_url: body.profile_url
				});
			}
			return fail(500, {
				message: 'Server error. Try again later.',
				username: body.username,
				profile_url: body.profile_url
			});
		}

		return { happy: true };
	}
};
