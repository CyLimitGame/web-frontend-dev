import React from 'react';
import { useTranslation } from 'next-i18next';
import { BsPlusLg } from 'react-icons/bs';

import { Icon } from '@chakra-ui/react';

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
      leftIcon={<Icon as={BsPlusLg} />}
      variant="outline"
      size={['sm', 'md', 'md', 'lg']}
      onClick={handleFollow}
      isLoading={isLoading}
      paddingInline="24px"
      borderRadius="8px"
    >
      {t('follow')}
    </BaseButton>
  );
};

export default FollowButton;
