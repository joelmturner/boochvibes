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

export type User = {
	id: number;
	created_at: string;
	profile_url: string;
	username: string;
	user_id: string;
};

export type Review = {
	id: number;
	created_at: string; // date
	kombucha_id: string;
	user_id: string; // user
	rating: number;
	review: string;
	user: User;
};

export type Brand = {
	id: number;
	name: string;
	address: string;
	city: string;
	state: string;
	zip: number;
};

export type Rating = {
	avg: number;
	count: number;
};

export type Kombucha = {
	id: number;
	name: string;
	brand: Brand;
	rating: Rating;
	image_url: string;
	product_url: string;
} & Partial<{
	category: string;
	color: string;
	alcohol_level: number;
	organic: boolean;
	description: string;
}>;

export type KombuchaWithReviews = Kombucha & {
	reviews: Review[];
};
