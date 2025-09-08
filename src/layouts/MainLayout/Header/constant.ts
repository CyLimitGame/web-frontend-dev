import {
  MdWorkspacesOutline,
  MdStorefront,
  MdOutlineGamepad,
  MdOutlinePersonAddAlt1,
  MdHelpOutline,
} from 'react-icons/md';

import { IconType } from 'react-icons';

import { PATH } from '@/constants/path';

const { MARKET, ALL_CARDS, MY_TEAM, GAME, INVITE_FRIENDS, HELP } = PATH;

export type SubLink = {
  id?: string;
  text: string;
  path: string;
  paths: string[];
  icon?: IconType;
};

export type MainLink = SubLink & {
  text: string;
  path: string;
  paths: string[];
  subs?: SubLink[];
  icon?: IconType;
};

export const links: MainLink[] = [
  {
    text: 'market',
    path: MARKET,
    paths: [MARKET, ALL_CARDS],
    icon: MdStorefront,
    subs: [
      {
        text: 'auction',
        icon: MdStorefront,
        path: `${MARKET}?marketType=auction`,
        paths: [MARKET],
      },
      {
        text: 'manager_sales',
        icon: MdStorefront,
        path: `${MARKET}?marketType=fixed&filterBy=best_value`,
        paths: [MARKET],
      },
    ],
  },
  {
    text: 'my_team',
    path: MY_TEAM,
    paths: [MY_TEAM],
    icon: MdWorkspacesOutline,
  },
  {
    text: 'game',
    path: GAME,
    paths: [GAME],
    icon: MdOutlineGamepad,
  },
  {
    text: 'invite_friends',
    path: INVITE_FRIENDS,
    paths: [INVITE_FRIENDS],
    icon: MdOutlinePersonAddAlt1,
  },
  {
    text: 'help',
    path: HELP,
    paths: [HELP],
    icon: MdHelpOutline,
  },
];
