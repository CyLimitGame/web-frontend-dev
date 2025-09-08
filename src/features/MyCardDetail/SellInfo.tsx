import React, { useState } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import _ from 'lodash';

import sellSchema from './validate';

import { BaseButton } from '@/components/Button';
import { SelectInput, TextInput } from '@/components/Inputs';
import { SellNft } from '@/typings/fixed';
import { useSellNft } from '@/queries/useSecondaryMarket';
import { useToastMessage } from '@/hooks/useToastMessage';
import { navigateToCard } from '@/utils/navigation';
import { BaseModal, ConfirmModal } from '@/components/Modal';
import { TransferStatus } from '@/typings/card.enum';
import { useCheckGameNftSale, useRemoveTeam } from '@/queries/useCard';
import { Text } from '@/components/Common';

type Props = {
  id: string;
  transferStatus: TransferStatus;
};

const transferStatuses = [TransferStatus.WAITING, TransferStatus.PROCESSING];

const SellInfo = ({ id, transferStatus }: Props) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SellNft>({
    resolver: yupResolver(sellSchema(t)),
  });
  const {
    isOpen: isOpenConfirmSell,
    onOpen: onOpenConfirmSell,
    onClose: onCloseConfirmSell,
  } = useDisclosure();
  const {
    isOpen: isOpenRemoveTeam,
    onClose: onCloseRemoveTeam,
    onOpen: onOpenRemoveTeam,
  } = useDisclosure();
  const [game, setGame] = useState('');
  const { mutateAsync, isLoading } = useSellNft();
  const { mutateAsync: checkGameNftSale, isLoading: isLoadingCheckNftSale } =
    useCheckGameNftSale();
  const { mutateAsync: removeTeam, isLoading: isLoadingRemoveTeam } =
    useRemoveTeam();
  const toast = useToastMessage();

  const handleSubmitForm = () => {
    handleCheckGameNftSale();
  };

  const handleSell = async () => {
    const values = getValues();
    await mutateAsync({ ...values, id });
    toast({
      title: t('success'),
      description: t('message:sell_success'),
      status: 'success',
    });
    setTimeout(() => {
      navigateToCard(id);
    }, 500);
  };

  const handleCheckGameNftSale = async () => {
    const res = await checkGameNftSale(id);
    const game = _.get(res, 'game.name', '');
    const removeCard = _.get(res, 'removeCard', false);

    if (removeCard) {
      setGame(game);
      return onOpenRemoveTeam();
    }
    return onOpenConfirmSell();
  };

  const handleRemoveTeam = async () => {
    await removeTeam(id);
    await handleSell();
    onCloseRemoveTeam();
  };

  const disabled = isLoading || transferStatuses.includes(transferStatus);

  return (
    <Box p={[3, 3, 6]} bg="gray.100" borderRadius="xl">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Flex gap={4} flexDirection={['column', 'column', 'row']}>
          <Box w="100%">
            <SelectInput
              label={t('currency')}
              choices={[{ id: '1', label: 'Dollar (USD)', value: 'USDC' }]}
              style={{
                backgroundColor: 'white',
                color: 'black',
                borderRadius: 6,
              }}
              color="gray.400"
              size="lg"
              name=""
            />
          </Box>
          <Box w="100%">
            <TextInput
              label={t('fixed_price')}
              backgroundColor="white"
              errors={errors}
              {...register('fixedPrice')}
            />
          </Box>
        </Flex>
        <Flex justifyContent="center" mt={[4, 4, 6]}>
          <BaseButton
            variant="light"
            width="236px"
            type="submit"
            isLoading={isLoading || isLoadingCheckNftSale}
            isDisabled={disabled}
          >
            {t('sell_card')}
          </BaseButton>
        </Flex>
      </form>
      <ConfirmModal
        isOpen={isOpenConfirmSell}
        onClose={onCloseConfirmSell}
        onSubmit={() => {
          onCloseConfirmSell();
          handleSell();
        }}
      />
      <BaseModal
        title="confirm"
        isOpen={isOpenRemoveTeam}
        onClose={onCloseRemoveTeam}
        isUseDrawerForMobile
      >
        <Flex gap={2} alignItems="center">
          <Text>{t('this_card_is_participating_in_a_game')}:</Text>
          <Text fontWeight="bold">{game}</Text>
        </Flex>
        <Text mt={2}>{t('when_selling_this_card')}</Text>
        <Flex gap={3} mt={4}>
          <BaseButton onClick={onCloseRemoveTeam} w="160px">
            {t('sell_later')}
          </BaseButton>
          <BaseButton
            onClick={handleRemoveTeam}
            isLoading={isLoadingRemoveTeam}
            variant="light"
            w="100%"
          >
            {t('remove_my_team_now')}
          </BaseButton>
        </Flex>
      </BaseModal>
    </Box>
  );
};

export default SellInfo;
