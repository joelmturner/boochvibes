import { z } from 'zod';

export const profileSchema = z.object({
	username: z
		.string({ required_error: 'username is required' })
		.min(2, { message: 'username must be at least 2 characters' })
		.max(64, { message: 'username must be less than 64 characters' })
		.trim(),
	profile_url: z.union([z.string().url().nullish(), z.literal('')]),
	first_name: z.string().min(1).max(64).trim().nullish(),
	last_name: z.string().min(1).max(64).trim().nullish(),
	bio: z.string().min(1).max(288).trim().nullish(),
});
