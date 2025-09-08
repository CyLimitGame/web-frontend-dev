import React from 'react';
import { Box, Center, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import resetPasswordSchema from './validate';

import { PasswordInput } from '@/components/Inputs';
import { BaseButton } from '@/components/Button';
import { ResetPasswordForm } from '@/typings/password';
import { useResetPassword } from '@/queries/useAuth';
import useParamsQuery from '@/hooks/useGetParams';
import { Container, CylimitLogo } from '@/components/Common';

const ResetPassword = () => {
  const { t } = useTranslation();
  const { getParam } = useParamsQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(resetPasswordSchema(t)),
  });

  const code = getParam('code');
  const userId = getParam('uid');

  const { mutateAsync, isLoading } = useResetPassword();
  const handleSubmitForm = async (values: ResetPasswordForm) => {
    await mutateAsync({ ...values, code, userId });
    reset();
  };

  return (
    <Container>
      <Center minH="100vh" flexDirection="column">
        <Center mb={5}>
          <CylimitLogo />
        </Center>
        <Box width="400px">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Stack spacing={3}>
              <PasswordInput
                errors={errors}
                placeholder="new_password"
                {...register('password')}
              />
              <PasswordInput
                placeholder="confirm_new_password"
                errors={errors}
                {...register('passwordConfirm')}
              />
              <BaseButton type="submit" isLoading={isLoading} variant="light">
                {t('reset_password')}
              </BaseButton>
            </Stack>
          </form>
        </Box>
      </Center>
    </Container>
  );
};

export default ResetPassword;
