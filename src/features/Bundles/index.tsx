import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import BidInfo from './BidInfo';
import History from './History';

import MainLayout from '@/layouts/MainLayout';
import { Container, Text } from '@/components/Common';
import { useGetBundleDetailCard } from '@/queries/useBundles';
import spacing from '@/theme/foundations/space';
import { BundleCard } from '@/typings/bundle';
import { useListenPayment } from '@/queries/usePayment';

const SPACING = spacing[3];
const COLUMN = 3;

const Auction = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useGetBundleDetailCard({ id: id as string });

  useListenPayment({});

  return (
    <MainLayout>
      <Container py={6}>
        <Flex gap={6} flexDirection={['column', 'column', 'column', 'row']}>
          <Box
            cursor="pointer"
            height="100%"
            w="100%"
            maxW={['220px', '220px', '320px']}
            flexShrink={0}
            mx="auto"
          >
            <Flex
              flexWrap="wrap"
              marginLeft={`-${SPACING}`}
              marginTop={`-${SPACING}`}
              justifyContent="center"
            >
              {data?.nfts?.map((card: any) => {
                return (
                  <Box
                    key={`bundle-${card.id}`}
                    width={`calc(100% / ${COLUMN} - ${SPACING})`}
                    marginLeft={SPACING}
                    marginTop={SPACING}
                    borderRadius="xl"
                    overflow="hidden"
                  >
                    <Image src={card.imageUrl} w="100%" />
                  </Box>
                );
              })}
            </Flex>
          </Box>
          <Box flex={1}>
            <Text
              translateText="athlete_card"
              color="gray.400"
              fontWeight="bold"
              fontSize={['sm', 'md']}
            />
            <Text
              color="gray.900"
              fontSize={['2xl', '2xl', '3xl', '4xl']}
              fontWeight="bold"
              mb={[2, 2, 6]}
            >
              {data?.name}
            </Text>

            <BidInfo item={data as BundleCard} />
          </Box>
        </Flex>

        <Text
          translateText="history"
          fontSize="2xl"
          fontWeight="bold"
          mb={3}
          mt={8}
        />
        <History items={data?.auctionBids || []} />
      </Container>
    </MainLayout>
  );
};

export default Auction;
