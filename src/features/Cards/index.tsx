import React, { useCallback, useMemo, useState } from 'react';
import { Box, Collapse, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import dayjs from 'dayjs';
import Image from 'next/image';
import { AiOutlineArrowRight, AiOutlineClockCircle } from 'react-icons/ai';
import { useTranslation } from 'next-i18next';

import moment from 'moment';

import Link from 'next/link';

import LevelProgressBar from '../core/Common/LevelProgressBar';
import Title from '../core/Common/Title';
import TableInfo from '../core/Table/TableInfo';
import ViewRiderCollections from '../core/Common/ViewRiderCollections';
import ClipboardAndLink from '../core/Common/ClipboardAndLink';

import TransferXp from '../core/Cards/OwnerCard/TransferXp';
import RiderPerformance from '../core/Cards/RiderPerformance';
import { ViewPcsLink } from '../core/Common';

import Actions from './Actions';
import { historyBirdColumns, cardHistoryColumns } from './data';

import LatestSale from './LatestSale';

import MainLayout from '@/layouts/MainLayout';
import {
  AvgCapScoreAndBonus,
  Container,
  CountdownTime,
  ShowAnimation,
  Text,
} from '@/components/Common';
import { useGetDetailCard } from '@/queries/useAuction';
import { AuctionBid, AuctionCard } from '@/typings/auction';
import { useListenPayment } from '@/queries/usePayment';
import { getNationalityName, shortAddress } from '@/utils/common';
import { getAgeByDateOfBirth, getLinkPolygonScan } from '@/utils/card';
import { useGetUserProfile } from '@/queries/useUser';
import { MarketType } from '@/typings/card.enum';
import { BaseButton } from '@/components/Button';
import { RacesScore } from '@/typings/card';
import { PATH } from '@/constants/path';
import { getCardImage, getTemplatePath } from '@/utils/string';

const Cards = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const [isDisableBid, setIsDisableBid] = useState(false);
  const { data: userInfo } = useGetUserProfile();
  const { data, refetch } = useGetDetailCard({ id: id as string });
  useListenPayment({});

  //View history
  const { isOpen, onToggle } = useDisclosure();

  const totalXpToNextLevel = _.get(data, 'totalXpToNextLevel', 0);
  const level = _.get(data, 'level', 0);
  const totalXp = _.get(data, 'totalXp', 0);
  const isHasData = !!data;
  const isAuctionType = isHasData && data?.marketType === MarketType.AUCTION;
  const isMyOwner = _.get(userInfo, 'id') === _.get(data, 'ownerId');
  const isOwnerType =
    isHasData && data?.marketType === MarketType.OWNER && isMyOwner;

  const handleCompleteTime = useCallback(() => {
    setIsDisableBid(true);
    const now = dayjs();
    const time = dayjs(data?.auctionEndDate);
    const secondsDiff = now.diff(time, 'second');
    if (secondsDiff < 1) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [data?.auctionEndDate]);

  const auctionBidsSorted: AuctionBid[] = useMemo(() => {
    if (!data?.auctionBids) return [];
    return _.sortBy(data?.auctionBids, (auctionBid) => -auctionBid.amount);
  }, [data?.auctionBids]);

  const sales = useMemo(() => _.get(data, 'sales', []), [data?.sales]);

  const riderData = useMemo(
    () => [
      {
        label: 'current_team',
        value: _.get(data, 'rider.actualTeam.name', ''),
      },
      {
        label: 'current_team_division',
        value: _.get(data, 'typeOfCard', ''),
      },
      {
        label: 'age',
        value: getAgeByDateOfBirth(_.get(data, 'rider.dob', '')),
      },
      {
        label: 'nationality',
        value: getNationalityName(_.get(data, 'rider.nationality', '')),
      },
      {
        label: 'rider_collections',
        value: <ViewRiderCollections riderId={_.get(data, 'rider.id', '')} />,
      },
      {
        label: 'lien_pcs',
        value: (
          <Link href={_.get(data, 'rider.pcsUrl', '')} passHref>
            <Box as="a" target="_blank">
              <ViewPcsLink />
            </Box>
          </Link>
        ),
      },
    ],
    [data]
  );

  const cardData = useMemo(() => {
    const values = [
      {
        label: 'card_team',
        value: _.get(data, 'team.name', ''),
      },
      {
        label: 'card_season',
        value: _.get(data, 'yearOfEdition', ''),
      },
      {
        label: 'rarity',
        value: _.get(data, 'rarity', ''),
      },
      {
        label: 'serial_number',
        value: _.get(data, 'serialNumber', ''),
      },
    ];
    const contractAddress = _.get(data, 'contractAddress', '');
    if (contractAddress) {
      values.push({
        label: 'contract_address',
        value: (
          <ClipboardAndLink
            justifyContent="flex-end"
            text={shortAddress(contractAddress || '')}
            valueCopy={contractAddress}
            href={getLinkPolygonScan(contractAddress)}
            linkProps={{
              target: '_blank',
            }}
          />
        ),
      });
    }
    const tokenId = _.get(data, 'tokenId', '');
    if (tokenId) {
      values.push({
        label: 'token_id',
        value: (
          <ClipboardAndLink
            justifyContent="flex-end"
            text={tokenId}
            valueCopy={tokenId}
          />
        ),
      });
    }
    return values;
  }, [data]);

  const raceScores: RacesScore[] = useMemo(
    () => _.get(data, 'rider.raceScores', []),
    [data]
  );

  return (
    <MainLayout>
      <Container py={6}>
        <Flex
          gap={['40px', '40px', '40px', '20px', '60px']}
          flexDirection={['column', 'column', 'column', 'row']}
          alignItems={['center', 'center', 'center', 'flex-start']}
          mb="40px"
        >
          <Box
            w="100%"
            maxW={['220px', '220px', '320px']}
            flexShrink={0}
            mx={['auto', 'auto', 'auto', '0']}
            backgroundColor="whiteAlpha.160"
            p="10px 10px 16px 10px"
            borderRadius="20px"
            height="fit-content"
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
                  <Image src={getCardImage(data)} layout="fill" />
                </Box>
              </Box>
            </ShowAnimation>
            <Box mt={2}>
              <AvgCapScoreAndBonus item={data} />
            </Box>
          </Box>
          <Flex
            flexDirection="column"
            alignItems={['center', 'center', 'center', 'flex-start']}
            flex={1}
            gap={[5, 5, 8]}
            maxW="540px"
          >
            <Flex justifyContent="space-between">
              <Link
                href={getTemplatePath(PATH.RIDER_SCORE, {
                  riderId: data?.riderId,
                })}
                passHref
              >
                <Text
                  color="white"
                  fontSize={['2xl', '2xl', '3xl', '4xl']}
                  fontWeight="bold"
                  cursor="pointer"
                  as="a"
                  _hover={{ opacity: 0.5 }}
                >
                  {data?.name}
                </Text>
              </Link>
            </Flex>
            {isHasData && data?.rarity !== 'na' && (
              <>
                <LevelProgressBar
                  value={totalXp}
                  total={totalXpToNextLevel + totalXp}
                  level={level}
                />
                <Actions
                  item={data as AuctionCard}
                  userInfo={userInfo}
                  isDisableBid={isDisableBid}
                  onSuccess={refetch}
                />
              </>
            )}
          </Flex>
          {isAuctionType && (
            <Box>
              <Flex justifyContent="center" alignItems="center" gap="10px">
                <Icon as={AiOutlineClockCircle} h="25px" w="25px" />
                <Box minW={['auto', 'auto', 'auto', '300px']} fontSize="20px">
                  <CountdownTime
                    date={data?.auctionEndDate}
                    onComplete={handleCompleteTime}
                    onRetryEnable={() => setIsDisableBid(false)}
                  />
                </Box>
              </Flex>
            </Box>
          )}
          {isOwnerType && data?.rarity !== 'na' && (
            <TransferXp
              item={data}
              renderTarget={(openModalTransferXp) => (
                <BaseButton
                  variant="secondaryLight"
                  onClick={openModalTransferXp}
                  size={['sm', 'lg']}
                >
                  <Flex alignItems="center" gap="10px">
                    {t('boost_xp')}
                    <Icon as={AiOutlineArrowRight} />
                  </Flex>
                </BaseButton>
              )}
            />
          )}
        </Flex>
        {raceScores.length > 0 ? (
          <>
            <Title title="performance" mb={2} />
            <RiderPerformance data={raceScores} />
          </>
        ) : null}

        <TableInfo
          title="card_history"
          data={_.sortBy(sales, (item) => -moment(item.createdAt))}
          formatCell={cardHistoryColumns}
          mb="34px"
          metaData={{
            isHiddenButtonViewDetail: auctionBidsSorted.length === 0,
            onClickViewDetail: onToggle,
            isOpen,
          }}
        />
        <Collapse in={isAuctionType || isOpen}>
          <TableInfo
            title="bid_history"
            data={auctionBidsSorted}
            formatCell={historyBirdColumns}
            mb="34px"
          />
        </Collapse>

        <Flex
          gap="20px"
          flexDirection={['column', 'column', 'column', 'row']}
          mb="34px"
        >
          <TableInfo title="rider_details" data={riderData} flex="1" />
          <TableInfo title="card_details" data={cardData} flex="1" />
        </Flex>
        <Box>
          <LatestSale
            riderId={_.get(data, 'riderId', '')}
            rarity={_.get(data, 'rarity', '')}
          />
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Cards;
