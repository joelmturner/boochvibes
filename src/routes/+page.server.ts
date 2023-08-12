import { supabase } from '$lib/supabaseClient';

export async function load({ url, locals }) {
	const { data } = await supabase.from('kombucha').select(`
        id,
        name,
        attributes (
            *
        ),
        reviews (
            *
        )
        `);

	const userId = (await locals.getSession())?.user.id;

	const { data: userDetails, error: err2 } = await supabase
		.from('user_details')
		.select('*')
		.eq('user_id', userId);

	const username = userDetails?.[0]?.username ?? 'friend';
	const registered = url.searchParams.has('registrationSuccess');

	return {
		kombucha: data ?? [],
		justRegistered: registered,
		username
	};
}
