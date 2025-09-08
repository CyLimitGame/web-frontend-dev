import React from 'react';
import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { getTemplatePath } from '@/utils/string';

const GameDetailTabs = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id, tab } = router.query;

  const handleChangeTab = (value: number) => {
    const URL = getTemplatePath(PATH.GAME_DETAIL, { gameId: id });
    value === 0 && navigateTo(`${URL}?tab=0`);
    value === 1 && navigateTo(`${URL}?tab=1`);
    value === 2 && navigateTo(`${URL}?tab=2`);
  };

  return (
    <Tabs mt={2} index={Number(tab) || 0} onChange={handleChangeTab}>
      <TabList>
        <Tab>{t('race_information')}</Tab>
        <Tab>{t('team_composition')}</Tab>
        <Tab>{t('rewards')}</Tab>
      </TabList>
    </Tabs>
  );
};

export default GameDetailTabs;
