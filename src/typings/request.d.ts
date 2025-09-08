import { FilterCards } from './card';

export type FilterCardRequest = FilterCards;

export type SigninWithSocial = {
  token: string;
  refInvitationCode?: string;
};
