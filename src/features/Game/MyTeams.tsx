import React, { useState } from 'react';
import _ from 'lodash';
import {
  Box,
  Center,
  Flex,
  Icon,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import { MdGroup } from 'react-icons/md';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { useTranslation } from 'next-i18next';
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri';
import { useRouter } from 'next/router';

import ViewScoreModal from './Rank/ViewScoreModal';

import { CardRole, LeagueIcon } from '@/features/core/Common';
import { useGetGameTeams, useGetTemplateRule } from '@/queries/useGame';
import {
  AvgCapScoreAndBonus,
  Captain,
  CardImageLoader,
  Circle,
  DataGrid,
  LoaderContainer,
  Text,
} from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { fixedNumber } from '@/utils/common';
import { getCardImage } from '@/utils/string';

type Props = {
  gameId: string;
};

const MyTeams = ({ gameId }: Props) => {
  const { t } = useTranslation();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [itemViewScore, setItemViewScore] = useState<any>({});

  const router = useRouter();
  const status = _.get(router, 'query.status', 'comming');

  const { data: gameRule } = useGetTemplateRule(gameId);
  const isUsingLiveRanking = _.get(gameRule, 'isUsingLiveRanking', false);

  const roleSize = _.size(_.get(gameRule, 'rule.roles', []));

  const imageUrl = _.get(gameRule, 'imageUrl', '');

  const { data, isLoading } = useGetGameTeams(gameId);
  const teams = _.get(data, 'teams', []);

  return (
    <Box>
      <Stack spacing={4}>
        <Flex justifyContent={['center', 'center', 'end']}>
          <Box>
            <Image src={imageUrl} width="200px" height="100px" />
          </Box>
        </Flex>
        <LoaderContainer isLoading={isLoading}>
          <Stack spacing={4}>
            {_.map(teams, (team) => {
              const cards = _.get(team, 'cards', []);
              const leagueName = _.get(team, 'division.name');
              const numberOfTeams = _.get(team, 'numberOfTeams');
              const ranking = _.get(team, 'ranking');
              const divisionId = _.get(team, 'divisionId');
              const results = _.get(team, 'results', []);
              const isTeamValid = roleSize === _.size(cards);

              return (
                <Box
                  key={team.id}
                  px={[2, 2, 4]}
                  py={[6, 6, 4]}
                  borderRadius="md"
                  pos="relative"
                  bg="input"
                >
                  <Box
                    pos="absolute"
                    top="-10px"
                    right="-10px"
                    bg="white"
                    borderRadius="4xl"
                    w="28px"
                    h="28px"
                  >
                    <Icon
                      as={
                        isTeamValid ? RiCheckboxCircleFill : RiCloseCircleFill
                      }
                      fontSize="3xl"
                      color={isTeamValid ? 'success.500' : 'error.500'}
                    />
                  </Box>
                  <Flex
                    justifyContent="space-between"
                    gap={4}
                    direction={['column', 'column', 'row']}
                  >
                    <Flex
                      gap={4}
                      justifyContent="space-between"
                      flex={1}
                      alignItems="center"
                    >
                      <Flex gap={2}>
                        <LeagueIcon name={leagueName} />
                        <Text fontWeight="bold">{leagueName}</Text>
                      </Flex>
                      <Box>
                        <Icon as={MdGroup} fontSize="2xl" />
                        <Text fontWeight="bold" textAlign="center">
                          {numberOfTeams}
                        </Text>
                      </Box>
                      {status !== 'comming' && (
                        <Box>
                          <Icon as={BiBarChartAlt2} fontSize="2xl" />
                          <Text fontWeight="bold" textAlign="center">
                            {ranking}
                          </Text>
                        </Box>
                      )}
                      {status === 'comming' && (
                        <BaseButton
                          size="sm"
                          variant="purple-gradient"
                          onClick={() =>
                            navigateTo(
                              `${PATH.PATICIPATE}/${gameId}?league=${divisionId}&mode=edit`
                            )
                          }
                        >
                          {t('edit')}
                        </BaseButton>
                      )}
                    </Flex>
                    <Box flex={1}>
                      <DataGrid
                        columns={[3, 3, 5]}
                        gap={2}
                        data={cards}
                        renderItem={(card) => {
                          const point = _.get(
                            _.find(results, (result) => result.id === card.id),
                            'point',
                            0
                          );
                          const isCaptain =
                            _.get(team, 'captainId', '') === card.id;
                          return (
                            <Box key={card.id}>
                              <CardRole
                                role={card.role}
                                roles={cards}
                                fontSize="xs"
                              />
                              <Flex
                                direction="column"
                                justifyContent="center"
                                pos="relative"
                              >
                                {isCaptain && <Captain />}
                                <Box mb={2}>
                                  <CardImageLoader src={getCardImage(card)} />
                                </Box>
                                <Center gap={1}>
                                  <Circle
                                    cursor="pointer"
                                    _hover={{ opacity: 0.5 }}
                                    onClick={() => {
                                      setItemViewScore({ ...team, card });
                                      onOpen();
                                    }}
                                  >
                                    {fixedNumber(point, 0)}
                                  </Circle>
                                  <AvgCapScoreAndBonus
                                    item={card}
                                    isShowAvg={false}
                                    fontSize="xs"
                                  />
                                </Center>
                              </Flex>
                            </Box>
                          );
                        }}
                      />
                    </Box>
                  </Flex>
                </Box>
              );
            })}
          </Stack>
        </LoaderContainer>
      </Stack>
      <ViewScoreModal
        isOpen={isOpen}
        onClose={onClose}
        item={itemViewScore}
        defaultIsAcquired={false}
        isUsingLiveRanking={isUsingLiveRanking}
        isGameInprogress={status === 'in_progress'}
      />
    </Box>
  );
};

export default MyTeams;
