import React from 'react';
import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import _ from 'lodash';

import { PATH } from '@/constants/path';
import { getTemplatePath } from '@/utils/string';
import { useGetNftsByRider } from '@/queries/useCard';

const MAP_TAB = {
  ['/rider-score/[id]']: 0,
  ['/rider-collections/[id]']: 1,
};

const RiderCollectionTabs = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const path = router.pathname as keyof typeof MAP_TAB;

  const { data } = useGetNftsByRider({
    riderId: id as string,
    page: 1,
    limit: 1,
  });

  return (
    <Tabs index={MAP_TAB[path] || 0}>
      <TabList mb={4} maxW={['auto', 'auto', 'auto', 'fit-content']}>
        <Link href={getTemplatePath(PATH.RIDER_SCORE, { riderId: id })}>
          <Tab>{t('stats')}</Tab>
        </Link>

        <Link href={getTemplatePath(PATH.RIDER_COLLECTIONS, { riderId: id })}>
          <Tab isDisabled={_.isEmpty(data?.items)}>{t('cards')}</Tab>
        </Link>
      </TabList>
    </Tabs>
  );
};

export default RiderCollectionTabs;
