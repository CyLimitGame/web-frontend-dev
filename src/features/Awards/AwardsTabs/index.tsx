import React from 'react';
import { Tab, TabList, Tabs } from '@chakra-ui/react';

import { useRouter } from 'next/router';

import _ from 'lodash';

import { useTranslation } from 'next-i18next';

import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { SelectInput } from '@/components/Inputs';
export enum TabName {
  UNDERSTANDING_RULES = 'understanding_rules',
  FRIENDS_PROGRESSION = 'friends_progression',
  FANTASY_GAME_PROGRESSION = 'fantasy_game_progression',
  COLLECTIBLE_PROGRESSION = 'collectible_progression',
}

const tabs = [
  {
    value: TabName.UNDERSTANDING_RULES,
    label: TabName.UNDERSTANDING_RULES,
    id: 0,
  },
  {
    value: TabName.FRIENDS_PROGRESSION,
    label: TabName.FRIENDS_PROGRESSION,
    id: 1,
  },
  {
    value: TabName.FANTASY_GAME_PROGRESSION,
    label: TabName.FANTASY_GAME_PROGRESSION,
    id: 2,
  },
  {
    value: TabName.COLLECTIBLE_PROGRESSION,
    label: TabName.COLLECTIBLE_PROGRESSION,
    id: 3,
  },
];

const AwardsTabs = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { tab } = router.query;
  const index = _.findIndex(tabs, ({ value }) => value === tab);
  const tabIndex = index === -1 ? 0 : index;

  return (
    <React.Fragment>
      <SelectInput
        choices={tabs}
        bg="primary.50 !important"
        formControlProps={{ width: ['100%', '100%', '100%', '260px'] }}
        color="black"
        style={{ color: 'black' }}
        name="tab"
        value={tab}
        onChange={(e) =>
          navigateTo(PATH.AWARDS, {
            tab: e.target.value,
          })
        }
        display={['block', 'block', 'none']}
      />
      <Tabs index={tabIndex} display={['none', 'none', 'block']}>
        <TabList>
          {tabs.map(({ id, value, label }) => (
            <Tab
              key={id}
              value={value}
              onClick={() =>
                navigateTo(PATH.AWARDS, {
                  tab: value,
                })
              }
            >
              {t(label)}
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </React.Fragment>
  );
};

export default AwardsTabs;
