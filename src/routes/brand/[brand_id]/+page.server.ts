import { getRatingCounts } from '$lib/utils';
import type {Tables } from '../../../types/supabase';
import type { Kombucha as KombuchaClient } from '../../../app';

type Brand = Tables<'brands'>;
type Kombucha = Tables<'kombuchas'>;
type KombuchaWithReviews = Kombucha & { reviews: Tables<'reviews'>[] };

export async function load({ params, locals }) {

    const brandId = params.brand_id.split('-')[0];
	const { data: brands } = await locals.supabase
		.from('brands')
		.select(
			`
            *,
            kombuchas (
                *,
                reviews (*)
            )
        `
		)
		.eq('id', brandId);

	const { kombucha: bKombucha, ...restBrand } = brands[0];
	const brand: Brand & { kombuchas: Kombucha[] } = { ...restBrand };

	const kombuchas: Array<Omit<KombuchaClient, 'rating' | 'description'> & {rating: {avg: number; count: number}}> = (brands as Array<Brand & {kombuchas: KombuchaWithReviews[]}>)?.[0]?.kombuchas
		.filter((kombucha) => kombucha.moderation === 'APPROVED')
		.map(({ created_at, brand_id, description, ...restAttributes }) => {
			const { avg, ratingCount } = getRatingCounts(restAttributes.reviews ?? []);

			return {
				...restAttributes,
				brand: { ...restBrand },
				rating: {
					avg,
					count: ratingCount,
				},
			};
		});

	return {
		brand,
		kombuchas,
	};
}
