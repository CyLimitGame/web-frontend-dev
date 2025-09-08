import React from 'react';
import { Center, Flex, Icon } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { MdCheckCircle } from 'react-icons/md';

import JerseyComplete from '../SignUp/JerseyComplete';

import { CylimitLogo, Text } from '@/components/Common';
import { Jersey, Sponsor } from '@/typings/user.enum';
import { BaseButton } from '@/components/Button';

type Props = {
  nickName: string;
  primaryColor: string;
  secondaryColor: string;
  jersey: Jersey;
  sponsor: Sponsor;
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
        <Text fontSize="4xl" fontWeight="bold">
          {t('welcome_in')}
        </Text>
        <CylimitLogo color="cylimitLogoBlue" />
      </Flex>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
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
      <Flex color="success.500" alignItems="center" mt={5} gap={2}>
        <Icon as={MdCheckCircle} fontSize="2xl" />
        <Text
          textTransform="uppercase"
          translateText="your_email_is_verified"
        />
      </Flex>
      <BaseButton mt={5} variant="light" w="210px" onClick={onNext}>
        {t('continue')}
      </BaseButton>
    </Flex>
  );
};

export default ShowInfoAndContinue;
