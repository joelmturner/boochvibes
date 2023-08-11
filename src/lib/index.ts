// place files you want to import through the `$lib` alias in this folder.
export const average = (array: number[]) => array.reduce((a, b) => a + b) / array.length;

export function getRatingCounts(reviews: { rating: number; [key: string]: any }[] = []) {
	const ratingCount = reviews.length;
	const avg = ratingCount ? average(reviews.map((review) => review?.rating ?? 0)) : 0;
	return {
		avg,
		ratingCount
	};
}
