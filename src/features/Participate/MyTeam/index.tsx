import { Box, Center, Flex, Icon, Stack } from '@chakra-ui/react';
import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { MdAdd } from 'react-icons/md';

import ScoreProgressBar from '../ScoreProgressBar';
import PcsExternal from '../PcsExternal';

import ViewScoring from './ViewScoring';

import {
  AvgCapScoreAndBonus,
  CardImageLoader,
  DataGrid,
  Text,
} from '@/components/Common';
import { useGetTemplateRule } from '@/queries/useGame';
import { BaseButton } from '@/components/Button';
import { NO_CARD } from '@/constants/images';

type Props = {
  gameId: string;
  indexSelected: number;
  onSelect: (index: number) => void;
  onRemove: (index: number) => void;
  nfts: any[];
  onConfirm: () => void;
  isLoading: boolean;
  captainId: string;
  onSelectCaptain: (nftId: string) => void;
  isDisabledConfirmButton: boolean;
  divisionId: string;
  teamdivisionIds: string[];
};

const MyTeam = ({
  gameId,
  indexSelected,
  onSelect,
  nfts,
  onRemove,
  onConfirm,
  isLoading,
  captainId,
  onSelectCaptain,
  isDisabledConfirmButton,
  divisionId,
  teamdivisionIds,
}: Props) => {
  const { t } = useTranslation();
  const { data } = useGetTemplateRule(gameId);

  const leagues = _.get(data, 'rule.leagues', []);
  const findLeague = _.find(
    leagues,
    (league) => _.get(league, 'divisionId') === divisionId
  );

  const rarityBonuses = _.get(findLeague, 'division.rarityBonuses', {});

  const imageUrl = _.get(data, 'imageUrl', '');
  const creditLeague = _.find(
    _.get(data, 'creditLeagues', []),
    (item: any) => item.divisionId === divisionId
  );
  const gameMode = _.get(data, 'gameMode', '') as string;

  const roles = _.map(_.get(data, 'rule.roles', []), (item: any) => {
    const findNft = _.find(nfts, (nft) => nft.index === item.index);
    return findNft ? { ...findNft, ...item } : item;
  });

  const totalCapScore = _.sumBy(nfts, 'capScore.averageCapScore');
  const totalScoreRequire = _.get(creditLeague, 'credit');

  const handleSelectCaptain = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    event.preventDefault();
    onSelectCaptain(id);
  };

  const handleRemove = (item: any) => {
    onRemove(item.index);
    onSelect(item.index);
    if (captainId === item.id) {
      onSelectCaptain('');
    }
  };

  const confirmText = _.includes(teamdivisionIds, divisionId)
    ? 'edit_team'
    : 'create_team';

  return (
    <Flex gap={4}>
      <Box display={['none', 'none', 'none', 'block']}>
        <Text
          translateText="my_team_for"
          textTransform="uppercase"
          fontSize="2xl"
          fontWeight="bold"
        />
        <Box
          border="1px solid"
          borderColor="border"
          borderRadius="xl"
          overflow="hidden"
          mt={4}
        >
          <Box bg="input" p={4}>
            <Stack mt={2} spacing={2}>
              <CardImageLoader src={imageUrl} aspectRatio="2" />
            </Stack>
          </Box>
          <Box maxW="200px" mx="auto" mt={2}>
            <PcsExternal
              startListExternalUrl={_.get(data, 'startListExternalUrl', '')}
            />
          </Box>
          <Stack spacing={2} p={4}>
            <ViewScoring gameId={gameId} />
            <BaseButton
              variant="light"
              onClick={onConfirm}
              isLoading={isLoading}
              isDisabled={isDisabledConfirmButton}
            >
              {t(confirmText)}
            </BaseButton>
          </Stack>
        </Box>
      </Box>
      <Box flex={1}>
        <Flex
          gap={4}
          mb={5}
          alignItems="center"
          justifyContent="center"
          display={['flex', 'flex', 'flex', 'none']}
        >
          <Text translateText="my_team_for" fontWeight="bold" />
          <CardImageLoader src={imageUrl} aspectRatio="2" w="200px" />
        </Flex>
        <Box mb={5} opacity={gameMode === 'cap' ? '1' : '0'}>
          <ScoreProgressBar
            totalCapScore={totalCapScore}
            totalScoreRequire={totalScoreRequire}
            gameMode={gameMode}
          />
        </Box>
        <Box>
          <DataGrid
            columns={[3, 4, 4, _.size(roles)]}
            gap={4}
            data={roles}
            renderItem={(item, index) =>
              item.id ? (
                <Box key={item.id} pos="relative">
                  <Center
                    pos="absolute"
                    top="-6px"
                    right="-6px"
                    zIndex="docked"
                    border="2px solid"
                    w="30px"
                    h="30px"
                    fontWeight="bold"
                    borderRadius="2xl"
                    onClick={(e) => handleSelectCaptain(e, item.id)}
                    borderColor={item.id === captainId ? 'blue.500' : 'white'}
                    color={item.id === captainId ? 'blue.500' : 'white'}
                    cursor="pointer"
                    bg="background.default"
                  >
                    C
                  </Center>
                  <CardImageLoader src={item.imageUrl || NO_CARD} />
                  <Box mt={2}>
                    <AvgCapScoreAndBonus
                      item={{
                        ...item,
                        bonus: {
                          bonus: getBonus({
                            bonus: 0,
                            ...item.bonus.details,
                            captainBonus: item.id === captainId ? 25 : 0,
                            rarityBonus: _.get(rarityBonuses, item.rarity, 0),
                          }),
                          details: {
                            ...item.bonus.details,
                            captainBonus:
                              item.id === captainId ? 25 : undefined,
                            rarityBonus: _.get(rarityBonuses, item.rarity, 0),
                          },
                        },
                      }}
                    />
                  </Box>
                  {gameMode === 'global' && (
                    <Text
                      textAlign="center"
                      mt={2}
                      translateText={item.role}
                      fontWeight="bold"
                      textTransform="uppercase"
                      fontSize="sm"
                    />
                  )}
                  <Center mt={2}>
                    <BaseButton onClick={() => handleRemove(item)} size="sm">
                      {t('remove')}
                    </BaseButton>
                  </Center>
                </Box>
              ) : (
                <Box
                  border="1px solid"
                  borderColor={
                    indexSelected === item.index ? 'white' : 'border'
                  }
                  borderRadius="xl"
                  h={['200px', '200px', '240px', '340px']}
                  cursor="pointer"
                  onClick={() => onSelect(item.index)}
                  transition="border-color .2s"
                  key={index}
                >
                  <Center h="100%" flexDirection="column">
                    <Icon as={MdAdd} fontSize="4xl" />
                    {gameMode === 'global' && (
                      <Text
                        translateText={item.role}
                        fontWeight="bold"
                        fontSize="sm"
                        textTransform="uppercase"
                      />
                    )}
                  </Center>
                </Box>
              )
            }
          />
          <Flex
            justifyContent="space-between"
            mt={5}
            display={['flex', 'flex', 'flex', 'none']}
            direction={['column', 'row']}
            gap={2}
          >
            <ViewScoring gameId={gameId} />
            <BaseButton
              variant="light"
              onClick={onConfirm}
              isLoading={isLoading}
              isDisabled={isDisabledConfirmButton}
              size="md"
            >
              {t(confirmText)}
            </BaseButton>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

const getBonus = (data: any) => {
  return _.sum(Object.values(data));
};

export default MyTeam;
