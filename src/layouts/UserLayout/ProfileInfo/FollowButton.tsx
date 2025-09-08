import React from 'react';
import { RiUserFollowLine } from 'react-icons/ri';
import { useTranslation } from 'next-i18next';

import { BaseButton } from '@/components/Button';
import { useFollowUser } from '@/queries/useUser';

type Props = {
  id: string;
};

const FollowButton = ({ id }: Props) => {
  const { t } = useTranslation();
  const { mutate: followUser, isLoading } = useFollowUser();

  const handleFollow = () => {
    followUser(id as string);
  };
  return (
    <BaseButton
      leftIcon={<RiUserFollowLine />}
      colorScheme="primary"
      size="sm"
      onClick={handleFollow}
      isLoading={isLoading}
    >
      {t('follow')}
    </BaseButton>
  );
};

export default FollowButton;
