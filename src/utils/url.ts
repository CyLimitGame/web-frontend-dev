import { NEXT_PUBLIC_BASE_URL } from '@/config/appConfig';
import { PATH } from '@/constants/path';

export const getInviteUrl = (code?: string) => {
  return `${NEXT_PUBLIC_BASE_URL}${PATH.SIGNIN}?inviteCode=${code}`;
};
