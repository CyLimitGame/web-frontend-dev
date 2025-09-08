import React from 'react';
import { Center, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import JerseyComplete from './JerseyComplete';

import { CylimitLogo, Text } from '@/components/Common';
import { Jersey, Sponsor } from '@/typings/user.enum';

type Props = {
  nickName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  jersey?: Jersey;
  sponsor?: Sponsor;
};

const ViewCheckEmail = ({
  nickName,
  jersey,
  sponsor,
  primaryColor,
  secondaryColor,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Flex direction="column" alignItems="center">
      <Flex gap={2} alignItems="center">
        <Text fontSize="4xl" fontWeight="bold">
          {t('welcome_in')}
        </Text>
        <CylimitLogo color="cylimitLogoBlue" />
      </Flex>
      <Text fontSize="xl" fontWeight="bold" my={4}>
        {t('team_name', { value: nickName })}
      </Text>
      <Center>
        <JerseyComplete
          jersey={jersey}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          sponsor={sponsor}
        />
      </Center>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textTransform="uppercase"
        color="gray.400"
        mt={4}
        fontStyle="italic"
      >
        {t('to_continue_please_confirm_your_email')}
      </Text>
    </Flex>
  );
};

export default ViewCheckEmail;
