import React, { ReactNode } from 'react';
import { Box, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { TFunction, useTranslation } from 'next-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdUpload } from 'react-icons/md';

import { BaseModal } from '@/components/Modal';
import { MyCardItem, TransferXpToNft } from '@/typings/card';
import { TextInput } from '@/components/Inputs';
import { BaseButton } from '@/components/Button';
import { useTransferXpToNft } from '@/queries/useCard';
import { useGetUserProfile } from '@/queries/useUser';
import { Text } from '@/components/Common';
import { formatPrice } from '@/utils/number';

type Props = {
  item: MyCardItem;
  renderTarget: (onOpen: () => void) => ReactNode;
};

const schema = (t: TFunction) => {
  return yup.object().shape({
    xp: yup
      .number()
      .required(t('message:required'))
      .typeError(t('message:must_be_a_number')),
  });
};

const TransferXp = ({ item, renderTarget }: Props) => {
  const { data: userProfile } = useGetUserProfile();

  // Modal Congratulation
  const {
    isOpen: isOpenCongratulation,
    onClose: onCloseCongratulation,
    onOpen: onOpenCongratulation,
  } = useDisclosure();

  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TransferXpToNft>({
    resolver: yupResolver(schema(t)),
  });

  const xp = watch('xp');

  const { mutateAsync, isLoading } = useTransferXpToNft();

  const handleSubmitForm = async ({ xp }: TransferXpToNft) => {
    await mutateAsync({ nftId: item.id, xp });
    handleClose();
    if (item.totalXpToNextLevel && xp >= item.totalXpToNextLevel) {
      onOpenCongratulation();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      {renderTarget(onOpen)}
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        closeable
        title="boost_xp"
        isUseDrawerForMobile
      >
        <Flex gap={2}>
          <Text>{t('xp_balance')}:</Text>
          <Text fontWeight="bold">
            {formatPrice(userProfile?.totalXp as number, 3)}
          </Text>
        </Flex>
        <Flex gap={2}>
          <Text>{t('level')}:</Text>
          <Text fontWeight="bold">{item.level}</Text>
        </Flex>
        <Flex gap={2} mb={5}>
          <Text>{t('xp_to_next_level')}:</Text>
          <Text fontWeight="bold">{item?.totalXpToNextLevel}</Text>
        </Flex>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <TextInput label="xp" errors={errors} {...register('xp')} />
          <Flex justifyContent="center" gap={2} mt={4}>
            <BaseButton onClick={handleClose}>{t('cancel')}</BaseButton>
            <BaseButton
              type="submit"
              variant="light"
              isLoading={isLoading}
              isDisabled={xp <= 0 || xp > (userProfile?.totalXp as number)}
            >
              {t('boost')}
            </BaseButton>
          </Flex>
        </form>
      </BaseModal>
      <BaseModal
        isOpen={isOpenCongratulation}
        onClose={onCloseCongratulation}
        isShowHeader={false}
        size="sm"
      >
        <Box>
          <Flex alignItems="center" justifyContent="center" gap={2}>
            <Text fontWeight="bold" fontSize="2xl" translateText="level_up" />
            <Icon as={MdUpload} fontSize="2xl" />
          </Flex>
          <Text fontSize="6xl" textAlign="center">
            🎉
          </Text>
          <Text
            fontWeight="bold"
            fontSize="3xl"
            textAlign="center"
            color="gray.600"
          >
            {t('level_value', { value: item.level })}
          </Text>

          <Text
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
            color="gray.400"
          >
            {t('congratulation')}
          </Text>
          <Text fontSize="md" textAlign="center" color="gray.500">
            {t('you_have_reached_level', { level: item.level })}
          </Text>
          <Flex gap={2} mt={2} justifyContent="center">
            <Text fontSize="md" color="gray.500">
              {t('xp_remaining_to_next_level')}:
            </Text>
            <Text fontWeight="bold" fontSize="md" color="gray.500">
              {item?.totalXpToNextLevel}
            </Text>
          </Flex>
        </Box>
      </BaseModal>
    </>
  );
};

export default TransferXp;
