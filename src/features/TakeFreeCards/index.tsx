import React from 'react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import _ from 'lodash';

import Card from './Card';
import RandomSection from './RandomSection';
import Claimed from './Claimed';
import SaveAndFinishLaterButton from './SaveAndFinishLaterButton';

import {
  CylimitLogo,
  DataGridWithFlex,
  LoaderContainer,
  Text,
} from '@/components/Common';
import { FreeCardsTeamStatusEnum } from '@/typings/card.enum';
import { useGetMyFreeCards } from '@/queries/useCard';
import { AuthLayout } from '@/layouts';
import breakpoints from '@/theme/foundations/breakpoints';
import { useRedirectGameComming } from '@/queries/useGame';

const TakeFreeCards = () => {
  const { data, isLoading, refetch } = useGetMyFreeCards();
  const { mutate } = useRedirectGameComming();

  const columns = useBreakpointValue({ base: 3, xs: 3, sm: 4, lg: 6, xl: 8 });

  const cards = data?.freeCards || [];
  const status = _.get(data, 'status');
  const numberFlip = _.filter(cards, (item) => _.has(item, 'riderId')).length;

  const handleSuccess = () => {
    const totalCards = _.size(cards);
    const totalCardsOpened = _.filter(cards, 'riderId').length;
    if (totalCardsOpened + 1 === totalCards) {
      return mutate();
    }
    return refetch();
  };

  return (
    <AuthLayout maxW={breakpoints['2xl']}>
      <LoaderContainer isLoading={isLoading}>
        {status === FreeCardsTeamStatusEnum.CLAIMED && (
          <Flex justifyContent="center">
            <Claimed />
          </Flex>
        )}
        {status !== FreeCardsTeamStatusEnum.CLAIMED && _.size(cards) > 0 && (
          <Box>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              direction={['column', 'row']}
              gap={2}
            >
              <Box>
                <Text
                  fontWeight="bold"
                  fontSize="3xl"
                  translateText="build_my_team"
                />
                <Text
                  translateText="select_my_50_riders"
                  fontWeight="bold"
                  fontSize="xl"
                />
              </Box>
              <Box>
                <CylimitLogo />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              flexDirection={['column', 'column', 'column', 'column', 'row']}
              gap={4}
              mt={5}
            >
              <Box>
                <Text translateText="my_team" fontWeight="bold" fontSize="xl" />
                <Text translateText="click_on_each_card_and_choose_your_rider_from_a_selection_of_3_cards" />
              </Box>
              <Flex gap={2} flexDirection={['column', 'column', 'row']}>
                <RandomSection isDisabled={numberFlip === cards.length} />
                <SaveAndFinishLaterButton />
              </Flex>
            </Flex>
            <Box mt={5}>
              <DataGridWithFlex
                data={data?.freeCards || []}
                columns={columns as number}
                spacing="14px"
                containerProps={{ justifyContent: 'center' }}
                renderItem={(record) => (
                  <Card data={record} onSuccess={handleSuccess} />
                )}
              />
            </Box>
          </Box>
        )}
      </LoaderContainer>
    </AuthLayout>
  );
};

export default TakeFreeCards;
