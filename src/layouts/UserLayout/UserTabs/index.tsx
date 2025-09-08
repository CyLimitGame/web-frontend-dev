import React from 'react';
import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

const UserTabs = () => {
  const { t } = useTranslation();

  return (
    <Tabs mt={2}>
      <TabList>
        <Tab>{t('collection')}</Tab>
      </TabList>
    </Tabs>
  );
};

export default UserTabs;
