import React, { useState } from 'react';
import { Flex, Icon, useBreakpointValue } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { BsFolderX } from 'react-icons/bs';

import Card from './Card';

import { MainLayout } from '@/layouts';
import { Container, DataGridWithFlex, Loader, Text } from '@/components/Common';
import useParamsQuery from '@/hooks/useGetParams';
import {
  useClaimReward,
  useGetGameController,
  useGetMyReward,
  useGetRewardStatus,
} from '@/queries/useGame';
import { BaseButton } from '@/components/Button';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

const TakeReward = () => {
  const { t } = useTranslation();
  const { getParam } = useParamsQuery();
  const [numberFlip, setNumberFlip] = useState(0);

  const id = getParam('id');
  const { data: cards, isLoading } = useGetMyReward(id);
  const { data: gameController } = useGetGameController(id);
  const { mutate, isLoading: isLoadingClaim } = useClaimReward();

  const { data } = useGetRewardStatus(id);
  const rewardStatus = _.get(data, 'status', '');

  const handleFlip = () => {
    setNumberFlip((current) => current + 1);
  };

  const handleClaim = () => {
    mutate(id);
  };

  const isShowClaim = numberFlip === cards?.length;

  const column = useBreakpointValue({ base: 2, sm: 2, md: 3, lg: 4 });
  const gap = useBreakpointValue({
    base: '12px',
    sm: '12px',
    md: '24px',
    lg: '24px',
  });

  if (!isLoading && _.isEmpty(cards)) {
    return (
      <MainLayout>
        <Container maxWidth={1200} pt={5}>
          <Text
            translateText="rewards"
            fontSize="2xl"
            fontWeight="bold"
            my={4}
          />
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Icon as={BsFolderX} fontSize="5xl" color="gray.400" />
            <Text
              translateText={
                rewardStatus === 'claimed'
                  ? 'you_already_have_claimed_your_rewards_for_this_race'
                  : 'reward_not_found'
              }
              fontSize="2xl"
              fontWeight="bold"
              color="gray.400"
              my={4}
            />
            <BaseButton variant="light" onClick={() => navigateTo(PATH.GAME)}>
              {t('back_to_games')}
            </BaseButton>
          </Flex>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth={1200} py={4}>
        <Text translateText="rewards" fontSize="2xl" fontWeight="bold" />
        <Text my={4} fontWeight="bold" fontSize="2xl">
          {_.get(gameController, 'name')}
        </Text>
        {isLoading ? (
          <Flex justifyContent="center">
            <Loader />
          </Flex>
        ) : (
          <>
            <DataGridWithFlex
              spacing={gap as string}
              columns={column as number}
              containerProps={{ justifyContent: 'center' }}
              data={cards || []}
              renderItem={(item, index) => (
                <AnimatePresence exitBeforeEnter key={index}>
                  <Card
                    item={item}
                    onFlip={handleFlip}
                    delay={(index + 1) * 0.1}
                  />
                </AnimatePresence>
              )}
            />
            {isShowClaim && (
              <Flex mt={10} justifyContent="center">
                <BaseButton
                  w="256px"
                  variant="light"
                  isLoading={isLoadingClaim}
                  onClick={handleClaim}
                >
                  {t('claim')}
                </BaseButton>
              </Flex>
            )}
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default TakeReward;
