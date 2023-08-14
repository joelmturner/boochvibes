import { getRatingCounts } from '$lib';
import { supabase } from '$lib/supabaseClient';
import type { Kombucha } from '../app';

export async function load({ url, locals }) {
	const { data, error } = await supabase
		.from('attributes')
		.select(
			`
            *,
            kombucha (
                id,
                name,
                reviews (
                    *
                )
            ),
            brands (*)
            
        `
		)
		.eq('moderation', 'APPROVED');

	const userId = (await locals.getSession())?.user.id;

	const { data: userDetails, error: err2 } = await supabase
		.from('user_details')
		.select('*')
		.eq('user_id', userId);

	const username = userDetails?.[0]?.username ?? 'friend';
	const registered = url.searchParams.has('registrationSuccess');

	const kombuchas: Kombucha[] =
		data?.map((attributes) => {
			const { avg, ratingCount } = getRatingCounts(attributes.kombucha.reviews ?? []);
			const { created_at, kombucha_id, brand_id, brands, description, ...restAttributes } =
				attributes;

			return {
				id: attributes.kombucha.id,
				name: attributes.kombucha.name,
				...restAttributes,
				brand: brands,
				rating: {
					avg,
					count: ratingCount
				}
			};
		}) ?? [];

	return {
		kombuchas,
		justRegistered: registered,
		username
	};
}
