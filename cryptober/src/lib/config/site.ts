import { env } from '../env';

export const site = {
  url: new URL(env.NEXT_PUBLIC_SITE_URL),
  name: env.NEXT_PUBLIC_PROJECT,
  coinId: env.NEXT_PUBLIC_COIN_ID ?? '',
  contract: env.NEXT_PUBLIC_MINT ?? '',
};
