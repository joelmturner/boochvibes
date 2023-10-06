import type { Reviews } from '../types/supabase';

export const average = (array: number[]) => array.reduce((a, b) => a + b) / array.length;

const initialStarCounts = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 } as const;
function getStarCounts(reviews: Reviews[] = []) {
	return reviews.reduce(
		(acc, { rating }) => {
			if (rating) {
                const key = `${rating}`;
				acc[key] = acc[key] + 1;
			}
			return acc;
		},
		JSON.parse(JSON.stringify(initialStarCounts))
	);
}

export function getRatingCounts(reviews: Reviews[] = []) {
	const ratingCount = reviews.length;
	const avg = ratingCount ? average(reviews.map((review) => review?.rating ?? 0)) : 0;
	const starCounts = getStarCounts(reviews);

	return {
		avg,
		ratingCount,
		starCounts,
	};
}
