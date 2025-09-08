import _ from 'lodash';
type User = {
  firstName?: string;
  lastName?: string;
};

export const getFullName = (user: Partial<User> | undefined) => {
  const firstName = _.get(user, 'firstName', '');
  const lastName = _.get(user, 'lastName', '');
  const nickName = _.get(user, 'nickName');
  const fullName = `${firstName} ${lastName}`.trim();
  return nickName || fullName;
};

type UserBackGroundOption = {
  from?: number;
  to?: number;
  isRevert?: boolean;
};

export const getUserBackGround = (
  colors?: { primaryColor?: string; secondaryColor?: string },
  { from, isRevert, to }: UserBackGroundOption = {}
) =>
  `linear-gradient(${isRevert ? 270 : 90}deg, ${
    colors?.primaryColor || '#ffffff'
  }f0 ${from || 0}%, ${colors?.secondaryColor || '#ffffff'}00 ${to || 100}%)`;
