import { NftsPurchased } from './rewards';
import {
  FreeCardsTeamStatusEnum,
  Jersey,
  KycStatus,
  Sponsor,
} from './user.enum';

export type SignInForm = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

export type SignUpForm = Shirt & {
  nickName: string;
  email: string;
  password: string;
  passwordToConfirm: string;
  refInvitationCode: string;
  is18YearOld?: boolean;
  isReadTermsAndConditions?: boolean;
};

export type UserProfileForm = Shirt & {
  id?: string;
  nickName?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  email?: string;
  phoneNumber?: string;
  invitationCode?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
  coverUrl?: string;
  isPasswordEmpty?: boolean;
  totalBalance?: number;
  walletAddress?: string;
  totalXp?: number;
  discord?: any;
  twitter?: any;
  nftsPurchased?: NftsPurchased;
  refInvitationCode?: string;
  freeCardsTeamStatus?: FreeCardsTeamStatusEnum;
  level?: number;
  totalXpToNextLevel?: number;
  isNewLevel?: boolean;
  isUnderstandingCaptainRule?: boolean;
  isFirstTeamCreation?: boolean;
};

export type UserReferral = {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

export type EditProfileForm = UserProfileForm;

export type CountMyTeamTabs = {
  countWhiteCards: number;
  countNfts: number;
  countWinningAuctions: number;
  countWinningBundleAuctions: number;
};

export type LinkAccount = {
  code?: string;
  unlink?: boolean;
  type: 'discord' | 'twitter';
};

export type UserFollowing = {
  _id: string;
  nickName: string;
  avatarUrl?: string;
};

export type Shirt = {
  jersey?: Jersey;
  primaryColor?: string;
  secondaryColor?: string;
  sponsor?: Sponsor;
};

export type UserLevel = {
  level: number;
  totalBidon: number;
  titleEn: string;
  imageUrlEn: string;
  titleFr: string;
  imageUrlFr: string;
};

export type KycPersonalInfo = {
  firstName: string;
  lastName: string;
  nationality: string;
  dateOfBirth: string;
};

export type KycDocument = {
  file: File;
};

export type KycDetails = KycPersonalInfo & {
  status: KycStatus;
};
