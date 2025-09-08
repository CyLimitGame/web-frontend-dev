import React, { useState } from 'react';
import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { SelectInput } from '@/components/Inputs';

const MAP_TAB = {
  [PATH.AWARDS]: 0,
  [PATH.MY_BIDS]: 1,
  [PATH.MY_SALES]: 2,
  [PATH.REFERRAL_GIFTS]: 3,
  // '/my-profile/affiliate-take-reward/[id]': 4,
  [PATH.MY_FOLLOWERS]: 4,
  [PATH.MY_FAVORITES]: 5,
};

const MAP_VALUE = {
  [PATH.AWARDS]: PATH.AWARDS,
  [PATH.MY_BIDS]: PATH.MY_BIDS,
  [PATH.MY_SALES]: PATH.MY_SALES,
  [PATH.REFERRAL_GIFTS]: PATH.REFERRAL_GIFTS,
  '/my-profile/affiliate-take-reward/[id]': PATH.REFERRAL_GIFTS,
  [PATH.MY_FOLLOWERS]: PATH.MY_FOLLOWERS,
  [PATH.MY_FAVORITES]: PATH.MY_FAVORITES,
};

const TAB_LIST = [
  { id: PATH.AWARDS, label: 'awards', value: PATH.AWARDS },
  { id: PATH.MY_BIDS, label: 'my_bids', value: PATH.MY_BIDS },
  { id: PATH.MY_SALES, label: 'my_sales', value: PATH.MY_SALES },
  {
    id: PATH.REFERRAL_GIFTS,
    label: 'referral_gifts',
    value: PATH.REFERRAL_GIFTS,
  },
  { id: PATH.MY_FOLLOWERS, label: 'follows', value: PATH.MY_FOLLOWERS },
  { id: PATH.MY_FAVORITES, label: 'my_favorites', value: PATH.MY_FAVORITES },
];

const MyProfileTabs = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const path = router.pathname;

  const [tabIndex, setTabIndex] = useState(MAP_TAB[path]);

  return (
    <React.Fragment>
      <SelectInput
        choices={TAB_LIST}
        bg="primary.50 !important"
        formControlProps={{ width: ['100%', '100%', '100%', '260px'] }}
        color="black"
        style={{ color: 'black' }}
        name="tab"
        value={_.get(MAP_VALUE, path)}
        onChange={(e) => navigateTo(e.target.value)}
        display={['block', 'block', 'none']}
      />
      <Tabs
        mt={2}
        index={tabIndex}
        onChange={(index) => {
          setTabIndex(index);
        }}
        display={['none', 'none', 'block']}
      >
        <TabList>
          {_.map(TAB_LIST, (tab, index) => (
            <Tab
              key={index}
              value={tab.value}
              onClick={() => navigateTo(tab.value)}
            >
              {t(tab.label)}
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </React.Fragment>
  );
};

export default MyProfileTabs;
