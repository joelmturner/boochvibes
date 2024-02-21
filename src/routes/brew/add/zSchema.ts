import { z } from 'zod';

export const addBoochSchema = z.object({
	name: z
		.string({ required_error: 'name is required' })
		.min(2, { message: 'name must be at least 1 characters' })
		.max(124, { message: 'name must be less than 124 characters' })
		.trim(),
	description: z.string().min(1).max(288).trim().nullish(),
	ingredients: z.string().min(1).max(288).trim().nullish(),
	product_url: z.union([z.string().url().nullish(), z.literal('')]),
	image_url: z.union([z.string().url().nullish(), z.literal('')]),
	brand: z.object({
		label: z.string(),
		value: z.union([z.string().min(1).max(124).trim(), z.number()]).default(0),
	}),
	organic: z.enum(['on', 'off']).nullish(),
});
