import { getRatingCounts } from '$lib/utils';
import { supabase } from '$lib/supabaseClient';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { KombuchaWithReviews } from '../../../../app';
import type { Tables } from '../../../../types/supabase';

export async function load({ params, url, locals }) {
    console.log('params', params);
	const { data: kombuchas } = await supabase
		.from('kombuchas')
		.select(
			`
            *,
            brands (
                *
            ),
            reviews (
                *
            )
        `
		)
		.eq('slug', params.slug);

	const reviews = kombuchas?.[0]?.reviews;

	const users = reviews?.map((review) => !!review.user_id && review.user_id)?.filter(Boolean) ?? [];
	const { data: userDetails } = await supabase
		.from('user_details')
		.select()
		.in('user_id', users);

	const enhancedReviews = reviews
		?.map(({ user_id, ...rest }) => ({
			...rest,
			user: userDetails?.find((user) => user.user_id === user_id),
		}))
		?.sort((reviewA, reviewB) => reviewB.created_at!.localeCompare(reviewA.created_at!));

	const { avg, ratingCount, starCounts } = getRatingCounts(reviews ?? []);

	const userId = (await locals.getSession())?.user.id;
	const userHasReviewed = reviews?.some((review) => review.user_id === userId);

    if (!kombuchas?.length) {
        return fail(404, {
            error: 'Kombucha not found',
        });
    }

	const attributes = kombuchas[0];
	const { created_at, brand_id, brands, ...restAttributes } = attributes;

	const resolvedKombucha: KombuchaWithReviews = {
		...restAttributes,
		brand: brands,
		reviews: enhancedReviews,
		rating: {
			avg,
			count: ratingCount,
			starCounts,
		},
	};

    if (!resolvedKombucha) {
        return fail(404, {
            error: 'Kombucha not found',
        });
    }

	return {
		kombucha: resolvedKombucha,
		userHasReviewed,
		reviewedSuccess: url.searchParams.get('reviewedSuccessfully') === 'true',
		isLoggedIn: !!userId,
	};
}

export const actions: Actions = {
	addReview: async ({ request, url, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const userId = (await locals.getSession())?.user.id;
		const { error: err } = await locals.supabase.from('reviews').insert({
			kombucha_id: body.kombuchaId,
			review: body.review,
			rating: body.rating,
			user_id: userId,
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Not authorized to review',
				});
			}
			return fail(500, {
				error: 'Server error. Please try again later',
			});
		}

		redirect(303, `${url.pathname}?reviewedSuccessfully=true`);
	},
};
