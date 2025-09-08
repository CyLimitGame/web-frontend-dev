import React, { useState } from 'react';
import { Tab, TabList, Tabs, useMediaQuery } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { useGetCountMyTeamTabs } from '@/queries/useUser';
import { SelectInput } from '@/components/Inputs';

type TabItemProps = {
  title: string;
  total: number;
};

const MAP_TAB = {
  [PATH.MY_CARDS]: 0,
  [PATH.AUCTION_WINNINGS]: 1,
  [PATH.BUNDLE_WINNINGS]: 2,
};

const TabItem = ({ title, total }: TabItemProps) => {
  const { t } = useTranslation();

  return (
    <Tab
      color="gray.900"
      fontSize={['sm', 'sm', 'md']}
      _active={{ backgroundColor: 'transparent' }}
      _selected={{
        fontWeight: 'bold',
        borderColor: 'primary.500',
        color: 'primary.500',
      }}
    >
      {t(title, { total })}
    </Tab>
  );
};

const MyTeamTabs = () => {
  const router = useRouter();
  const path = router.pathname;
  const [tabSelected, setTabSelected] = useState(MAP_TAB[path]);
  const { data } = useGetCountMyTeamTabs();

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const { t } = useTranslation();

  const countNfts = _.get(data, 'countNfts', 0);
  const countWinningAuctions = _.get(data, 'countWinningAuctions', 0);
  const countWinningBundleAuctions = _.get(
    data,
    'countWinningBundleAuctions',
    0
  );

  const handleChangeTab = (value: number) => {
    setTabSelected(value);
    value === 0 && navigateTo(PATH.MY_CARDS);
    value === 1 && navigateTo(PATH.AUCTION_WINNINGS);
    value === 2 && navigateTo(PATH.BUNDLE_WINNINGS);
  };

  if (!isLargerThan768) {
    return (
      <SelectInput
        name="check"
        choices={[
          { id: 0, value: 0, label: t('my_cards_total', { total: countNfts }) },
          {
            id: 1,
            value: 1,
            label: t('auction_wining', { total: countWinningAuctions }),
          },
          {
            id: 2,
            value: 2,
            label: t('bundle_wining', { total: countWinningBundleAuctions }),
          },
        ]}
        style={{ color: 'black' }}
        bg="primary.50 !important"
        color="black"
        mb={4}
        value={MAP_TAB[path]}
        onChange={({ target: { value } }) => handleChangeTab(Number(value))}
      />
    );
  }

  return (
    <Tabs align="start" index={tabSelected} onChange={handleChangeTab}>
      <TabList mb={4}>
        <TabItem title="my_cards_total" total={countNfts} />
      </TabList>
    </Tabs>
  );
};

export default MyTeamTabs;
