import { Box, Flex, Text } from '@chakra-ui/react';
import _ from 'lodash';

import Link from 'next/link';

import { Cell } from '../core/Table/TableInfo';
import JerseyCardTable from '../core/Cards/JerseyCardTable';

import { RedirectCardDetail } from '../core/Common';

import CupIcon from '@/icons/CupIcon';
import { AuctionBid } from '@/typings/auction';
import { Sale } from '@/typings/card';

import { formatDateTime } from '@/utils/date';
import Translate from '@/components/Translate';
import { MarketType } from '@/typings/card.enum';
import { BaseButton } from '@/components/Button';
import { GRAY_CARD } from '@/constants/images';
import { CardImageLoader } from '@/components/Common';
import { getTemplatePath } from '@/utils/string';
import { PATH } from '@/constants/path';

export const LIMIT_RIDER_SCORE = 5;

export const historyBirdColumns: Cell<AuctionBid>[] = [
  {
    cellProps: {
      fontWeight: 'bold',
    },
    Cell: (_, index) =>
      index === 0 ? (
        <CupIcon width={['20px', '34px']} height={['20px', '34px']} />
      ) : (
        <Text textAlign="center" minW={['20px', '34px']} maxW="fit-content">
          {index + 1}
        </Text>
      ),
  },
  {
    Cell: (auctionBid) => (
      <Flex justifyContent="center">
        <JerseyCardTable user={auctionBid?.bidder} />
      </Flex>
    ),
  },
  {
    Cell: (auctionBid) => `${auctionBid?.amount || 0}$`,
  },
  {
    Cell: (auctionBid) => formatDateTime(auctionBid?.createdAt),
  },
];

export const cardHistoryColumns: Cell<Sale>[] = [
  {
    cellProps: {
      textTransform: 'uppercase',
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Cell: (
      saleData,
      _,
      { onClickViewDetail, isHiddenButtonViewDetail, isOpen }
    ) => {
      const isAuction = saleData?.marketType === MarketType.AUCTION;
      return (
        <Flex
          alignItems="center"
          gap="8px"
          flexDirection={['column', 'column', 'row']}
        >
          <Translate text={isAuction ? 'auction' : 'transfer'} />
          {isAuction && !isHiddenButtonViewDetail && (
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
              onClick={onClickViewDetail}
              size={['xs', 'sm', 'sm']}
              fontSize={['12px', '12px', '14px']}
            >
              <Translate text={!isOpen ? 'view_details' : 'hide_details'} />
            </BaseButton>
          )}
        </Flex>
      );
    },
  },
  {
    Cell: (saleData) => (
      <Flex
        justifyContent="center"
        gap="16px"
        alignItems="center"
        flexDirection={['column', 'column', 'row']}
      >
        <Text textTransform="uppercase">
          <Translate text="buyer" />
        </Text>
        <JerseyCardTable user={saleData?.toUser} />
      </Flex>
    ),
  },
  {
    Cell: (auctionBid) => `${auctionBid?.amount || 0}$`,
  },
  {
    Cell: (auctionBid) => formatDateTime(auctionBid?.createdAt),
  },
];

export const saleHistoryColumns: Cell<Sale>[] = [
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
        {`${_.get(sale, 'nft.serialNumber', 0)}/${_.get(
          sale,
          'nft.lastSerialNumber',
          0
        )}`}
      </RedirectCardDetail>
    ),
  },
  {
    Cell: (sale) => (
      <Link
        href={getTemplatePath(PATH.RIDER_SCORE, {
          riderId: _.get(sale, 'riderId', ''),
        })}
        passHref
      >
        <Box cursor="pointer" _hover={{ opacity: 0.5 }} as="a">
          {_.get(sale, 'nft.name', '')}
        </Box>
      </Link>
    ),
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
