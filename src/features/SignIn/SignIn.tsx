import React from 'react';
import { Box, Center, Flex, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import signInSchema from './validate';

import { Text } from '@/components/Common';
import { LOGIN_BG } from '@/constants/images';
import { PasswordInput, TextInput } from '@/components/Inputs';
import { BaseButton } from '@/components/Button';
import { FacebookButton, GoogleButton } from '@/features/core/Button';
import { SignInForm } from '@/typings/user';
import { useSignIn } from '@/queries/useAuth';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

const SignIn = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({ resolver: yupResolver(signInSchema(t)) });

  const { mutate, isLoading } = useSignIn();

  const handleSubmitForm = (values: SignInForm) => {
    mutate(values);
  };

  return (
    <Box w="100%">
      <Text
        translateText="login"
        textTransform="uppercase"
        fontWeight="bold"
        fontSize="xl"
        textAlign="center"
        mb={5}
      />
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box pos="relative" aspectRatio="1">
          <Image src={LOGIN_BG} layout="fill" />
          <Box pos="absolute" left={0} right={0} top={0} bottom={0}>
            <Flex p={4} alignItems="end" h="100%">
              <Stack w="100%">
                <TextInput
                  {...register('email')}
                  errors={errors}
                  placeholder="email"
                />
                <PasswordInput
                  {...register('password')}
                  errors={errors}
                  placeholder="password"
                />
                <Text
                  textAlign="center"
                  my={2}
                  cursor="pointer"
                  onClick={() => navigateTo(PATH.FORGOT_PASSWORD)}
                >
                  {t('forgot_password')}?
                </Text>
                <Center>
                  <BaseButton
                    w="170px"
                    variant="light"
                    isLoading={isLoading}
                    type="submit"
                  >
                    {t('login')}
                  </BaseButton>
                </Center>
              </Stack>
            </Flex>
          </Box>
        </Box>
      </form>
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

export default SignIn;
