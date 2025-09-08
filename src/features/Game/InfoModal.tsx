import React, { useContext } from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Icon,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import {
  MdOutlineRule,
  MdGroups,
  MdInfoOutline,
  MdBarChart,
} from 'react-icons/md';

import Rules from './Rules';
import MyTeams from './MyTeams';
import Info from './Info';
import Results from './Results';
import { GameContext } from './GameContext';

import { BaseModal } from '@/components/Modal';
import { BaseModalProps } from '@/components/Modal/BaseModal';

type Props = Omit<BaseModalProps, 'children'> & {
  gameId: string;
};

const InfoModal = ({ gameId, ...props }: Props) => {
  const { gameContext, setGameContext } = useContext(GameContext);
  const { t } = useTranslation();
  const handleClick = (index: number) => {
    setGameContext({ activeIndex: index });
  };

  return (
    <BaseModal
      {...props}
      size="6xl"
      closeable
      title="info"
      isUseDrawerForMobile
      placement="right"
    >
      <Tabs index={gameContext.activeIndex}>
        <TabList maxW="600px">
          <Tab onClick={() => handleClick(0)}>
            <Text display={['none', 'none', 'block']}>{t('rules')}</Text>
            <Icon
              display={['inline-block', 'none', 'none']}
              as={MdOutlineRule}
              fontSize="2xl"
            />
          </Tab>
          <Tab onClick={() => handleClick(1)}>
            <Text display={['none', 'none', 'block']}>{t('my_teams')}</Text>
            <Icon
              display={['inline-block', 'none', 'none']}
              as={MdGroups}
              fontSize="2xl"
            />
          </Tab>
          <Tab onClick={() => handleClick(2)}>
            <Text display={['none', 'none', 'block']}>{t('info')}</Text>
            <Icon
              display={['inline-block', 'none', 'none']}
              as={MdInfoOutline}
              fontSize="2xl"
            />
          </Tab>
          <Tab onClick={() => handleClick(3)} fontSize={['xs', 'sm', 'md']}>
            <Text display={['none', 'none', 'block']}>{t('results')}</Text>
            <Icon
              display={['inline-block', 'none', 'none']}
              as={MdBarChart}
              fontSize="2xl"
            />
          </Tab>
        </TabList>
        <TabPanels pt={2} sx={{ '.chakra-tabs__tab-panel': { p: 0 } }}>
          <TabPanel>
            <Rules gameId={gameId} />
          </TabPanel>
          <TabPanel>
            <MyTeams gameId={gameId} />
          </TabPanel>
          <TabPanel>
            <Info gameId={gameId} />
          </TabPanel>
          <TabPanel>
            <Results gameId={gameId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BaseModal>
  );
};

export default InfoModal;
