import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import SellInfo from './SellInfo';
import History from './History';

import {
  PersonalInformation,
  TransactionInformation,
} from '@/features/core/Cards';
import { MainLayout } from '@/layouts';
import {
  AvgCapScoreAndBonus,
  CardImageLoader,
  Container,
  ShowAnimation,
  Text,
} from '@/components/Common';
import { useGetCardDetail } from '@/queries/useCard';
import { MarketType, TransferStatus } from '@/typings/card.enum';
import { useListenTransferStatus } from '@/queries/useTransfer';
import { User } from '@/typings/user';
import { CardItem } from '@/typings/card';

const MyCardDetail = () => {
  useListenTransferStatus();
  const router = useRouter();
  const { id } = router.query;

  const { data } = useGetCardDetail(id as string, MarketType.OWNER, !!id);

  const transferStatus = _.get(
    _.last(data?.sales),
    'transferStatus'
  ) as unknown as TransferStatus;

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
              <CardImageLoader src={data?.imageUrl as string} width="100%" />
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
            <Text
              color="gray.900"
              fontSize={['2xl', '2xl', '3xl', '4xl']}
              fontWeight="bold"
              mb={[2, 2, 6]}
            >
              {data?.name}
            </Text>
            <SellInfo
              id={id as string}
              transferStatus={transferStatus as unknown as TransferStatus}
            />
            <Box mt={[5, 5, 8]}>
              <PersonalInformation data={data as CardItem} />
            </Box>

            <Box mt={[5, 5, 10]}>
              <TransactionInformation
                contractAddress={data?.contractAddress}
                tokenId={`${data?.tokenId}`}
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
        <History items={data?.sales || []} />
      </Container>
    </MainLayout>
  );
};

export default MyCardDetail;
