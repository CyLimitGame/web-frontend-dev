import React from 'react';
import { Center, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { CylimitLogo, JerseyWithSponsor, Text } from '@/components/Common';
import { Jersey, Sponsor } from '@/typings/user.enum';
import { BaseButton } from '@/components/Button';

type Props = {
  nickName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  jersey?: Jersey;
  sponsor?: Sponsor;
  onNext: () => void;
};

const ShowInfoAndContinue = ({
  nickName,
  jersey,
  sponsor,
  primaryColor,
  secondaryColor,
  onNext,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Flex direction="column" alignItems="center">
      <Flex gap={2} alignItems="center">
        <Text fontSize={['lg', 'lg', '4xl']} fontWeight="bold">
          {t('welcome_in')}
        </Text>
        <CylimitLogo color="cylimitLogoBlue" />
      </Flex>
      <Text fontSize={['lg', 'xl']} fontWeight="bold" my={4}>
        {t('team_name', { value: nickName })}
      </Text>
      <Center>
        <JerseyWithSponsor
          jersey={jersey as Jersey}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          sponsor={sponsor as Sponsor}
          fontSize={['250px', '320px']}
        />
      </Center>
      <BaseButton mt={5} variant="light" w="210px" onClick={onNext}>
        {t('continue')}
      </BaseButton>
    </Flex>
  );
};

export default ShowInfoAndContinue;
