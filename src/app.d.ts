// See https://kit.svelte.dev/docs/types#app

import type { Session } from '@supabase/supabase-js';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: ReturnType<typeof createSupabaseServerClient>;
			getSession: () => Promise<Session> | null;
		}
		interface PageData {
			session: import('@supabase/supabase-js').Session | null;
		}
		// interface Platform {}
	}
}

export {};

export type Theme = 'system' | 'light' | 'dark';



export type Review = {
	id: number;
	created_at: string | null; // date
	kombucha_id: number | null;
	rating: number | null;
	review: string | null;
	user?: Tables<'user_details'>;
};

export type Brand = {
	id: number;
	name: string;
	address: string;
	city: string;
	state: string;
	zip: number;
    url: string;
};

export type Rating = {
	avg: number;
	count: number;
	starCounts: {
		'1': number;
		'2': number;
		'3': number;
		'4': number;
		'5': number;
	};
};

export type Kombucha = {
	id: number;
	name: string | null;
	brand: Tables<'brands'>;
	rating: Rating;
	image_url: string | null;
	category: string | null;
	color: string | null;
	alcohol_level: number | null;
	organic: boolean | null;
	description: string | null;
};

export type KombuchaWithReviews = Kombucha & {
	reviews?: Review[];
};
