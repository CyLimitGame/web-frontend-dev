import React from 'react';
import { Box, Center, Flex, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { Text } from '@/components/Common';
import { REGISTER_BG } from '@/constants/images';
import { BaseButton } from '@/components/Button';
import { FacebookButton, GoogleButton } from '@/features/core/Button';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

const Register = () => {
  const { t } = useTranslation();
  return (
    <Box w="100%">
      <Text
        translateText="registration"
        textTransform="uppercase"
        fontWeight="bold"
        fontSize="xl"
        textAlign="center"
        mb={5}
      />
      <Box pos="relative" aspectRatio="1">
        <Image src={REGISTER_BG} layout="fill" />
        <Box pos="absolute" left={0} right={0} top={0} bottom={0}>
          <Flex h="100%" alignItems="end" justifyContent="center" p={4}>
            <Stack>
              <Text
                textAlign="center"
                fontWeight="bold"
                fontSize="3xl"
                maxW="300px"
                textTransform="uppercase"
              >
                {t('create_your_team_and_play')}
              </Text>
              <Center>
                <BaseButton
                  w="170px"
                  variant="light"
                  onClick={() => navigateTo(PATH.SIGNUP)}
                  textTransform="uppercase"
                >
                  {t('get_started')}
                </BaseButton>
              </Center>
            </Stack>
          </Flex>
        </Box>
      </Box>
      <Center mt={4}>
        <Text
          color="gray.500"
          pos="relative"
          _before={{
            pos: 'absolute',
            content: `""`,
            width: '60px',
            height: '1px',
            bg: 'gray.500',
            left: '-68px',
            top: '10px',
          }}
          _after={{
            pos: 'absolute',
            content: `""`,
            width: '60px',
            height: '1px',
            bg: 'gray.500',
            right: '-68px',
            top: '10px',
          }}
          textTransform="uppercase"
        >
          {t('or_continue_with')}
        </Text>
      </Center>
      <Center mt={4}>
        <Flex gap={2}>
          <FacebookButton />
          <GoogleButton />
        </Flex>
      </Center>
    </Box>
  );
};

export default Register;
