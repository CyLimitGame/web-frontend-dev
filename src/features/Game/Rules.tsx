import {
  Tab,
  TabList,
  Tabs,
  Icon,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import React from 'react';
import { MdOutlineReadMore, MdOutlineRule } from 'react-icons/md';
import { useTranslation } from 'next-i18next';

import LineUp from './LineUp';
import Scoring from './Scoring';

import { Text } from '@/components/Common';

type Props = {
  gameId: string;
};

const Rules = ({ gameId }: Props) => {
  const { t } = useTranslation();

  return (
    <Tabs>
      <TabList maxW="300px">
        <Tab>
          <Text display={['none', 'none', 'block']}>{t('line_up')}</Text>
          <Icon
            display={['inline-block', 'none', 'none']}
            as={MdOutlineRule}
            fontSize="2xl"
          />
        </Tab>
        <Tab>
          <Text display={['none', 'none', 'block']}>{t('scoring')}</Text>
          <Icon
            display={['inline-block', 'none', 'none']}
            as={MdOutlineReadMore}
            fontSize="2xl"
          />
        </Tab>
      </TabList>
      <TabPanels pt={2} sx={{ '.chakra-tabs__tab-panel': { p: 0 } }}>
        <TabPanel>
          <LineUp gameId={gameId} />
        </TabPanel>
        <TabPanel>
          <Scoring />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Rules;
