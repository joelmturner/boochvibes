import { supabase } from '$lib/supabaseClient';
import { getRatingCounts } from '$lib/utils';
import { redirect, type Actions } from '@sveltejs/kit';
import type { Brand, Kombucha } from '../app';

export async function load({ url, locals }) {
	const { data } = await supabase
		.from('kombuchas')
		.select(
			`
            *,
            reviews (
                *
            ),
            brands (*)
        `
		)
		.eq('moderation', 'APPROVED');

	const userId = (await locals.getSession())?.user.id;

	const { data: userDetails, error: err2 } = await supabase
		.from('user_details')
		.select('*')
		.eq('user_id', userId!);

	const username = userDetails?.[0]?.username ?? 'friend';
	const registered = url.searchParams.has('registrationSuccess');

	const kombuchas: Kombucha[] =
		data?.map((kombucha) => {
			const { avg, ratingCount: count, starCounts } = getRatingCounts(kombucha.reviews ?? []);
			const { created_at, brand_id, brands, description, ...restAttributes } =
				kombucha;

			return {
				...restAttributes,
				brand: brands as Brand,
				rating: {
					avg,
					count,
                    starCounts
				},
			} as Kombucha;
		}) ?? [];

	return {
		kombuchas,
		justRegistered: registered,
		username,
	};
}
