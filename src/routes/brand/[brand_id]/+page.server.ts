import { getRatingCounts } from '$lib';
import type { Brand, Kombucha } from '../../../app';

export async function load({ params, url, locals }) {
	const { data: brands, error: err } = await locals.supabase
		.from('brands')
		.select(
			`
            *,
            attributes (
                *,
                kombucha (
                    id,
                    name,
                    reviews (*)
                )
            )
        `
		)
		.eq('id', params.brand_id);

	const { attributes: bAttributes, ...restBrand } = brands[0];
	const brand: Brand = { ...restBrand };

	const kombuchas: Kombucha[] = brands?.[0]?.attributes
		.filter((attribute: any) => attribute.moderation === 'APPROVED')
		.map((attributes: any) => {
			const { created_at, kombucha_id, brand_id, kombucha, ...restAttributes } = attributes;

			const { avg, ratingCount } = getRatingCounts(attributes.reviews ?? []);

			return {
				id: kombucha.id,
				name: kombucha.name,
				...restAttributes,
				brand: { ...restBrand },
				rating: {
					avg,
					count: ratingCount
				}
			};
		});

	return {
		brand,
		kombuchas
	};
}
