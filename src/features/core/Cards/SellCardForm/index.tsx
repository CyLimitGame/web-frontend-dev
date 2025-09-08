import React, { ReactNode, useState } from 'react';
import { Flex, Select, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TFunction } from 'next-i18next';
import * as yup from 'yup';
import _ from 'lodash';

import ConfirmModal from './ConfirmModal';

import { BaseButton } from '@/components/Button';
import { TextInput } from '@/components/Inputs';
import { SellNft } from '@/typings/fixed';
import { useSellNft } from '@/queries/useSecondaryMarket';
import { useToastMessage } from '@/hooks/useToastMessage';
import { BaseModal } from '@/components/Modal';
import { TransferStatus } from '@/typings/card.enum';
import { useCheckGameNftSale, useRemoveTeam } from '@/queries/useCard';
import { Text } from '@/components/Common';

const sellSchema = (t: TFunction) => {
  return yup.object().shape({
    fixedPrice: yup
      .number()
      .min(0.5, t('message:min_value', { value: 0.5 }))
      .required(t('message:required'))
      .typeError(t('message:must_be_a_number')),
  });
};

type Props = {
  id: string;
  transferStatus: TransferStatus;
  wrapperForm?: (props: { children: ReactNode }) => JSX.Element;
  onSuccess?: () => void;
  item: any;
};

const transferStatuses = [TransferStatus.WAITING, TransferStatus.PROCESSING];

const SellCardForm = ({
  id,
  transferStatus,
  onSuccess,
  wrapperForm,
  item,
}: Props) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
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

  const fixedPrice = watch('fixedPrice');

  const handleSubmitForm = () => {
    handleCheckGameNftSale();
  };

  const handleSell = async () => {
    try {
      const values = getValues();
      await mutateAsync({ ...values, id });
      toast({
        title: t('success'),
        description: t('message:sell_success'),
        status: 'success',
      });
      onSuccess && onSuccess();
    } catch (er) {
      _.noop();
    }
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
  const WrapperForm = wrapperForm || React.Fragment;

  const disabled = isLoading || transferStatuses.includes(transferStatus);

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <WrapperForm>
          <TextInput
            type="number"
            step={0.01}
            rightElementProps={{
              width: '100px',
              paddingRight: '10px',
            }}
            rightElement={
              <Select value="USDC">
                <option value="USDC">{t('USD')}</option>
              </Select>
            }
            errors={errors}
            {...register('fixedPrice')}
          />
          <BaseButton
            variant="secondaryLight"
            width="236px"
            type="submit"
            isLoading={isLoading || isLoadingCheckNftSale}
            isDisabled={disabled}
          >
            {t('sell_card')}
          </BaseButton>
        </WrapperForm>
      </form>
      <ConfirmModal
        isOpen={isOpenConfirmSell}
        onClose={onCloseConfirmSell}
        price={fixedPrice}
        item={item}
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
    </>
  );
};

export default SellCardForm;
