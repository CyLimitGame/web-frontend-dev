import { parsePhoneNumber } from 'react-phone-number-input';
import _ from 'lodash';

import { Bid } from '@/typings/auction';
import { BundleBid } from '@/typings/bundle';
import { SellNft } from '@/typings/fixed';
import { FilterCardRequest } from '@/typings/request';
import { SignUpForm, UserProfileForm } from '@/typings/user';
import { CreateTeam } from '@/typings/game';

export const sanitizeRequestCards = (params: FilterCardRequest) => {
  const {
    page,
    limit,
    teamId,
    marketType,
    nationality,
    fromScore,
    toScore,
    fromAge,
    toAge,
    status,
    rarity,
    yearOfEdition,
    sortBy,
    firstSerialNumber,
    orderBy,
    typeOfCard,
    isMyFavorite,
  } = params;

  return {
    page,
    limit,
    teamId,
    marketType,
    nationality,
    fromScore,
    toScore,
    fromAge,
    toAge,
    status,
    rarity,
    yearOfEdition,
    sortBy,
    serialNumber: firstSerialNumber,
    orderBy,
    typeOfCard,
    isFavorite: isMyFavorite,
  };
};

export const sanitizeRequestBidItem = ({ nftId, amount }: Bid) => {
  return {
    nftId,
    amount: Number(amount),
  };
};

export const sanitizeSellItem = ({ fixedPrice }: SellNft) => {
  return {
    fixedPrice: Number(fixedPrice),
  };
};

export const sanitizeRequestBidBundleItem = ({
  bundleId,
  amount,
}: BundleBid) => {
  return {
    bundleId,
    amount: Number(amount),
  };
};

export const sanitizeSignUp = ({
  nickName,
  email,
  password,
  passwordToConfirm,
  refInvitationCode,
  jersey,
  primaryColor,
  secondaryColor,
  sponsor,
}: SignUpForm) => {
  return {
    nickName,
    email,
    password,
    passwordToConfirm,
    refInvitationCode: refInvitationCode || undefined,
    jersey,
    primaryColor,
    secondaryColor,
    sponsor,
  };
};

export const sanitizeEditProfile = ({
  firstName,
  lastName,
  dateOfBirth,
  phoneNumber,
  nickName,
}: UserProfileForm) => {
  return {
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
    nickName,
    country: parsePhoneNumber(phoneNumber as string)?.country,
  };
};

export const sanitizeCreateTeam = ({
  captainId,
  nfts,
  divisionId,
}: CreateTeam) => {
  const listNft = _.filter(nfts, ({ rarity }) => rarity !== 'trainee');
  const listNa = _.filter(nfts, ({ rarity }) => rarity === 'trainee');

  const nftIds = _.map(listNft, ({ id, role, index }) => ({
    id,
    role,
    index,
  }));
  const naCardIds = _.map(listNa, ({ id, role, index }) => ({
    id,
    role,
    index,
  }));

  return {
    nftIds: nftIds,
    naCardIds,
    captainId,
    divisionId,
  };
};

export const sanitizeUpdateTeam = (data: CreateTeam) => {
  return {
    ...sanitizeCreateTeam(data),
    teamId: data.teamId,
  };
};
