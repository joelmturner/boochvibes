export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			brands: {
				Row: {
					address: string | null;
					city: string | null;
					created_at: string;
					id: number;
					name: string | null;
					state: string | null;
					url: string | null;
					zip: number | null;
				};
				Insert: {
					address?: string | null;
					city?: string | null;
					created_at?: string;
					id?: number;
					name?: string | null;
					state?: string | null;
					url?: string | null;
					zip?: number | null;
				};
				Update: {
					address?: string | null;
					city?: string | null;
					created_at?: string;
					id?: number;
					name?: string | null;
					state?: string | null;
					url?: string | null;
					zip?: number | null;
				};
				Relationships: [];
			};
			kombuchas: {
				Row: {
					added_by_user: string | null;
					alcohol_level: number | null;
					brand_id: number | null;
					category: string | null;
					color: string | null;
					created_at: string | null;
					description: string | null;
					id: number;
					image_url: string | null;
					ingredients: string | null;
					moderation: string;
					name: string | null;
					organic: boolean | null;
					product_url: string | null;
				};
				Insert: {
					added_by_user?: string | null;
					alcohol_level?: number | null;
					brand_id?: number | null;
					category?: string | null;
					color?: string | null;
					created_at?: string | null;
					description?: string | null;
					id?: number;
					image_url?: string | null;
					ingredients?: string | null;
					moderation?: string;
					name?: string | null;
					organic?: boolean | null;
					product_url?: string | null;
				};
				Update: {
					added_by_user?: string | null;
					alcohol_level?: number | null;
					brand_id?: number | null;
					category?: string | null;
					color?: string | null;
					created_at?: string | null;
					description?: string | null;
					id?: number;
					image_url?: string | null;
					ingredients?: string | null;
					moderation?: string;
					name?: string | null;
					organic?: boolean | null;
					product_url?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'kombuchas_added_by_user_fkey';
						columns: ['added_by_user'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'kombuchas_brand_id_fkey';
						columns: ['brand_id'];
						referencedRelation: 'brands';
						referencedColumns: ['id'];
					}
				];
			};
			reviews: {
				Row: {
					created_at: string | null;
					id: number;
					kombucha_id: number | null;
					rating: number | null;
					review: string | null;
					user_id: string | null;
				};
				Insert: {
					created_at?: string | null;
					id?: number;
					kombucha_id?: number | null;
					rating?: number | null;
					review?: string | null;
					user_id?: string | null;
				};
				Update: {
					created_at?: string | null;
					id?: number;
					kombucha_id?: number | null;
					rating?: number | null;
					review?: string | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'reviews_kombucha_id_fkey';
						columns: ['kombucha_id'];
						referencedRelation: 'kombuchas';
						referencedColumns: ['id'];
					}
				];
			};
			user_details: {
				Row: {
					bio: string | null;
					created_at: string;
					first_name: string | null;
					id: number;
					last_name: string | null;
					profile_url: string | null;
					user_id: string;
					username: string;
				};
				Insert: {
					bio?: string | null;
					created_at?: string;
					first_name?: string | null;
					id?: number;
					last_name?: string | null;
					profile_url?: string | null;
					user_id: string;
					username: string;
				};
				Update: {
					bio?: string | null;
					created_at?: string;
					first_name?: string | null;
					id?: number;
					last_name?: string | null;
					profile_url?: string | null;
					user_id?: string;
					username?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'user_details_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}

export type SocialLink = 'twitter' | 'facebook' | 'instagram' | 'youtube';
