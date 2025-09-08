import { Box, Center, Flex, Icon } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { MdCheckCircle } from 'react-icons/md';

import { LeagueIcon } from '@/features/core/Common';
import { CardImageLoader, Text } from '@/components/Common';
import { useGetGameTeams, useGetTemplateRule } from '@/queries/useGame';
import { getRarityImage } from '@/utils/string';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

type Props = {
  gameId: string;
  divisionId: string;
  onChange: (value: string) => void;
  gap: number | number[];
};

const Leagues = ({ gameId, divisionId, onChange, gap }: Props) => {
  const router = useRouter();
  const { data: gameRule } = useGetTemplateRule(gameId);
  const { data: team } = useGetGameTeams(gameId);

  const mode = _.get(router, 'query.mode', 'create');

  const leagues = _.get(gameRule, 'rule.leagues');
  const teamDivisionIds = _.get(team, 'teamDivisionIds', []);

  useEffect(() => {
    if (gameRule && team && mode !== 'edit') {
      const divisionIds = _.map(leagues, ({ divisionId }) => divisionId);
      const diffIds = _.difference(divisionIds, teamDivisionIds);
      onChange(_.last(diffIds));
    }
  }, [gameRule, team]);

  const handleChangeLeague = (leagueId: string) => {
    onChange(leagueId);
    if (!_.includes(teamDivisionIds, leagueId)) {
      navigateTo(`${PATH.PATICIPATE}/${gameId}?league=${leagueId}&mode=create`);
    }

    if (_.includes(teamDivisionIds, leagueId)) {
      navigateTo(`${PATH.PATICIPATE}/${gameId}?league=${leagueId}&mode=edit`);
    }
  };

  return (
    <Flex gap={gap} fontWeight="bold" textTransform="uppercase" flexWrap="wrap">
      {_.map(leagues, (item, index) => {
        const rarityRules = _.get(item, 'division.rarityRules');
        const isApplyTrainee = _.get(item, 'division.isApplyTrainee', false);
        const rarities = _.pickBy(
          rarityRules,
          (values, key) =>
            (values[0] !== 0 || values[1] !== 0) && key !== 'trainee'
        );

        return (
          <Flex
            gap={2}
            alignItems="center"
            key={index}
            border="1px solid"
            pos="relative"
            borderColor={
              item.divisionId === divisionId ? 'white' : 'transparent'
            }
            p={[1, 1, 2]}
            borderRadius="md"
            cursor="pointer"
            onClick={() => handleChangeLeague(item.divisionId)}
          >
            <Box
              pos="absolute"
              boxSize="20px"
              top="-4px"
              right="-4px"
              zIndex="docked"
              display={
                _.includes(teamDivisionIds, item.divisionId) ? 'block' : 'none'
              }
            >
              <Icon as={MdCheckCircle} color="success.500" fontSize="xl" />
            </Box>
            <LeagueIcon
              name={_.get(item, 'division.name')}
              isShowText={false}
            />
            <Text fontSize={['xs', 'xs', 'sm']}>
              {_.get(item, 'division.name')}
            </Text>
            <Flex gap={2}>
              {_.map(rarities, (value, key) => {
                const numberOfCard = _.get(
                  value,
                  isApplyTrainee ? '[0]' : '[1]',
                  0
                );

                return (
                  <Box
                    key={key}
                    w="24px"
                    pos="relative"
                    borderRadius="sm"
                    overflow="hidden"
                  >
                    <CardImageLoader src={getRarityImage(key)} />
                    <Center pos="absolute" w="100%" h="100%" top="0">
                      {numberOfCard > 0 && (
                        <>
                          <Text>{numberOfCard}</Text>
                          {isApplyTrainee && <Text ml="2px">+</Text>}
                        </>
                      )}
                    </Center>
                  </Box>
                );
              })}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Leagues;
