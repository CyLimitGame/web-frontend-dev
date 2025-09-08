import React from 'react';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Icon,
} from '@chakra-ui/react';
import Image from 'next/image';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import { MdInfoOutline, MdRedeem } from 'react-icons/md';

import RaceInfo from './RaceInfo';
import Rewards from './Rewards';

import { useGetTemplateRule } from '@/queries/useGame';
import { Text } from '@/components/Common';

type Props = {
  gameId: string;
};

const Info = ({ gameId }: Props) => {
  const { t } = useTranslation();
  const { data } = useGetTemplateRule(gameId);

  const imageUrl = _.get(data, 'imageUrl', '');

  return (
    <Box>
      <Tabs>
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems={['start', 'start', 'center']}
          direction={['column', 'column', 'row']}
          gap={2}
        >
          <TabList w="300px">
            <Tab>
              <Text display={['none', 'none', 'block']}>{t('race_info')}</Text>
              <Icon
                as={MdInfoOutline}
                display={['inline-block', 'none', 'none']}
                fontSize="2xl"
              />
            </Tab>
            <Tab>
              <Text display={['none', 'none', 'block']}>{t('reward')}</Text>
              <Icon
                as={MdRedeem}
                display={['inline-block', 'none', 'none']}
                fontSize="2xl"
              />
            </Tab>
          </TabList>
          <Box>
            <Flex justifyContent="end">
              <Image src={imageUrl} width="200px" height="100px" />
            </Flex>
          </Box>
        </Flex>

        <TabPanels pt={2} sx={{ '.chakra-tabs__tab-panel': { p: 0 } }}>
          <TabPanel>
            <RaceInfo gameId={gameId} />
          </TabPanel>
          <TabPanel>
            <Rewards gameId={gameId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Info;
