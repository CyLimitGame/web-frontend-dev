import React from 'react';
import { RiUserUnfollowLine } from 'react-icons/ri';
import { useTranslation } from 'next-i18next';

import { BaseButton } from '@/components/Button';
import { useUnfollowUser } from '@/queries/useUser';

type Props = {
  id: string;
};

const UnfollowButton = ({ id }: Props) => {
  const { t } = useTranslation();
  const { mutate: unfollowUser, isLoading } = useUnfollowUser();

  const handleUnfollow = () => {
    unfollowUser(id as string);
  };
  return (
    <BaseButton
      leftIcon={<RiUserUnfollowLine />}
      colorScheme="primary"
      size="sm"
      onClick={handleUnfollow}
      isLoading={isLoading}
    >
      {t('unfollow')}
    </BaseButton>
  );
};

export default UnfollowButton;
