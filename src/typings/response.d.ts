import { Bid } from './auction';
import { CardBundleItem, CardItem, FilterCardParams, Team } from './card';
import { UserProfileForm } from './user';
import { User } from './watch';

export type ErrorResponse = {
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
};

export type SignInResponse = {
  accessToken: string;
};

export type UpdatePasswordResponse = {
  id: string;
};

export type UpdateUserProfileResponse = UpdatePasswordResponse;

export type GetUserProfileResponse = UserProfileForm;

export type UpdateAvatarResponse = {
  key: string;
  url: string;
  userId: string;
};

export type DeleteMyAccountResponse = {
  userId: string;
};

export type UpdateCoverResponse = UpdateAvatarResponse;

export type FilterCardParamsResponse = FilterCardParams;

export type ListCardResponse = {
  items: CardItem[] | CardBundleItem[];
  total: number;
};

export type ListTeamResponse = {
  items: Team[];
  total: number;
};

export type ListTeamRankingResponse = {
  items: User[];
  total: number;
};

export type ListTeamScoreResponse = {
  items: User[];
  total: number;
};

export type GetFilterOptionsResponse = {
  yearOfEditions: string[];
  nationalities: string[];
  currentTeams: string[];
  teamCards: string[];
};

export type BidResponse = Bid;
