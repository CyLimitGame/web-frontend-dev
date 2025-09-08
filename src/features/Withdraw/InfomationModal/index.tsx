import React, { useState } from 'react';
import {
  HStack,
  ModalProps,
  PinInput,
  PinInputField,
  Stack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import withdrawSchema from './validate';

import { BaseModal } from '@/components/Modal';
import { TextInput } from '@/components/Inputs';
import { BaseButton } from '@/components/Button';
import { Text } from '@/components/Common';
import { Withdraw } from '@/typings/withdraw';
import { useVerifyWithdraw, useWithdraw } from '@/queries/useWithdraw';
import { useToastMessage } from '@/hooks/useToastMessage';
import { useGetUserProfile } from '@/queries/useUser';
import { PATH } from '@/constants/path';

type Props = Omit<ModalProps, 'children'>;

const InfomationModal = ({ onClose, ...props }: Props) => {
  const { t } = useTranslation();
  const { data: userProfile } = useGetUserProfile();
  const toast = useToastMessage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Withdraw>({
    resolver: yupResolver(withdrawSchema(t)),
  });

  const [step, setStep] = useState(1);
  const [emailOtpCode, setEmailOtpCode] = useState('');

  const {
    mutateAsync: mutateWithdraw,
    isLoading: isWithdrawLoading,
    data,
  } = useWithdraw();

  const {
    mutateAsync: mutateVerifyWithdraw,
    isLoading: isVerifyWithdrawLoading,
  } = useVerifyWithdraw();

  const handleSubmitForm = async (values: Withdraw) => {
    if (step === 1) {
      await mutateWithdraw(values);
      setStep(2);
    } else {
      await mutateVerifyWithdraw({ emailOtpCode, id: data?.id as string });
      handleCloseModal();
      toast({
        title: t('processing'),
        description: t('message:withdraw_processing'),
        status: 'info',
      });
    }
  };

  const handleCloseModal = () => {
    onClose();
    reset();
    setStep(1);
  };

  return (
    <BaseModal {...props} closeable onClose={handleCloseModal} title="withdraw">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Stack spacing={3}>
          {step === 1 ? (
            <React.Fragment>
              <TextInput
                label={t('amount')}
                errors={errors}
                {...register('amount')}
              />
              <TextInput
                label={t('to_address')}
                errors={errors}
                {...register('toAddress')}
              />

              {!userProfile?.isPasswordEmpty ? (
                <TextInput
                  label={t('password')}
                  errors={errors}
                  type="password"
                  maxLength={50}
                  {...register('password')}
                />
              ) : (
                <Link href={PATH.EDIT_PROFILE} passHref>
                  <ChakraLink color="primary.500">
                    {t('please_update_your_password')}
                  </ChakraLink>
                </Link>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text textAlign="center" translateText="email_code" />
              <HStack justifyContent="center">
                <PinInput type="alphanumeric" onChange={setEmailOtpCode}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </React.Fragment>
          )}
          <BaseButton
            variant="light"
            type="submit"
            isDisabled={
              isWithdrawLoading ||
              isVerifyWithdrawLoading ||
              userProfile?.isPasswordEmpty
            }
            isLoading={isWithdrawLoading || isVerifyWithdrawLoading}
          >
            {t('continue')}
          </BaseButton>
        </Stack>
      </form>
    </BaseModal>
  );
};

export default InfomationModal;
