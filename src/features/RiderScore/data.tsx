import { Flex, Text } from '@chakra-ui/react';
import _get from 'lodash/get';

import { Cell } from '../core/Table/TableInfo';
import JerseyCardTable from '../core/Cards/JerseyCardTable';

import { RedirectCardDetail } from '../core/Common';

import CupIcon from '@/icons/CupIcon';
import { Sale } from '@/typings/card';

import { formatDateTime } from '@/utils/date';
import Translate from '@/components/Translate';
import { MarketType } from '@/typings/card.enum';
import { BaseButton } from '@/components/Button';
import { GRAY_CARD } from '@/constants/images';
import { NftBid } from '@/typings/auction';
import { CardImageLoader } from '@/components/Common';

export const LIMIT_RIDER_SCORE = 5;

export const historyBirdColumns: Cell<NftBid>[] = [
  {
    cellProps: {
      fontWeight: 'bold',
    },
    Cell: (_, index, { page }) => {
      const currentIndex = (page - 1) * LIMIT_RIDER_SCORE + index;
      return page === 1 && index === 0 ? (
        <CupIcon width={['20px', '34px']} height={['20px', '34px']} />
      ) : (
        <Text textAlign="center" minW={['20px', '34px']} maxW="fit-content">
          {currentIndex + 1}
        </Text>
      );
    },
  },
  {
    Cell: (nftBid) => (
      <Flex justifyContent="center">
        <JerseyCardTable user={nftBid?.bidder} />
      </Flex>
    ),
  },
  {
    Cell: (nftBid) => `${nftBid?.amount || 0}$`,
  },
  {
    Cell: (nftBid) => formatDateTime(nftBid?.createdAt),
  },
];

export const cardHistoryColumns: Cell<Sale>[] = [
  {
    Cell: (sale) => (
      <RedirectCardDetail id={sale?.nft?.id}>
        <CardImageLoader
          src={sale?.nft?.imageUrl || GRAY_CARD}
          width="31px"
          height="50px"
        />
      </RedirectCardDetail>
    ),
  },
  {
    Cell: (sale) => (
      <RedirectCardDetail id={sale?.nft?.id}>
        {`${_get(sale, 'nft.serialNumber', 0)}/${_get(
          sale,
          'nft.lastSerialNumber',
          0
        )}`}
      </RedirectCardDetail>
    ),
  },
  {
    Cell: (sale) => _get(sale, 'nft.name', ''),
  },
  {
    cellProps: {
      textTransform: 'uppercase',
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Cell: (saleData, _, { onClickViewDetail }) => {
      const isAuction = saleData?.marketType === MarketType.AUCTION;
      return (
        <Flex
          alignItems="center"
          gap="8px"
          flexDirection={['column', 'column', 'row']}
        >
          <Translate text={isAuction ? 'auction' : 'transfer'} />
          {isAuction && (
            <BaseButton
              variant="outline"
              display="flex"
              alignItems="center"
              as="span"
              p="8px 5px"
              paddingInlineStart="2px"
              paddingInlineEnd="2px"
              maxH="fit-content"
              lineHeight="150%"
              onClick={() => onClickViewDetail(saleData)}
              size={['xs', 'sm', 'md']}
              fontSize={['12px', '12px', '14px']}
            >
              <Translate text="view_details" />
            </BaseButton>
          )}
        </Flex>
      );
    },
  },
  {
    Cell: (saleData) => (
      <Flex
        gap={[2, 2, 5]}
        alignItems="center"
        flexDirection={['column', 'column', 'row']}
      >
        {saleData?.toUser && !Array.isArray(saleData?.toUser) && (
          <>
            <Text textTransform="uppercase">
              <Translate text="buyer" />
            </Text>
            <JerseyCardTable user={saleData?.toUser} />
          </>
        )}
      </Flex>
    ),
  },
  {
    Cell: (sale) => `${sale?.amount || 0}$`,
  },
  {
    Cell: (sale) => formatDateTime(sale?.createdAt),
  },
];
