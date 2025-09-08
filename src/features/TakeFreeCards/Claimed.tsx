import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

const Claimed = () => {
  const { t } = useTranslation();
  return (
    <Box mt={10}>
      <Text
        translateText="you_are_claimed"
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
      />
      <Center>
        <BaseButton
          onClick={() => navigateTo(PATH.MY_TEAM)}
          mt={2}
          variant="light"
        >
          {t('back_to_my_team')}
        </BaseButton>
      </Center>
    </Box>
  );
};

export default Claimed;
