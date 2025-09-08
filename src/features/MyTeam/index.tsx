import React from 'react';
import { Box, Center, Container, Flex, Text } from '@chakra-ui/react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import CardData from './components/CardData';
import OneFreeTransferButton from './components/OneFreeTransferButton';
import JerseyInfo from './components/JerseyInfo';

import { CountCardByRarity } from '@/features/core/Common';
import Filter from '@/features/core/Cards/FilterCard';
import { sanitizeFilterCardRequest } from '@/features/core/Cards/FilterCard/actions';
import SerialNumber from '@/features/core/Cards/FilterCard/SerialNumber';
import { MainLayout } from '@/layouts';
import breakpoints from '@/theme/foundations/breakpoints';
import { useGetUserProfile } from '@/queries/useUser';
import { LoaderContainer, NoResultFound } from '@/components/Common';
import { useGetCardsMyTeam, useGetParamsCardFilter } from '@/queries/useCard';
import { MarketType } from '@/typings/card.enum';
import { getUserBackGround } from '@/utils/user';
import {
  BLUE_CARD,
  GRAY_CARD,
  RED_CARD,
  YELLOW_CARD,
} from '@/constants/images';

const MyTeam = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: user } = useGetUserProfile();
  const isSale = _.get(router, 'query.isSale') === 'true';

  const { data: paramsCardFilter } = useGetParamsCardFilter({
    ownerId: _.get(user, 'id', ''),
    marketType: isSale ? MarketType.FIXED : undefined,
  });

  const { data, isLoading } = useGetCardsMyTeam(
    sanitizeFilterCardRequest({
      defaultFilter: {
        serialNumber: [0, 300],
        averageCore: [0, 100],
        age: [0, 100],
      },
      router: router,
      riderOption: paramsCardFilter?.startListOfRiders || [],
      addFiled: (values) => ({
        limit: Number.MAX_SAFE_INTEGER,
        marketType: _.get(values, 'isSale', false)
          ? MarketType.FIXED
          : undefined,
      }),
    })
  );

  return (
    <MainLayout>
      <Box
        mb={10}
        borderBottom="1px solid"
        borderColor="border"
        background={getUserBackGround(user, { isRevert: true })}
      >
        <Container maxWidth={breakpoints['2xl']} px={[1, 2]}>
          <Flex gap={4}>
            <Box pt={5} maxW="280px">
              <Box display={['none', 'none', 'none', 'block']}>
                <JerseyInfo />
              </Box>
              <Filter
                paramsCardFilter={paramsCardFilter}
                defaultFilter={{
                  serialNumber: [0, 300],
                  averageCore: [0, 100],
                  age: [0, 100],
                }}
                components={{
                  Price: ({ form, defaultComponent }) => {
                    const isSale = form.watch('isSale');
                    if (!isSale) return <></>;
                    return defaultComponent;
                  },
                  SerialNumber: () => {
                    return <SerialNumber min={0} />;
                  },
                  Rarity: ({ defaultComponent }) =>
                    React.cloneElement(defaultComponent, {
                      options: [
                        { image: BLUE_CARD, value: 'blue' },
                        { image: RED_CARD, value: 'pink' },
                        { image: YELLOW_CARD, value: 'yellow' },
                        { image: GRAY_CARD, value: 'white' },
                      ],
                    }),
                }}
                header={
                  <>
                    <Text
                      mt="20px"
                      textTransform="uppercase"
                      fontSize="2xl"
                      fontWeight="bold"
                    >
                      {t('my_team')}
                    </Text>
                    <Text
                      textTransform="uppercase"
                      fontSize="xl"
                      fontWeight="bold"
                      color="gray.500"
                    >
                      {t('filters')}
                    </Text>
                  </>
                }
                pr={4}
              />
            </Box>
            <Box w="100%">
              <Box py={[2, 2, 4]}>
                <Flex
                  mb={4}
                  justifyContent="space-between"
                  direction={['column', 'column', 'row']}
                  gap={2}
                  w="100%"
                >
                  <OneFreeTransferButton />
                  <Center>
                    <CountCardByRarity />
                  </Center>
                </Flex>
              </Box>

              <Box flex={1}>
                <LoaderContainer
                  isLoading={isLoading}
                  dataFound={data?.items || []}
                  notFoundComponent={<NoResultFound type="common" />}
                >
                  <CardData isLoading={isLoading} data={data?.items || []} />
                </LoaderContainer>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default MyTeam;
