import React from 'react';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { ModalProps } from '@chakra-ui/modal';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import changeYourPasswordSchema from './validate';

import { BaseModal } from '@/components/Modal';
import { Text } from '@/components/Common';
import { PasswordInput } from '@/components/Inputs';
import { BaseButton } from '@/components/Button';
import { useGetUserProfile, useUpdatePassword } from '@/queries/useUser';
import { UpdatePasswordForm } from '@/typings/password';

type Props = Omit<ModalProps, 'children'>;

const ChangeYourPasswordModal = (props: Props) => {
  const { onClose } = props;

  const { t } = useTranslation();
  const { data } = useGetUserProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordForm>({
    resolver: yupResolver(changeYourPasswordSchema(t, data?.isPasswordEmpty)),
  });
  const { mutateAsync, isLoading } = useUpdatePassword();

  const handleSubmitForm = async (values: UpdatePasswordForm) => {
    await mutateAsync(values);
    onClose();
    reset({});
  };

  return (
    <BaseModal
      closeable
      title="create_new_password"
      isUseDrawerForMobile
      size="3xl"
      {...props}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box maxWidth="480px" margin="auto">
          <Stack spacing={4}>
            <Text
              fontSize="sm"
              color="gray.400"
              translateText="your_new_password_must_be"
            />
            {!data?.isPasswordEmpty && (
              <PasswordInput
                label={t('current_password')}
                errors={errors}
                maxLength={40}
                {...register('oldPassword')}
              />
            )}
            <PasswordInput
              label={t('new_password')}
              errors={errors}
              maxLength={40}
              {...register('newPassword')}
            />
            <PasswordInput
              label={t('confirm_new_password')}
              errors={errors}
              maxLength={40}
              {...register('newPasswordToConfirm')}
            />
            <Text
              fontSize="sm"
              color="gray.400"
              translateText="both_passwords_must_match"
            />
          </Stack>
          <Flex justifyContent="center" mt={10}>
            <BaseButton isLoading={isLoading} variant="light" type="submit">
              {t('reset_password')}
            </BaseButton>
          </Flex>
        </Box>
      </form>
    </BaseModal>
  );
};

export default ChangeYourPasswordModal;
