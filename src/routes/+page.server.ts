import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data } = await supabase.from('kombucha').select(`
        id,
        name,
        attributes (
            *
        ),
        reviews (
            *
        )
    `);
	return {
		kombucha: data ?? []
	};
}
