import { getRatingCounts } from '$lib';
import { supabase } from '$lib/supabaseClient';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export async function load({ params, url, locals }) {
	console.log('params', params);
	console.log('url.searchParams', url.searchParams);
	const { data, error } = await supabase
		.from('kombucha')
		.select(
			`
            id,
            name,
            attributes (
                *
            ),
            reviews (
                *
            )
        `
		)
		.eq('id', params.kombucha_id);

	const { avg, ratingCount } = getRatingCounts(data?.[0]?.reviews ?? []);

	const userId = (await locals.getSession())?.user.id;

	const userHasReviewed = data?.[0]?.reviews?.some((review) => review.user_id === userId);

	return {
		kombucha: data ?? [],
		rating: avg,
		ratingCount,
		userHasReviewed,
		reviewedSuccess: url.searchParams.get('reviewedSuccessfully') === 'true'
	};
}

export const actions: Actions = {
	addReview: async ({ request, url, locals }) => {
		const body = Object.fromEntries(await request.formData());
		console.log('locals', locals);

		const userId = (await locals.getSession())?.user.id;
		const { error: err } = await locals.supabase.from('reviews').insert({
			kombucha_id: body.kombuchaId,
			review: body.review,
			rating: body.rating,
			user_id: userId
		});

		if (err) {
			console.log('err', err);
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Not authorized to review'
				});
			}
			return fail(500, {
				error: 'Server error. Please try again later'
			});
		}

		throw redirect(303, `${url.pathname}?reviewedSuccessfully=true`);
	}
};
