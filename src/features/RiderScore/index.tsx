import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';

import Title from '../core/Common/Title';
import RiderPerformance from '../core/Cards/RiderPerformance';
import TableInfo from '../core/Table/TableInfo';
import { ViewPcsLink } from '../core/Common';

import ScoreTable from './ScoreTable';
import BidHistory from './BidHistory';

import LatestSale from './LatestSale';

import RiderCollectionLayout from '@/layouts/RiderCollectionLayout';
import useParamsQuery from '@/hooks/useGetParams';
import { useGetRiderInfo } from '@/queries/useCard';
import { RacesScore, Sale } from '@/typings/card';
import { getNationalityName } from '@/utils/common';
import { getAgeByDateOfBirth } from '@/utils/card';

const RiderCollections = () => {
  const { getParam } = useParamsQuery();
  const riderId = getParam('id');
  const { data: riderInfo } = useGetRiderInfo(riderId);
  const [selectedSaleData, setSelectedSaleData] = useState<Sale | null>(null);

  const performance: RacesScore[] = useMemo(
    () => _.get(riderInfo, 'performance', []),
    [riderInfo]
  );

  const raceScores: RacesScore[] = useMemo(
    () => _.get(riderInfo, 'raceScores', []),
    [riderInfo]
  );

  const riderName = _.get(riderInfo, 'name');

  const riderData = useMemo(
    () => [
      {
        label: 'name',
        value: _.get(riderInfo, 'name', ''),
      },
      {
        label: 'current_team',
        value: _.get(riderInfo, 'actualTeam.name', ''),
      },
      {
        label: 'current_team_division',
        value: _.get(riderInfo, 'typeOfCard', ''),
      },
      {
        label: 'age',
        value: getAgeByDateOfBirth(_.get(riderInfo, 'dob', '')),
      },
      {
        label: 'nationality',
        value: getNationalityName(_.get(riderInfo, 'nationality', '')),
      },
      {
        label: 'lien_pcs',
        value: (
          <Link href={_.get(riderInfo, 'pcsUrl', '')} passHref>
            <Box as="a" target="_blank">
              <ViewPcsLink />
            </Box>
          </Link>
        ),
      },
    ],
    [riderInfo]
  );

  return (
    <RiderCollectionLayout name={riderName} isHiddenChild={!riderInfo}>
      {performance.length > 0 ? (
        <>
          <Title title="performance" mb={2} />
          <RiderPerformance data={performance} />
        </>
      ) : null}
      <Flex
        flexDirection={['column', 'column', 'column', 'row']}
        gap="20px"
        mb="34px"
      >
        {raceScores && raceScores.length > 0 ? (
          <ScoreTable races={raceScores} flex="1" />
        ) : null}
        <TableInfo title="rider_details" data={riderData} />
      </Flex>
      <LatestSale riderId={riderId} onViewDetail={setSelectedSaleData} />
      <BidHistory
        saleData={selectedSaleData}
        onClose={() => setSelectedSaleData(null)}
      />
    </RiderCollectionLayout>
  );
};

export default RiderCollections;
