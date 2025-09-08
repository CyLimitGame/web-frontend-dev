import React from 'react';
import { useTranslation } from 'next-i18next';
import { Box, useDisclosure } from '@chakra-ui/react';
import NextImage from 'next/image';

import { BaseButton } from '@/components/Button';
import { NEXT_PUBLIC_GAME_CYLIMIT_SCORING } from '@/config/appConfig';
import { BaseModal } from '@/components/Modal';

const CyLimitScoringButton = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <BaseButton onClick={onOpen} size={['md', 'md', 'lg']} variant="outline">
        {t('cyLimit_scoring')}
      </BaseButton>
      <BaseModal
        closeable
        isOpen={isOpen}
        size="full"
        title="cyLimit_scoring"
        onClose={onClose}
      >
        <Box w="100%" sx={{ aspectRatio: '0.7' }} pos="relative">
          <NextImage
            src={NEXT_PUBLIC_GAME_CYLIMIT_SCORING}
            layout="fill"
            unoptimized
            objectFit="contain"
          />
        </Box>
      </BaseModal>
    </>
  );
};

export default CyLimitScoringButton;
