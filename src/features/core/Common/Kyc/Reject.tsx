import { Box, Icon } from '@chakra-ui/react';
import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';
import { useTranslation } from 'next-i18next';

import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';

type Props = {
  onRetry: () => void;
};

const Reject = ({ onRetry }: Props) => {
  const { t } = useTranslation();
  return (
    <Box textAlign="center">
      <Icon as={TbFaceIdError} color="error.500" fontSize="6xl" />
      <Text fontWeight="bold" translateText="reject" />
      <Text fontSize="sm" mt={2} translateText="your_id_has_been_refused" />
      <BaseButton mt={4} variant="light" onClick={onRetry}>
        {t('retry')}
      </BaseButton>
    </Box>
  );
};

export default Reject;
