import { getRatingCounts } from '$lib';
import type { Brand, Kombucha } from '../../../app';

export async function load({ params, locals }) {
	const { data: brands, error: err } = await locals.supabase
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
		.eq('id', params.brand_id);

	const { kombucha: bKombucha, ...restBrand } = brands[0];
	const brand: Brand = { ...restBrand };
	console.log('brands?.[0]?.kombuchas', brands?.[0]?.kombuchas);
	const kombuchas: Kombucha[] = brands?.[0]?.kombuchas
		.filter((kombucha: any) => kombucha.moderation === 'APPROVED')
		.map(({ created_at, brand_id, ...restAttributes }: any) => {
			// const { created_at, kombucha_id, brand_id, ...restAttributes } = attributes;
			console.log('restAttributes', restAttributes);
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

	console.log('kombuchas', kombuchas);

	return {
		brand,
		kombuchas,
	};
}
