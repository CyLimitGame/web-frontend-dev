import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';

import { getTimeoutTransfer } from '../core/Common/ClaimCardsNotice/TransferCard';

import Card from './Card';
import SelectCardModal from './SelectCardModal';

import { MainLayout } from '@/layouts';
import {
  Container,
  DataGridWithFlex,
  LoaderContainer,
  Text,
} from '@/components/Common';
import {
  useGetCardsMyTeam,
  useGetTimeoutToTransferFreeCard,
} from '@/queries/useCard';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

const SwapCard = () => {
  const [cardSelected, setCardSelected] = useState<any>();
  const { data, isLoading } = useGetCardsMyTeam({
    fromAge: 0,
    toAge: 0,
    page: 1,
    limit: 10000,
    rarity: ['white', 'na'],
  });

  const { data: transfer, isLoading: isLoadingGetTimeout } =
    useGetTimeoutToTransferFreeCard();

  const column = useBreakpointValue({ base: 2, xs: 2, sm: 3, md: 6, lg: 8 });

  const timeout = getTimeoutTransfer(_.get(transfer, 'createdAt', ''));

  useEffect(() => {
    if (timeout) {
      navigateTo(PATH.MY_TEAM);
    }
  }, [timeout]);

  return (
    <MainLayout>
      <Container py={5}>
        <LoaderContainer isLoading={isLoading || isLoadingGetTimeout}>
          <Flex justifyContent="space-between" mb={4}>
            <Box>
              <Text
                fontSize="2xl"
                fontWeight="bold"
                translateText="card_swap"
              />
              <Text translateText="select_a_card_to_trade_in" />
            </Box>
            <Box alignSelf="end">
              <SelectCardModal cardSelected={cardSelected} />
            </Box>
          </Flex>
          <DataGridWithFlex
            spacing="8px"
            columns={column as number}
            containerProps={{ justifyContent: 'center' }}
            data={_.get(data, 'items', [])}
            renderItem={(item) => (
              <Card
                onClick={setCardSelected}
                opacity={
                  item.id === cardSelected?.id || !cardSelected?.id ? 1 : 0.5
                }
                checked={item.id === cardSelected?.id}
                item={{
                  ...item,
                  riderId: {
                    capScore: _.get(item, 'capScore'),
                    bonus: _.get(item, 'bonus'),
                  },
                }}
              />
            )}
          />
        </LoaderContainer>
      </Container>
    </MainLayout>
  );
};

export default SwapCard;
