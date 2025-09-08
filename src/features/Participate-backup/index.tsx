// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { Flex, Box, useMediaQuery, Image } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import { MyTeamCard } from '../core/Cards';

import { ClaimCardsNotice } from '../core/Common';

import Team from './Team';

import {
  CyLimitScoringButton,
  TeamCompositionRuleButton,
} from '@/features/core/Button';
import ListCardsForCreateTeam from '@/features/core/ListCardsForCreateTeam';
import { Container, DataGrid, Text } from '@/components/Common';
import MainLayout from '@/layouts/MainLayout';
import colors from '@/theme/foundations/colors';
import { CardItem as CardItemProps } from '@/typings/card';
import { BaseButton } from '@/components/Button';
import {
  // checkRuleDisivion,
  getCardsMyTeam,
  useCreateTeam,
  useGetGameController,
  useGetGameTeams,
} from '@/queries/useGame';
import useParamsQuery from '@/hooks/useGetParams';
import SelectInput from '@/components/Inputs/SelectInput';
import { useToastMessage } from '@/hooks/useToastMessage';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import breakpoints from '@/theme/foundations/breakpoints';
import { GAME_MODES } from '@/constants/select';
import { formatPrice } from '@/utils/number';

const Participate = () => {
  const toast = useToastMessage();
  const { t } = useTranslation();
  const { getParam } = useParamsQuery();
  const gameId = getParam('id');

  const [isLessThanMedium] = useMediaQuery(`(max-width: ${breakpoints['md']})`);
  const [isLessThanLarge] = useMediaQuery(`(max-width: ${breakpoints['lg']})`);

  const [divisionId, setDivisionId] = useState('');

  const [listItemSelected, setListItemSelected] = useState<CardItemProps[]>([]);
  const [indexSelected, setIndexSelected] = useState(0);
  const [captainId, setCaptainId] = useState('');

  const { data: gameController } = useGetGameController(gameId);
  const { data: gameTeam } = useGetGameTeams(gameId);
  const divisions = _.get(gameController, 'rule.leagues', []);
  const divisionOptions = useMemo(
    () =>
      _.filter(
        divisions,
        (item) => !gameTeam?.teamDivisionIds.includes(item.id)
      ),
    [divisions, gameTeam]
  );

  const rules = _.get(gameController, 'rule.roles', []);
  const isOnedayrace = !!_.get(gameController, 'race.is_onedayrace');
  const gameMode = _.get(gameController, 'gameMode');

  const LIMIT = rules.length;
  const cardSelectedIds = _.map(listItemSelected, (item) => item.id);
  const disabledChoose = _.get(
    getCardsMyTeam(rules, listItemSelected),
    `[${indexSelected}]._id`
  );
  const riderIds: string[] = _.map(
    listItemSelected,
    (item) => item.rider?.id as string
  );

  const handleRemoveCard = (id: string) => {
    setListItemSelected((current) => {
      const cards = current.filter((card) => card.id !== id);
      if (id === captainId) {
        setCaptainId('');
      }
      return cards;
    });
  };

  const handleSelectCard = (item: CardItemProps) => {
    setListItemSelected([
      ...listItemSelected,
      {
        ...item,
        index: indexSelected,
        role: rules[indexSelected].role,
        _id: item.id,
      },
    ]);
  };

  const handleChangeDivision = (id: string) => {
    setDivisionId(id);
    const division = _.find(divisions, (item) => item.id === id);
    const name = _.get(division, 'name');
    const rarityBonuses = _.get(division, 'rarityBonuses', {});
    const isBonus = _.some(rarityBonuses, (value) => value !== 0);

    // TODO Hardcode for toast
    if (
      id &&
      ['Template League 4', 'League 4'].includes(
        _.get(gameController, 'rule.name', '')
      )
    ) {
      toast({
        description: t('we_are_only_opening_league_4'),
      });
    }

    if (division) {
      toast({
        status: 'success',
        description: (
          <Box>
            <Text color="secondary.500" fontWeight="bold" fontSize="sm">
              {t('bonus_in', { name })}
            </Text>
            {!isBonus && (
              <Text translateText="no_scarcity_bonus_on_this_league" />
            )}
            {Object.keys(rarityBonuses).map((key, index) => {
              const value = _.get(rarityBonuses, key);
              return value ? (
                <Text key={index}>
                  {t(key)}: {value}%
                </Text>
              ) : null;
            })}
          </Box>
        ),
      });
    }
  };

  const { mutate, isLoading: isLoadingCreateTeam } = useCreateTeam();

  // FOR CAP
  const myTeamCards = getCardsMyTeam(rules, listItemSelected);
  const totalAverageCapScore =
    _.sumBy(myTeamCards, 'capScore.averageCapScore') || 0;

  const creditLeagues = _.get(gameController, 'creditLeagues');
  const creditLeague = _.find(
    creditLeagues,
    (item) => _.get(item, 'divisionId') === divisionId
  );
  const totalCredit = _.get(creditLeague, 'credit', 0);

  const handleCreate = () => {
    if (!divisionId) {
      return toast({
        description: t('please_choose_division'),
        status: 'info',
      });
    }

    // const isValid = checkRuleDisivion(
    //   _.find(divisions, (item) => item.id === divisionId)?.options,
    //   listItemSelected
    // );

    // const isCheckCapMode =
    //   gameMode === 'cap' && totalAverageCapScore < totalCredit;

    // if (!isValid || isCheckCapMode) {
    //   // Ref https://cylimit.atlassian.net/browse/CYL-928
    //   return toast({
    //     description: t('wrong_team_composition_league4'),
    //     status: 'info',
    //   });
    // }

    mutate({ id: gameId, nfts: listItemSelected, captainId, divisionId });
  };

  const renderButton = () => {
    return (
      <Box position="relative" mt={[4, 4, 4, 10]}>
        <Box
          position="absolute"
          left={0}
          top={0}
          display={['none', 'none', 'none', 'block']}
        >
          <TeamCompositionRuleButton gameId={gameId} />
        </Box>
        <Flex
          alignItems="center"
          gap={2}
          maxWidth="380px"
          flexDirection={['row', 'row', 'row', 'column']}
          mx="auto"
        >
          <SelectInput
            label={t(!isLessThanMedium ? 'choose_a_captain' : 'road_captain')}
            lableProps={{ fontSize: ['xs', 'sm', 'sm', 'md'] }}
            name="isCaptain"
            choices={_.map(listItemSelected, (item) => ({
              id: item.id,
              label: item.name,
              value: item.id,
            }))}
            bg="primary.50 !important"
            color="black"
            formControlProps={{ width: '264px' }}
            style={{ color: 'black' }}
            isDisabled={isLoadingCreateTeam || cardSelectedIds.length < LIMIT}
            showEmptyOption
            value={captainId}
            onChange={(e) => setCaptainId(e.target.value)}
          />
          <BaseButton
            mt={[7, 7, 7, 2]}
            colorScheme="primary"
            width="264px"
            size="md"
            onClick={handleCreate}
            isLoading={isLoadingCreateTeam}
            isDisabled={
              isLoadingCreateTeam ||
              cardSelectedIds.length < LIMIT ||
              !captainId
            }
          >
            {t('done')}
          </BaseButton>
        </Flex>
      </Box>
    );
  };

  useEffect(() => {
    if (!_.isEmpty(divisionOptions)) {
      const preferenceOrder = ['League 4', 'League 3', 'League 2', 'League 1'];
      const sortedLeagues = _.sortBy(divisionOptions, (league) => {
        const preferenceIndex = preferenceOrder.indexOf(league.name);
        return preferenceIndex === -1 ? Infinity : preferenceIndex;
      });
      setDivisionId(_.get(sortedLeagues, '[0].id', ''));
    }
  }, [divisionOptions]);

  return (
    <MainLayout isShowFooter={false}>
      <Box borderBottom={`1px solid ${colors.gray[200]}`}>
        <Container
          maxWidth="1440px"
          pb={['200px', '200px', '200px', '20px']}
          py={5}
        >
          <ClaimCardsNotice />
          <Flex>
            <Box flex={1} minHeight={0} minWidth={0}>
              <Box>
                <Flex justifyContent="space-between" mt={4}>
                  <Box>
                    <Text
                      translateText="team_creation"
                      fontSize={['xl', '2xl', '4xl']}
                      color="gray.900"
                      fontWeight="bold"
                      mb={2}
                    />
                    <CyLimitScoringButton />
                  </Box>
                  <Image
                    src={gameController?.imageUrl || ''}
                    objectFit="contain"
                    borderRadius="md"
                    maxW="320px"
                    display={['none', 'none', 'none', 'block']}
                  />
                </Flex>
                <Text
                  translateText="choose_from_my_cards"
                  fontSize={['xl', 'xl', '2xl']}
                  color="gray.900"
                  fontWeight="bold"
                  mt={8}
                  display={['none', 'none', 'block']}
                />
                <Flex
                  mt={4}
                  w="100%"
                  justifyContent="space-between"
                  alignItems={['start', 'start', 'center']}
                  flexDirection={['column', 'column', 'row']}
                  gap={2}
                >
                  <Flex w="100%" gap={2}>
                    <SelectInput
                      label={t('championship')}
                      name="championship"
                      choices={GAME_MODES}
                      bg="primary.50 !important"
                      color="black"
                      formControlProps={{ width: ['100%', '100%', '260px'] }}
                      style={{ color: 'black' }}
                      isDisabled
                      value={gameMode}
                    />
                    <SelectInput
                      label={t(
                        isLessThanMedium ? 'division' : 'choose_your_division'
                      )}
                      name="division"
                      choices={divisionOptions}
                      bg="primary.50 !important"
                      formControlProps={{ width: ['100%', '100%', '260px'] }}
                      color="black"
                      style={{ color: 'black' }}
                      value={divisionId}
                      onChange={(e) => handleChangeDivision(e.target.value)}
                    />
                  </Flex>

                  <BaseButton
                    onClick={() => navigateTo(`${PATH.GAME_TEAMS}/${gameId}`)}
                    isDisabled={!gameTeam?.teams?.length}
                    flexShrink={0}
                    variant="purple-gradient"
                  >
                    {t('teams_created')}
                  </BaseButton>
                </Flex>
              </Box>
              <ListCardsForCreateTeam
                cardSelectedIds={cardSelectedIds}
                disabledChoose={!!disabledChoose}
                riderIds={riderIds}
                onSelectCard={handleSelectCard}
                divisionId={divisionId}
                divisions={divisionOptions as any}
                columns={_.size(myTeamCards)}
              />
              {!isLessThanLarge ? (
                <>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mt={5}
                    mb={4}
                  >
                    <Text
                      translateText="my_team"
                      fontWeight="bold"
                      fontSize="2xl"
                      color="gray.900"
                    />
                    {gameMode === 'cap' && (
                      <Text
                        color={
                          totalAverageCapScore >= totalCredit
                            ? 'success.500'
                            : 'error.500'
                        }
                        fontWeight="bold"
                        fontSize="sm"
                      >
                        {t('credits_value', {
                          value: `${formatPrice(
                            totalAverageCapScore
                          )}/${totalCredit}`,
                        })}
                      </Text>
                    )}
                  </Flex>
                  <DataGrid
                    data={myTeamCards}
                    columns={_.size(myTeamCards)}
                    gap={1}
                    renderItem={(item, index) => (
                      <MyTeamCard
                        key={item.id || index}
                        item={item}
                        selected={index === indexSelected}
                        onClick={() => setIndexSelected(index)}
                        onRemove={() => handleRemoveCard(item.id)}
                        captainId={captainId}
                        isOnedayrace={!!isOnedayrace}
                      />
                    )}
                  />
                  {renderButton()}
                </>
              ) : (
                <Team
                  data={myTeamCards as CardItemProps[]}
                  onRemove={handleRemoveCard}
                  indexSelected={indexSelected}
                  onClick={setIndexSelected}
                  footer={() => renderButton()}
                />
              )}
            </Box>
          </Flex>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Participate;
