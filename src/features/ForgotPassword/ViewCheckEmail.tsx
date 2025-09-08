import React from 'react';
import { Center, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { Text } from '@/components/Common';

type Props = {
  email: string;
};

const ViewCheckEmail = ({ email }: Props) => {
  const { t } = useTranslation();

  return (
    <Center flexDirection="column" mt={4}>
      <Stack>
        <Text
          textAlign="center"
          fontSize="xl"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {t('the_email_has_been_sent_to_your_inbox')}
        </Text>
        <Text textAlign="center">{t('check_your_email')}</Text>
        <Text textAlign="center" fontWeight="bold">
          {email}
        </Text>
      </Stack>
    </Center>
  );
};

export default ViewCheckEmail;
