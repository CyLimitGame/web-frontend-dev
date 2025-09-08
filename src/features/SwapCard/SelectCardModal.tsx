import React, { useState } from 'react';
import { Box, Center, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { MdOutlineSync } from 'react-icons/md';

import Card from './Card';

import { BaseButton } from '@/components/Button';
import { BaseModal, ConfirmModal } from '@/components/Modal';
import {
  useGenerateTransferFreeCard,
  useTransferFreeCard,
} from '@/queries/useCard';
import { DataGridWithFlex, Text } from '@/components/Common';
import { TransferFreeCard } from '@/typings/card';
import { useToastMessage } from '@/hooks/useToastMessage';
import { getRiderImage } from '@/utils/string';

type Props = {
  cardSelected: any;
};

const SelectCardModal = ({ cardSelected }: Props) => {
  const { t } = useTranslation();
  const toast = useToastMessage();

  const [idSelected, setIdSelected] = useState('');
  const [idGenerate, setIdGenerate] = useState('');
  const [freeCards, setFreeCards] = useState<TransferFreeCard[]>([]);

  const {
    isOpen: isOpenSelectCard,
    onClose: onCloseSelectCard,
    onOpen: onOpenSelectCard,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirm,
    onClose: onCloseConfirm,
    onOpen: onOpenConfirm,
  } = useDisclosure();

  const { mutateAsync, isLoading } = useGenerateTransferFreeCard();
  const { mutateAsync: transferFreeCard, isLoading: isLoadingTransfer } =
    useTransferFreeCard();

  const handleGenerateTransferFreeCard = async () => {
    const res = await mutateAsync(cardSelected?.id);
    if (!_.isEmpty(res.swapFreeCards)) {
      onOpenSelectCard();
      setIdGenerate(res.id);
      setFreeCards(
        _.map(res.swapFreeCards, (card) => ({
          riderId: {
            ..._.get(card, 'riderId'),
            capScore: {
              averageCapScore: _.get(card, 'riderId.averageCapScore'),
            },
            bonus: {
              bonus: 0,
            },
          },
        }))
      );
    } else {
      toast({ description: t('message:there_is_no_suitable_card_currently') });
    }
  };

  const handleTransfer = async () => {
    await transferFreeCard({ riderId: idSelected, id: idGenerate });
    onCloseSelectCard();
  };

  return (
    <React.Fragment>
      <BaseButton
        variant="light"
        onClick={handleGenerateTransferFreeCard}
        isLoading={isLoading}
        isDisabled={!cardSelected?.id}
      >
        {t('start_to_trade_in')}
      </BaseButton>
      <BaseModal
        isOpen={isOpenSelectCard}
        closeable
        onClose={onOpenConfirm}
        size="3xl"
      >
        <Flex
          gap={4}
          alignItems="center"
          direction={['column', 'column', 'row']}
        >
          <Box w={['140px', '140px', '155px']}>
            <Center mb={2}>
              <Text translateText="my_card" fontWeight="bold" />
            </Center>
            <Card item={cardSelected} checked={false} />
          </Box>
          <Center bg="white" w="40px" h="40px" borderRadius="4xl">
            <Icon as={MdOutlineSync} color="black" fontSize="3xl" />
          </Center>
          <Box flex={1}>
            <Center mb={2}>
              <Text translateText="new_card_possible" fontWeight="bold" />
            </Center>
            <DataGridWithFlex
              spacing="8px"
              columns={3}
              containerProps={{ justifyContent: 'center' }}
              data={freeCards}
              renderItem={(item) => (
                <Card
                  onClick={() => setIdSelected(item.riderId.id)}
                  checked={idSelected === item.riderId.id}
                  item={{
                    ...item,
                    id: item.riderId.id,
                    imageUrl: getRiderImage(item, cardSelected?.rarity),
                    level: _.get(item, 'riderId.freeCard.level', 0),
                    rarity: _.get(item, 'riderId.freeCard.rarity', ''),
                    name: _.get(item, 'riderId.name', ''),
                  }}
                  isShowTeam
                />
              )}
            />
          </Box>
        </Flex>
        <Text
          textAlign="center"
          fontSize="sm"
          mt={4}
          translateText="be_careful_by_refreshing_or_closing_this_trade"
        />
        <Center>
          <BaseButton
            mt={4}
            variant="light"
            onClick={handleTransfer}
            isLoading={isLoadingTransfer}
            size={['sm', 'md', 'lg']}
          >
            {t('confirm_the_transfer')}
          </BaseButton>
        </Center>
        <ConfirmModal
          isOpen={isOpenConfirm}
          onClose={onCloseConfirm}
          title="would_you_like_to_cancel"
          text="your_next_Swap_will_be_available_in"
          onSubmit={() => {
            onCloseConfirm();
            onCloseSelectCard();
          }}
          isUseDrawerForMobile={false}
        />
      </BaseModal>
    </React.Fragment>
  );
};

export default SelectCardModal;
