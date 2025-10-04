import { z } from 'zod';

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_PROJECT: z.string().min(1).default('$cryptober'),
  NEXT_PUBLIC_COIN_ID: z.string().optional(),
  NEXT_PUBLIC_MINT: z.string().optional(),
});

const raw = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_PROJECT: process.env.NEXT_PUBLIC_PROJECT,
  NEXT_PUBLIC_COIN_ID: process.env.NEXT_PUBLIC_COIN_ID,
  NEXT_PUBLIC_MINT: process.env.NEXT_PUBLIC_MINT,
};

const parsed = schema.safeParse(raw);
if (!parsed.success) {
  throw new Error('Invalid environment');
}

export const env = parsed.data;
