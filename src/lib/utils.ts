import type { Brand } from '../app';
import type { Reviews } from '../types/supabase';
import _isString from 'lodash/isString';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

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

export function getBrandSlug(brand: Brand) {
    return `${brand.id}-${brand.name.toLowerCase().replace(/ /g, '-')}`;
}

export function slugify(string: string) {
    if (!_isString(string) || _isEmpty(string)) {
      return "";
    }
  
    return _get(string, "toString", () => string)
      .call(string)
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }