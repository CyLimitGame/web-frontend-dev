import React, { useEffect, useState } from 'react';
import { Center, Checkbox, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { BaseModal } from '@/components/Modal';
import { CardImageLoader } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { useGetUserProfile, useSkipFirstTeamCreation } from '@/queries/useUser';

const INFO_VIEW =
  'https://cylimit-public.s3.eu-west-3.amazonaws.com/awards/Scarcities+3.png';

const InfoModal = () => {
  const { t } = useTranslation();
  const { data } = useGetUserProfile();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate } = useSkipFirstTeamCreation();
  const [isChecked, setIsChecked] = useState(false);

  const handleClose = () => {
    onClose();
    if (isChecked) {
      mutate();
    }
  };

  useEffect(() => {
    if (data && !data.isFirstTeamCreation) {
      onOpen();
    }
  }, [data]);

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} size="2xl">
      <CardImageLoader src={INFO_VIEW} aspectRatio="2" />
      <Center mt={4}>
        <Checkbox
          textTransform="initial"
          isChecked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        >
          {t('do_not_show_again')}
        </Checkbox>
      </Center>
      <Center mt={4}>
        <BaseButton variant="light" onClick={handleClose} size={['sm', 'lg']}>
          {t('continue')}
        </BaseButton>
      </Center>
    </BaseModal>
  );
};

export default React.memo(InfoModal);
