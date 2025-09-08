import _omitBy from 'lodash/omitBy';
import _isEmpty from 'lodash/isEmpty';

import { Chain } from '@/typings/network.enum';

export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const NEXT_PUBLIC_GOOGLE_AUTH_ID =
  process.env.NEXT_PUBLIC_GOOGLE_AUTH_ID ||
  '330041048247-185g5p39s1j35nvh28oahmo16o1jri21.apps.googleusercontent.com';

export const NEXT_PUBLIC_FACEBOOK_AUTH_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_AUTH_ID || '';

export const NEXT_PUBLIC_RAMP_API_KEY =
  process.env.NEXT_PUBLIC_RAMP_API_KEY || '';

export const NEXT_PUBLIC_RAMP_URL = process.env.NEXT_PUBLIC_RAMP_URL || '';

export const NEXT_PUBLIC_RAMP_APP_NAME =
  process.env.NEXT_PUBLIC_RAMP_APP_NAME || '';

export const NEXT_PUBLIC_RAMP_LOGO_URL =
  process.env.NEXT_PUBLIC_RAMP_LOGO_URL || '';

export const NEXT_PUBLIC_RAMP_USDC_ASSET =
  process.env.NEXT_PUBLIC_RAMP_USDC_ASSET || 'MATIC_TEST';

export const NEXT_PUBLIC_RAMP_WEBHOOK_URL =
  'https://api-dev.cylimit.com/v1/webhook/ramp/payments';

// Social
export const NEXT_PUBLIC_LINKEDIN_SOCIAL =
  process.env.NEXT_PUBLIC_LINKEDIN_SOCIAL ||
  'https://www.linkedin.com/company/cylimit/';
export const NEXT_PUBLIC_TWITTER_SOCIAL =
  process.env.NEXT_PUBLIC_TWITTER_SOCIAL || 'https://twitter.com/cylimit_game';
export const NEXT_PUBLIC_INSTAGRAM_SOCIAL =
  process.env.NEXT_PUBLIC_INSTAGRAM_SOCIAL ||
  'https://www.instagram.com/cylimit_game';

export const NEXT_PUBLIC_YOUTUBE_SOCIAL =
  process.env.NEXT_PUBLIC_YOUTUBE_SOCIAL ||
  'https://www.youtube.com/@cylimit8347';

export const NEXT_PUBLIC_DISCORD_SOCIAL =
  process.env.NEXT_PUBLIC_DISCORD_SOCIAL || 'https://discord.gg/5nTzbYx6qw';

// Contract
export const NEXT_PUBLIC_USDC_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS ||
  '0xE097d6B3100777DC31B34dC2c58fB524C2e76921';

export const NEXT_PUBLIC_USDC_DECIMAL =
  process.env.NEXT_PUBLIC_USDC_DECIMAL || 18;

export const NEXT_PUBLIC_POLYGON_CHAIN = parseInt(
  process.env.NEXT_PUBLIC_POLYGON_CHAIN || `${Chain.POLYGON_TESTNET}`,
  10
);

export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
  'pk_test_51LwNM9JlXUO3Z1lfMDF3BvLnjdkuLw8Bx3WPAIzFQw4nwrD3TGDmJSiiolL4LjckiwfpEUhyS4kd1RtCOOrsmTkg00H95Ep0WF';

export const NEXT_PUBLIC_ADMIN_WALLET =
  process.env.NEXT_PUBLIC_ADMIN_WALLET ||
  '0x4e0b06be61a4347cfa0c393090bbe071dfa5b96a';

export const RAMP_CONFIG = {
  hostAppName: NEXT_PUBLIC_RAMP_APP_NAME,
  url: NEXT_PUBLIC_RAMP_URL,
  swapAsset: NEXT_PUBLIC_RAMP_USDC_ASSET,
  hostLogoUrl: NEXT_PUBLIC_RAMP_LOGO_URL,
  ..._omitBy(
    {
      hostApiKey: NEXT_PUBLIC_RAMP_API_KEY,
    },
    _isEmpty
  ),
};

export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const NEXT_PUBLIC_POLYGON_SCAN =
  process.env.NEXT_PUBLIC_POLYGON_SCAN || 'https://polygonscan.com';

export const NEXT_PUBLIC_GAME_BANNER =
  process.env.NEXT_PUBLIC_GAME_BANNER ||
  'https://cylimit-public.s3.eu-west-3.amazonaws.com/game/cylimit_banner_leagues_feb.png';

// Game ranking
export const NEXT_PUBLIC_GAME_RANKING_BACKGROUND =
  process.env.NEXT_PUBLIC_GAME_RANKING_BACKGROUND ||
  'https://cylimit-public.s3.eu-west-3.amazonaws.com/game/rankingleague.png';

export const NEXT_PUBLIC_GAME_CYLIMIT_SCORING =
  process.env.NEXT_PUBLIC_GAME_CYLIMIT_SCORING ||
  'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/cylimit_scoring.png';

export const NEXT_PUBLIC_HELP_PAGE_URL =
  process.env.NEXT_PUBLIC_HELP_PAGE_URL ||
  'https://cylimitsupport.zendesk.com/';

// TODO hardcode for old games
export const NEXT_PUBLIC_RANKING_LEAGUE_IDS =
  process.env.NODE_ENV === 'production'
    ? [
        '63bd42bb359605ee0f35e353',
        '63bd42c2359605ee0f35e39c',
        '63bd42c6359605ee0f35e3b2',
        '63bd42c9359605ee0f35e3be',
      ]
    : [
        '63bce06d8121756d03745f09',
        '63bd0b9e36c4dfac63249968',
        '63bd0ba336c4dfac63249972',
        '63bd2410aa962f8fb3f09566',
      ];

export const NEXT_PUBLIC_LINK_TWITTER_ACCOUNT =
  process.env.NEXT_PUBLIC_LINK_TWITTER_ACCOUNT;

export const NEXT_PUBLIC_LINK_DISCORD_ACCOUNT =
  process.env.NEXT_PUBLIC_LINK_DISCORD_ACCOUNT;

export const NEXT_PUBLIC_BANNER_RIDER_SCORE =
  process.env.NEXT_PUBLIC_BANNER_RIDER_SCORE ||
  'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/boxscore.png';

export const NEXT_PUBLIC_BANNER_RIDER_COLLECTION =
  process.env.NEXT_PUBLIC_BANNER_RIDER_COLLECTION ||
  'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/rider_collections.png';

export const NEXT_PUBLIC_BANNER_MY_TEAM =
  process.env.NEXT_PUBLIC_BANNER_MY_TEAM ||
  'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/myteam.png';
