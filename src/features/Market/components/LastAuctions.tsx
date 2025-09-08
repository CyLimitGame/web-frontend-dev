import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { CardImageLoader, CountdownTime, DataGrid } from '@/components/Common';

import { useGetCards } from '@/queries/useCard';
import { AuctionCard } from '@/typings/auction';
import { PATH } from '@/constants/path';
import { getTemplatePath } from '@/utils/string';

const Card = ({ data }: { data: AuctionCard }) => {
  return (
    <Link href={getTemplatePath(PATH.CARD_DETAILS, { id: data?.id })} passHref>
      <Box
        cursor="pointer"
        transition="transform .2s"
        as="a"
        _hover={{ opacity: 0.5 }}
      >
        <CardImageLoader src={data.imageUrl} />
        <CountdownTime
          date={data?.auctionEndDate}
          renderCustom={(time, { days, hours }) => (
            <Text
              fontSize="sm"
              color={days === 0 && hours === 0 ? 'red' : 'white'}
              mt={2}
              textAlign="center"
            >
              {time}
            </Text>
          )}
        />
      </Box>
    </Link>
  );
};
const LastAuctions = () => {
  const { t } = useTranslation();
  const { data } = useGetCards(
    {
      page: 1,
      limit: 4,
    },
    true
  );

  if (!data || data.items?.length === 0) return null;

  return (
    <Box>
      <Link href={PATH.MARKET} passHref>
        <Text
          cursor="pointer"
          textTransform="uppercase"
          fontStyle="normal"
          fontWeight="bold"
          fontSize={['16px', '22px', '28px']}
          mb="12px"
          as="a"
          userSelect="none"
          _hover={{ opacity: 0.5 }}
        >
          {t('next_auctions')}
        </Text>
      </Link>
      <Box border="2px solid white" borderRadius="3xl" p={2}>
        <DataGrid
          columns={[2, 4]}
          gap={2}
          data={data?.items || []}
          renderItem={(item) => <Card data={item} />}
        />
      </Box>
    </Box>
  );
};

export default LastAuctions;
