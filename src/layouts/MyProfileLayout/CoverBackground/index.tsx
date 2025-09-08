import React, { useState } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { AiOutlineCamera } from 'react-icons/ai';
import { useTranslation } from 'next-i18next';

import { BaseButton } from '@/components/Button';
import { UploadBackgroundProfileModal } from '@/features/core/Modal';
import { useGetUserProfile } from '@/queries/useUser';

const CoverBackground = () => {
  const [visibleModalUpload, setVisibleModalUpload] = useState(false);
  const { data } = useGetUserProfile();

  const { t } = useTranslation();

  const handleToggleUpload = () => {
    setVisibleModalUpload(true);
  };

  return (
    <Box
      height="300px"
      position="relative"
      bg="gray.100"
      backgroundImage={`url("${data?.coverUrl}")`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Box
        position="absolute"
        bottom="12px"
        right="12px"
        onClick={handleToggleUpload}
        display={['block', 'block', 'block', 'none']}
      >
        <Icon as={AiOutlineCamera} color="white" fontSize={32} />
      </Box>
      <BaseButton
        shadow="md"
        leftIcon={<Icon as={AiOutlineCamera} />}
        position="absolute"
        bottom="20px"
        right="20px"
        backgroundColor="white"
        onClick={handleToggleUpload}
        display={['none', 'none', 'none', 'block']}
      >
        {t('change_cover')}
      </BaseButton>
      <UploadBackgroundProfileModal
        isOpen={visibleModalUpload}
        onClose={() => setVisibleModalUpload(false)}
      />
    </Box>
  );
};

export default CoverBackground;
