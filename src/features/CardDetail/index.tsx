import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import History from './History';

import { Favorite } from '@/features/core/Common';
import { MainLayout } from '@/layouts';
import {
  CardImageLoader,
  Container,
  ShowAnimation,
  Text,
} from '@/components/Common';
import { useGetCardDetail } from '@/queries/useCard';
import { MarketType } from '@/typings/card.enum';
import { CardItem } from '@/typings/card';
import { User } from '@/typings/user';
import {
  PersonalInformation,
  TransactionInformation,
} from '@/features/core/Cards';

const CardDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetCardDetail(id as string, MarketType.OWNER, !!id);

  return (
    <MainLayout>
      <Container py={10}>
        <Flex
          gap={[2, 2, 6]}
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <Box
            w="100%"
            maxW={['220px', '220px', '320px']}
            flexShrink={0}
            mx="auto"
          >
            <ShowAnimation>
              <CardImageLoader src={data?.imageUrl as string} width="100%" />
            </ShowAnimation>
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

export default CardDetail;
