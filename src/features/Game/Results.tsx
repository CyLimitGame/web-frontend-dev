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
import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { MdDirectionsBike, MdEmojiEvents, MdRedeem } from 'react-icons/md';

import Rank from './Rank';
import Riders from './Riders';
import RewardPool from './RewardPool';

import { useGetTemplateRule } from '@/queries/useGame';
import { Text } from '@/components/Common';

type Props = {
  gameId: string;
};

const Results = ({ gameId }: Props) => {
  const router = useRouter();
  const status = _.get(router, 'query.status', 'comming');

  const { t } = useTranslation();
  const { data } = useGetTemplateRule(gameId);

  const imageUrl = _.get(data, 'imageUrl', '');

  return (
    <Box>
      <Tabs>
        <Flex
          justifyContent="space-between"
          alignItems={['start', 'start', 'center']}
          direction={['column', 'column', 'row']}
          gap={2}
        >
          <TabList>
            {status !== 'comming' && (
              <Tab w={['100px', '100px', '200px']}>
                <Text display={['none', 'none', 'block']}>{t('rank')}</Text>
                <Icon
                  display={['inline-block', 'none', 'none']}
                  as={MdEmojiEvents}
                  fontSize="2xl"
                />
              </Tab>
            )}
            {status !== 'comming' && (
              <Tab w={['100px', '100px', '200px']}>
                <Text display={['none', 'none', 'block']}>{t('riders')}</Text>
                <Icon
                  display={['inline-block', 'none', 'none']}
                  as={MdDirectionsBike}
                  fontSize="2xl"
                />
              </Tab>
            )}
            <Tab w={['100px', '100px', '200px']}>
              <Text display={['none', 'none', 'block']}>
                {t('reward_pool')}
              </Text>
              <Icon
                display={['inline-block', 'none', 'none']}
                as={MdRedeem}
                fontSize="2xl"
              />
            </Tab>
          </TabList>
          <Box mx={['auto', 'auto', 0]}>
            <Flex justifyContent="end">
              <Image src={imageUrl} width="200px" height="100px" />
            </Flex>
          </Box>
        </Flex>
        <TabPanels pt={2} sx={{ '.chakra-tabs__tab-panel': { p: 0 } }}>
          {status !== 'comming' && (
            <TabPanel>
              <Rank gameId={gameId} />
            </TabPanel>
          )}
          {status !== 'comming' && (
            <TabPanel>
              <Riders gameId={gameId} />
            </TabPanel>
          )}
          <TabPanel>
            <RewardPool gameId={gameId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Results;
