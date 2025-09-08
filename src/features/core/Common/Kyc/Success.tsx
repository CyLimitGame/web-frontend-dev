import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useTranslation } from 'next-i18next';

import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { API_PATH } from '@/apis';

type Props = {
  onSubmit: () => void;
};

const Success = ({ onSubmit }: Props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries(API_PATH.GET_KYC_DETAILS);
    };
  }, []);

  return (
    <Box textAlign="center">
      <Text fontSize="6xl" textAlign="center">
        🎉
      </Text>
      <Text fontWeight="bold" translateText="congratulation" />
      <Text
        fontSize="sm"
        mt={2}
        translateText="you_have_successfully_authenticated_your_id"
      />
      <BaseButton mt={4} variant="light" onClick={onSubmit}>
        {t('done')}
      </BaseButton>
    </Box>
  );
};

export default Success;
