import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { BaseButton } from '../../../../components/Button';

import depositSchema from './validate';

import { TextInput } from '@/components/Inputs';
import { BaseModal } from '@/components/Modal';
import { NEXT_PUBLIC_POLYGON_CHAIN } from '@/config/appConfig';
import { useWallet } from '@/hooks/useWallet';
import { useGetUserProfile } from '@/queries/useUser';
import { Deposit } from '@/typings/deposit';
import { useToastMessage } from '@/hooks/useToastMessage';

type Props = {
  onCloseModal: () => void;
};

const DepositUsdcButton = ({ onCloseModal }: Props) => {
  const { t } = useTranslation();
  const {
    changeNetworkToPolygon,
    sendUsdc,
    chainId,
    isAvailableWallet,
    ethereum,
  } = useWallet();
  const { data } = useGetUserProfile();

  const toast = useToastMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Deposit>({
    resolver: yupResolver(depositSchema(t)),
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleConnect = async () => {
    if (!chainId) {
      toast({
        title: t('error'),
        description: t('message:please_install_metamask_extension'),
        status: 'error',
      });
      return;
    }

    if (chainId !== NEXT_PUBLIC_POLYGON_CHAIN) {
      await changeNetworkToPolygon();
      ethereum.enable();
      onCloseModal();
      return;
    }

    if (!isAvailableWallet) {
      await ethereum.enable();
      onCloseModal();
      return;
    }

    if (isAvailableWallet) {
      onOpen();
      return;
    }
  };

  const handleSubmitForm = async ({ amount }: Deposit) => {
    onClose();
    onCloseModal();

    await sendUsdc(data?.walletAddress as string, amount);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <BaseButton variant="light" onClick={handleConnect}>
        {t(!isAvailableWallet ? 'connect_wallet' : 'deposit')}
      </BaseButton>
      <BaseModal title="deposit_USDC" isOpen={isOpen} onClose={handleClose}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <TextInput
            label={t('amount')}
            errors={errors}
            {...register('amount')}
          />
          <BaseButton mt={4} w="100%" variant="light" type="submit">
            {t('submit')}
          </BaseButton>
        </form>
      </BaseModal>
    </>
  );
};

export default DepositUsdcButton;
