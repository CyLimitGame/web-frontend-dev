import React from 'react';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { ModalProps } from '@chakra-ui/modal';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import deleteMyAccountSchema from './validate';

import { BaseModal } from '@/components/Modal';
import { Text } from '@/components/Common';
import { PasswordInput } from '@/components/Inputs';
import { BaseButton } from '@/components/Button';
import { useDeleteMyAccount, useGetUserProfile } from '@/queries/useUser';
import { DeleteMyAccountForm } from '@/typings/password';

type Props = Omit<ModalProps, 'children'>;

const DeleteMyAccountModal = (props: Props) => {
  const { onClose } = props;

  const { t } = useTranslation();
  const { data } = useGetUserProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeleteMyAccountForm>({
    resolver: yupResolver(deleteMyAccountSchema(t, data?.isPasswordEmpty)),
  });
  const { mutateAsync, isLoading } = useDeleteMyAccount();

  const handleSubmitForm = async (values: DeleteMyAccountForm) => {
    await mutateAsync(values);
    onClose();
    reset({});
  };

  return (
    <BaseModal
      closeable
      title="permanently_delete_account"
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
              translateText="are_you_sure_to_delete_your_account"
            />
            <PasswordInput
              label={t('current_password')}
              errors={errors}
              maxLength={20}
              {...register('password')}
            />
            <Text
              fontSize="sm"
              color="gray.400"
              translateText="your_account_delete_after_30_days"
            />
            <Text
              fontSize="sm"
              color="gray.400"
              translateText="reactive_account_after_request_delete"
            />
          </Stack>
          <Flex justifyContent="center" mt={10}>
            <BaseButton isLoading={isLoading} variant="light" type="submit">
              {t('confirm')}
            </BaseButton>
          </Flex>
        </Box>
      </form>
    </BaseModal>
  );
};

export default DeleteMyAccountModal;
