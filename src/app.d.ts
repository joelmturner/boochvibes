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
