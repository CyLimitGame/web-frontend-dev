import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import Image from 'next/image';

import BidInfo from './BidInfo';
import History from './History';

import { Favorite } from '@/features/core/Common';
import {
  PersonalInformation,
  TransactionInformation,
} from '@/features/core/Cards';

import MainLayout from '@/layouts/MainLayout';
import {
  AvgCapScoreAndBonus,
  Container,
  ShowAnimation,
  Text,
} from '@/components/Common';
import { useGetDetailCard } from '@/queries/useAuction';
import { AuctionCard } from '@/typings/auction';
import { useListenPayment } from '@/queries/usePayment';
import { User } from '@/typings/user';
import { CardItem } from '@/typings/card';

const Auction = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useGetDetailCard({ id: id as string });

  useListenPayment({});

  return (
    <MainLayout>
      <Container py={6}>
        <Flex gap={6} flexDirection={['column', 'column', 'column', 'row']}>
          <Box
            w="100%"
            maxW={['220px', '220px', '320px']}
            flexShrink={0}
            mx="auto"
          >
            <ShowAnimation>
              <Box
                sx={{
                  aspectRatio: '0.65',
                  position: 'relative',
                }}
                borderRadius="xl"
                overflow="hidden"
              >
                <Box w="100%" height="100%">
                  <Image src={data?.imageUrl as string} layout="fill" />
                </Box>
              </Box>
            </ShowAnimation>
            <Box mt={2}>
              <AvgCapScoreAndBonus item={data} />
            </Box>
          </Box>
          <Box flex={1}>
            <Text
              translateText="athlete_card"
              color="gray.400"
              fontWeight="bold"
              fontSize={['sm', 'md']}
            />
            <Flex justifyContent="space-between">
              <Text
                color="gray.900"
                fontSize={['2xl', '2xl', '3xl', '4xl']}
                fontWeight="bold"
                mb={[2, 2, 6]}
              >
                {data?.name}
              </Text>
              <Box>
                <Favorite riderId={data?.riderId as string} />
              </Box>
            </Flex>

            <BidInfo item={data as AuctionCard} />

            <Box mt={[5, 5, 8]}>
              <PersonalInformation data={data as CardItem} />
            </Box>

            <Box mt={[5, 5, 10]}>
              <TransactionInformation
                contractAddress={data?.contractAddress}
                tokenId={data?.tokenId}
                owner={data?.owner as User}
                riderId={_.get(data, 'rider.id', '')}
              />
            </Box>
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
