import _ from 'lodash';

import {
  BLUE_CARD,
  GRAY_CARD,
  NO_CARD,
  RED_CARD,
  YELLOW_CARD,
} from '@/constants/images';

export const upperCaseLastName = (fullName: string) => {
  const nameParts = fullName.split(' ') || [];
  const lastName = _.last(nameParts)?.toUpperCase();
  const formattedName = _.initial(nameParts).join(' ') + ' ' + lastName;
  return formattedName;
};

export const capitalizeAndStartCase = (value: string) => {
  return _.capitalize(_.startCase(value));
};

export const getTemplatePath = (url: string, params?: any) => {
  // Set the placeholder syntax to match the ":" syntax
  _.templateSettings.interpolate = /:([\w]+)/g;

  const compiled = _.template(url);
  const result = compiled(params);
  return result;
};

export const convertToBoolean = (value?: string | boolean) => {
  if (typeof value === 'string') {
    return value === 'true' ? true : false;
  }
  return !!value;
};

export const getRarityImage = (rarity: string) => {
  switch (rarity) {
    case 'blue':
      return BLUE_CARD;
    case 'yellow':
      return YELLOW_CARD;
    case 'pink':
      return RED_CARD;
    default:
      return GRAY_CARD;
  }
};

export const extractInteger = (str: string) => {
  const numericStr = _.replace(str, /[^0-9]/g, '');
  return parseInt(numericStr, 10);
};

export const getCardImage = (item: any) => {
  const rarity = _.get(item, 'rarity');
  return _.get(item, rarity === 'na' ? 'rider.imageUrl' : 'imageUrl', NO_CARD);
};

export const getRiderImage = (item: any, rarity: string) => {
  if (rarity === 'white') {
    return (
      item?.riderId?.freeCard?.imageUrl || item?.riderId?.imageUrl || NO_CARD
    );
  }
  return item.riderId.imageUrl || NO_CARD;
};
