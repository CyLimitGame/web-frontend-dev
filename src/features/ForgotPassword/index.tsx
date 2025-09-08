import React from 'react';
import { Box, Center, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import ViewCheckEmail from './ViewCheckEmail';

import { BaseButton } from '@/components/Button';
import { CylimitLogo, Text } from '@/components/Common';
import { TextInput } from '@/components/Inputs';
import { ForgotPasswordForm } from '@/typings/password';
import { useForgotPassword } from '@/queries/useAuth';
import { AuthLayout } from '@/layouts';

const schema = yup.object().shape({
  email: yup.string().required().email(),
});

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { mutate, isLoading, isSuccess } = useForgotPassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordForm>({ resolver: yupResolver(schema) });

  const handleSubmitForm = (values: ForgotPasswordForm) => {
    mutate(values.email as string);
  };

  const email = watch('email');

  return (
    <AuthLayout>
      <Center minH="100vh" flexDirection="column" fontStyle="italic">
        <Center>
          <CylimitLogo />
        </Center>
        <Box maxW="520px">
          {isSuccess ? (
            <ViewCheckEmail email={email} />
          ) : (
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <Stack spacing={3}>
                <Text
                  fontWeight="bold"
                  fontSize="3xl"
                  textTransform="uppercase"
                  textAlign="center"
                >
                  {t('forgot_password')}
                </Text>
                <Text textTransform="uppercase" textAlign="center">
                  {t('dont_worry_enter_your_email')}
                </Text>
                <TextInput
                  errors={errors}
                  placeholder="email"
                  {...register('email')}
                />
                <Center>
                  <BaseButton
                    type="submit"
                    isLoading={isLoading}
                    variant="light"
                    w="220px"
                  >
                    {t('validate')}
                  </BaseButton>
                </Center>
              </Stack>
            </form>
          )}
        </Box>
      </Center>
    </AuthLayout>
  );
};

export default ForgotPassword;
