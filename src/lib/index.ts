import type { Database } from '../types/supabase';

// place files you want to import through the `$lib` alias in this folder.
export const average = (array: number[]) => array.reduce((a, b) => a + b) / array.length;

type Reviews = Database['public']['Tables']['reviews']['Row'];
export function getRatingCounts(reviews: Reviews[] = []) {
	const ratingCount = reviews.length;
	const avg = ratingCount ? average(reviews.map((review) => review?.rating ?? 0)) : 0;
	return {
		avg,
		ratingCount,
	};
}
