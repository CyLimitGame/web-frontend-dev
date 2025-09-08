import React from 'react';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import signInSchema from './validate';

import { GetYourOwnNft } from '@/features/core/Common';
import { PasswordInput, TextInput } from '@/components/Inputs';
import { BaseButton } from '@/components/Button';
import { navigateToForgotPassword } from '@/utils/navigation';
import { useSignIn } from '@/queries/useAuth';
import { SignInForm } from '@/typings/user';
import { AuthLayout } from '@/layouts';
import useSetInviteCode from '@/hooks/useSetInviteCode';
import { FacebookButton, GoogleButton } from '@/features/core/Button';

const SignIn = () => {
  const { t } = useTranslation();
  useSetInviteCode();

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
    <AuthLayout>
      <Flex mt="24">
        <Box flex={1} display={['none', 'none', 'none', 'block']}>
          <Text
            fontSize="5xl"
            fontWeight="bold"
            maxWidth={552}
            lineHeight="78px"
          >
            {t('login_to_continue_with_cylimit')}
          </Text>
          <GetYourOwnNft />
        </Box>
        <Box width={360} mx="auto">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box>
              <Stack spacing={3}>
                <TextInput
                  label={t('email')}
                  errors={errors}
                  {...register('email')}
                />
                <PasswordInput
                  label={t('password')}
                  errors={errors}
                  {...register('password')}
                />
              </Stack>
            </Box>
            <Text
              my={6}
              color="primary.500"
              fontWeight="bold"
              textAlign="center"
              cursor="pointer"
              onClick={navigateToForgotPassword}
            >
              {t('forgot_password')}?
            </Text>
            <BaseButton
              colorScheme="primary"
              type="submit"
              width="100%"
              shadow="mdBlue"
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              {t('sign_in')}
            </BaseButton>
            <Text
              _before={{
                position: 'absolute',
                content: '""',
                width: 'calc(50% - 75px)',
                top: '50%',
                left: 0,
                borderTop: '1px solid',
                borderTopColor: 'gray.200',
              }}
              _after={{
                position: 'absolute',
                content: '""',
                width: 'calc(50% - 75px)',
                top: '50%',
                right: 0,
                borderTop: '1px solid',
                borderTopColor: 'gray.200',
              }}
              textAlign="center"
              position="relative"
              my={4}
              color="gray.500"
              mt={10}
            >
              {t('or_continue_with')}
            </Text>
            <Flex justifyContent="center">
              <FacebookButton />
              <Box width={4} />
              <GoogleButton />
            </Flex>
          </form>
        </Box>
      </Flex>
    </AuthLayout>
  );
};

export default SignIn;
