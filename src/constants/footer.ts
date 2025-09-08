import { FaLinkedin, FaTwitterSquare, FaDiscord } from 'react-icons/fa';
import { RiInstagramFill, RiYoutubeFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';

import { PATH } from './path';

import {
  NEXT_PUBLIC_DISCORD_SOCIAL,
  NEXT_PUBLIC_INSTAGRAM_SOCIAL,
  NEXT_PUBLIC_LINKEDIN_SOCIAL,
  NEXT_PUBLIC_TWITTER_SOCIAL,
  NEXT_PUBLIC_YOUTUBE_SOCIAL,
} from '@/config/appConfig';

export const NAVIGATE_LIST = [
  {
    text: 'market',
    path: PATH.MARKET,
  },
  {
    text: 'my_team',
    path: PATH.MY_TEAM,
  },
  {
    text: 'game',
    path: PATH.GAME,
  },
  {
    text: 'invite_friends',
    path: PATH.INVITE_FRIENDS,
  },
  {
    text: 'partners',
    path: PATH.PARTNERS,
  },
];

export const GUIDE_LIST = [
  {
    text: 'help',
    path: PATH.HELP,
  },
  {
    text: 'cookie_policy',
    path: PATH.COOKIES_POLICY,
  },
  {
    text: 'legals_notice',
    path: PATH.LEGALS_NOTICE,
  },
  {
    text: 'terms_of_service',
    path: PATH.TERMS_OF_SERVICE,
  },
  {
    text: 'privacy_policy',
    path: PATH.PRIVACY_POLICY,
  },
];

export const SOCIAL_LIST = [
  {
    as: FaLinkedin,
    fontSize: 30,
    path: NEXT_PUBLIC_LINKEDIN_SOCIAL,
  },
  {
    as: FaTwitterSquare,
    fontSize: 30,
    path: NEXT_PUBLIC_TWITTER_SOCIAL,
  },
  {
    as: RiInstagramFill,
    fontSize: 32,
    path: NEXT_PUBLIC_INSTAGRAM_SOCIAL,
  },
  {
    as: RiYoutubeFill,
    fontSize: 38,
    path: NEXT_PUBLIC_YOUTUBE_SOCIAL,
  },
  {
    as: FaDiscord,
    fontSize: 38,
    path: NEXT_PUBLIC_DISCORD_SOCIAL,
  },
  {
    as: MdEmail,
    fontSize: 34,
    path: 'mailto:contact@cylimit.com',
  },
];
