import {
  CYLIMIT_LOGO_BLACK,
  CYLIMIT_LOGO_BLUE,
  CYLIMIT_LOGO_RED,
  CYLIMIT_LOGO_WHITE,
  CYLIMIT_LOGO_YELLOW,
  SHIRT_TYPE1,
  SHIRT_TYPE2,
  SHIRT_TYPE3,
} from './images';

import { RaceType, RoleCard } from '@/typings/card.enum';

import { Jersey, Sponsor } from '@/typings/user.enum';

export const StatusSelect = [
  {
    id: 'leader',
    label: 'leader',
    value: 'leader',
  },
  {
    id: 'climber',
    label: 'climber',
    value: 'climber',
  },
  {
    id: 'sprinter',
    label: 'sprinter',
    value: 'sprinter',
  },
  {
    id: 'domestic',
    label: 'domestic',
    value: 'domestic',
  },
];

export const TypeOfCards = [
  {
    id: 'my_team',
    label: 'my_team',
    value: 'my_team',
  },
  {
    id: 'rider_trainees',
    label: 'rider_trainees',
    value: 'rider_trainees',
  },
];

export const Rarities = [
  {
    id: 'blue',
    label: 'Blue',
    value: 'blue',
  },
  {
    id: 'pink',
    label: 'Pink',
    value: 'pink',
  },
  {
    id: 'yellow',
    label: 'Yellow',
    value: 'yellow',
  },
  {
    id: 'white',
    label: 'white',
    value: 'white',
  },
];

export const GAME_MODES = [
  { id: '1', label: 'Global', value: 'global' },
  { id: '2', label: 'Cap', value: 'cap' },
];

export const SPONSORS = [
  {
    value: Sponsor.CYLIMIT_BLACK,
    src: CYLIMIT_LOGO_BLACK,
  },
  {
    value: Sponsor.CYLIMIT_RED,
    src: CYLIMIT_LOGO_RED,
  },
  {
    value: Sponsor.CYLIMIT_YELLOW,
    src: CYLIMIT_LOGO_YELLOW,
  },
  {
    value: Sponsor.CYLIMIT_BLUE,
    src: CYLIMIT_LOGO_BLUE,
  },
  {
    value: Sponsor.CYLIMIT_WHITE,
    src: CYLIMIT_LOGO_WHITE,
  },
];

export const JERSEYS = [
  { value: Jersey.DEFAULT1, src: SHIRT_TYPE1 },
  { value: Jersey.DEFAULT2, src: SHIRT_TYPE2 },
  { value: Jersey.DEFAULT3, src: SHIRT_TYPE3 },
];

export const ROLE_CARDS = [
  {
    id: RoleCard.LEADER,
    label: RoleCard.LEADER,
    value: RoleCard.LEADER,
  },
  {
    id: RoleCard.CLIMBER,
    label: RoleCard.CLIMBER,
    value: RoleCard.CLIMBER,
  },
  {
    id: RoleCard.SPRINTER,
    label: RoleCard.SPRINTER,
    value: RoleCard.SPRINTER,
  },
  {
    id: RoleCard.DOMESTIC,
    label: RoleCard.DOMESTIC,
    value: RoleCard.DOMESTIC,
  },
  {
    id: RoleCard.FREE_ELECTRON,
    label: RoleCard.FREE_ELECTRON,
    value: RoleCard.FREE_ELECTRON,
  },
];

export const RACE_FILTER = [
  {
    value: RaceType.ACCESS,
    label: 'access',
  },
  {
    value: RaceType.EXPERT,
    label: 'expert',
  },
];
