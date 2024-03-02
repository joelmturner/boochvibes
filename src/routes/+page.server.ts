import { supabase } from '$lib/supabaseClient';
import { getRatingCounts, slugify } from '$lib/utils';
import type { Brand, Kombucha } from '../app';

export async function load({ url, locals }) {
	const { data: recents } = await supabase
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
		.eq('moderation', 'APPROVED').order('created_at', { ascending: false }).limit(5);
	
        const { data: all } = await supabase
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

	const recentBooches: Array<Omit<Kombucha, 'description'>> =
		recents?.map((kombucha) => {
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
			} as Omit<Kombucha, 'description'>;
		}) ?? [];
	
    const allBooches: Array<Omit<Kombucha, 'description'>> =
		all?.map((kombucha) => {
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
			} as Omit<Kombucha, 'description'>;
		}) ?? [];

	return {
		recentBooches,
        allBooches,
		justRegistered: registered,
		username,
	};
}
