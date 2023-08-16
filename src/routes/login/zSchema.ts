import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'email is required' })
		.min(1)
		.max(64, { message: 'email must be less than 64 characters' })
		.email({ message: 'must be a valid email address' }),
	password: z
		.string({ required_error: 'password is required' })
		.min(6, { message: 'password must be more than 6 characters' })
		.max(32, { message: 'password must be less than 32 characters' })
		.trim(),
});
