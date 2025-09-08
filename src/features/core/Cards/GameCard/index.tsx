import React from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { BiTrophy } from 'react-icons/bi';
import { MdInfoOutline } from 'react-icons/md';
import moment from 'moment';

import ButtonType, { handleShowRanking } from './ButtonType';
import Time from './Time';
import Race from './Race';
import TotalTeam from './TotalTeam';

import { TextOneLine, Text } from '@/components/Common';
import { GameModel } from '@/typings/game';
import CardImageLoader from '@/components/Common/CardImageLoader';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { getTemplatePath } from '@/utils/string';

type Props = {
  item: GameModel;
};

const GameCard = ({ item }: Props) => {
  const { imageUrl, name, startDate, endDate, race, id } = item || {};

  const handleToggleInformation = () => {
    if (item.ruleUrl) {
      return window.open(item.ruleUrl, '_blank');
    }
    return navigateTo(getTemplatePath(PATH.GAME_DETAIL, { gameId: item.id }));
  };

  const hasStart = moment().isAfter(startDate);

  return (
    <Box
      p={3.5}
      bg="gray.100"
      borderRadius="xl"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.02)' }}
    >
      <Box pos="relative">
        <CardImageLoader src={imageUrl} aspectRatio="1.6" />
        <Race
          data={race}
          isMultiRaces={item.isMultiRaces}
          raceType={item.raceType}
        />
      </Box>
      <Flex justifyContent="space-between" alignItems="center" mt={3.5}>
        <Time
          startDate={startDate}
          endDate={endDate}
          isUsingLiveRanking={item.isUsingLiveRanking}
          isRewardConfirmed={item?.isRewardConfirmed}
        />
        <Flex alignItems="center">
          <Text fontSize="sm" color="primary.500">
            {item.teamIds.length}
          </Text>
          <TotalTeam id={id} />
        </Flex>
      </Flex>
      <TextOneLine
        fontWeight="bold"
        fontSize="lg"
        mt={3.5}
        value={name}
        maxW="280px"
      />
      <Flex mt={3.5} gap={2}>
        <Box w="calc(100% - 112px)">
          <ButtonType item={item} />
        </Box>
        <Flex gap={2} flexShrink={0}>
          <IconButton
            bg="white"
            color="primary.500"
            aria-label="trophy"
            icon={<BiTrophy />}
            size="lg"
            isDisabled={!hasStart}
            onClick={() => handleShowRanking(item)}
          />
          <IconButton
            bg="white"
            color="primary.500"
            aria-label="help"
            icon={<MdInfoOutline />}
            size="lg"
            onClick={handleToggleInformation}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default GameCard;
