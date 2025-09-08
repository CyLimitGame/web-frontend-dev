import React, { useState } from 'react';
import { Box, Center, Flex, ModalProps, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import Leagues from '../Leagues';
import ScoreProgressBar from '../ScoreProgressBar';

import AvgScore from './AvgScore';

import { BaseModal } from '@/components/Modal';
import { SingleCheckboxInput, TextInput } from '@/components/Inputs';
import {
  AvgCapScoreAndBonus,
  CardImageLoader,
  DataGrid,
  LoaderContainer,
  NoResultFound,
  Pagination,
  Text,
  TextOneLine,
} from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { useGetUserProfile } from '@/queries/useUser';
import { useGetActualTeams, useGetGameNfts } from '@/queries/useGame';
import { NO_CARD } from '@/constants/images';
import { CustomSelect } from '@/components/Inputs/SelectInput';
import { FILTER_LIMIT } from '@/constants/filter';

type Props = Omit<ModalProps, 'children'> & {
  gameId: string;
  divisionId: string;
  onConfirm: (card: any) => void;
  cardSelectedIds: string[];
  riderIds: string[];
  disabledChoose: boolean;
  totalCapScore: number;
  totalScoreRequire: number;
  gameMode: string;
  traineeBonus: number;
  includedTeamId?: string;
};

const AddStagiaire = ({
  gameId,
  onConfirm,
  cardSelectedIds,
  riderIds,
  disabledChoose,
  divisionId,
  totalCapScore,
  totalScoreRequire,
  gameMode,
  traineeBonus,
  includedTeamId,
  ...props
}: Props) => {
  const { t } = useTranslation();
  const [card, setCard] = useState<any>({});
  const [page, setPage] = useState(1);

  const averageCapScore = Number(
    _.get(card, 'capScore.averageCapScore', 0)
  ).toFixed(0);

  const { control, register, watch } = useForm<any>({
    defaultValues: {
      isUsedStartList: true,
      avgCapScores: [0, 100],
      name: '',
      actualTeam: '',
    },
  });

  const name = watch('name');
  const isUsedStartList = watch('isUsedStartList');
  const avgCapScores = watch('avgCapScores');
  const actualTeam = watch('actualTeam');

  const { data: user } = useGetUserProfile();

  const { data: gameNft, isLoading } = useGetGameNfts({
    page: isUsedStartList ? 1 : page,
    limit: isUsedStartList ? Number.MAX_SAFE_INTEGER : FILTER_LIMIT,
    gameId,
    userId: user?.id,
    includedTeamId: includedTeamId || undefined,
    isUsedStartList,
    name,
    typeOfCard: 'trainee',
    fromAverageCapScore: _.get(avgCapScores, '[0]', 0),
    toAverageCapScore: _.get(avgCapScores, '[1]', 0),
    actualTeam,
  });

  const { data: actualTeams } = useGetActualTeams({
    rarity: 'trainee',
    isUsedStartList: isUsedStartList || undefined,
    gameId,
  });

  const itemsGroupByName = _.groupBy(gameNft?.items, 'rider.actualTeam.name');

  const handleChangeSearch = _.debounce((e) => {
    register('name').onChange(e);
    setPage(1);
  }, 1000);

  const handleConfirm = () => {
    onConfirm(card);
    setCard({});
  };

  return (
    <BaseModal {...props} size="6xl" title="add_a_stagiaire_30" closeable>
      <>
        <Flex gap={5}>
          <Box flex={1}>
            <Flex justifyContent="space-between" alignItems="center">
              <Leagues
                gameId={gameId}
                divisionId={divisionId}
                onChange={() => undefined}
                gap={5}
              />
            </Flex>
            <Box mt={5}>
              <ScoreProgressBar
                totalCapScore={totalCapScore + Number(averageCapScore)}
                totalScoreRequire={totalScoreRequire}
                gameMode={gameMode}
              />
            </Box>
          </Box>
        </Flex>
        <Box mt={2} bg="input" borderRadius="xl">
          <Flex
            w="100%"
            justifyContent="space-between"
            p={[2, 2, 4]}
            direction={['column', 'column', 'row']}
            gap={4}
          >
            <Flex gap={4} direction={['column', 'column', 'row']}>
              <SingleCheckboxInput
                label=""
                textContent="riders_on_startlist"
                tooltipText="we_update_the_startlist_every_hour"
                w={['100%', '100%', '200px']}
                {...register('isUsedStartList')}
                onChange={(e) => {
                  register('isUsedStartList').onChange(e);
                  setPage(1);
                }}
              />
              <TextInput
                size="md"
                w={['100%', '100%', '200px']}
                placeholder="search"
                {...register('name')}
                onChange={handleChangeSearch}
              />
              <CustomSelect
                emptyLabel="select_a_team"
                formControlProps={{ w: ['100%', '100%', '200px'] }}
                value={actualTeam || []}
                isMulti
                isClear
                options={actualTeams || []}
                {...register('actualTeam')}
                onChange={(e) => {
                  register('actualTeam').onChange(e);
                  setPage(1);
                }}
              />
            </Flex>
            <Box w={['100%', '100%', '200px']}>
              <Text
                textAlign="right"
                mb={2}
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="xs"
                translateText="last_15_average_score"
              />
              <AvgScore control={control} />
            </Box>
          </Flex>

          <Box maxH="500px" overflow="auto" py={2}>
            {isUsedStartList && (
              <LoaderContainer
                isLoading={isLoading}
                dataFound={itemsGroupByName}
                notFoundComponent={<NoResultFound type="common" />}
              >
                <Stack spacing={2}>
                  {_.map(itemsGroupByName, (value, key) => (
                    <Flex
                      alignItems="center"
                      key={key}
                      borderTop="1px solid"
                      borderColor="border"
                      py={2}
                      px={[2, 2, 2, 5]}
                      direction={['column', 'column', 'column', 'row']}
                    >
                      <Box w="240px" mb={2}>
                        <Text fontWeight="bold" textAlign="center">
                          {key}
                        </Text>
                      </Box>
                      <Box flex={1}>
                        <DataGrid
                          data={value}
                          columns={[3, 6, 4]}
                          gap={[1, 2]}
                          renderItem={(item) => {
                            const isDisabled =
                              disabledChoose ||
                              _.includes(cardSelectedIds, item?.id) ||
                              _.includes(riderIds, item?.rider?.id);
                            return (
                              <Box
                                key={item.id}
                                border="1px solid"
                                borderRadius="md"
                                borderColor={
                                  item.id === card.id ? 'white' : 'transparent'
                                }
                                transition="border-color .2s"
                                cursor={isDisabled ? 'not-allowed' : 'pointer'}
                                onClick={() =>
                                  isDisabled ? null : setCard(item)
                                }
                                opacity={isDisabled ? '0.5' : '1'}
                                p={1}
                              >
                                <CardImageLoader
                                  src={item.imageUrl || NO_CARD}
                                />
                                <Box mt={2}>
                                  <AvgCapScoreAndBonus
                                    item={{
                                      ...item,
                                      bonus: { bonus: traineeBonus },
                                    }}
                                  />
                                  <TextOneLine
                                    value={_.get(item, 'rider.actualTeam.name')}
                                    fontSize="xs"
                                    fontWeight="bold"
                                    textAlign="center"
                                    mt={1}
                                  />
                                </Box>
                              </Box>
                            );
                          }}
                        />
                      </Box>
                    </Flex>
                  ))}
                </Stack>
              </LoaderContainer>
            )}

            {!isUsedStartList && (
              <Box px={[1, 2, 4]}>
                <DataGrid
                  columns={[3, 4, 6]}
                  gap={[1, 2, 3]}
                  data={gameNft?.items}
                  isLoading={isLoading}
                  renderItem={(item) => {
                    const isDisabled =
                      disabledChoose ||
                      _.includes(cardSelectedIds, item?.id) ||
                      _.includes(riderIds, item?.rider?.id);
                    return (
                      <Box
                        key={item.id}
                        border="1px solid"
                        borderRadius="md"
                        borderColor={
                          item.id === card.id ? 'white' : 'transparent'
                        }
                        transition="border-color .2s"
                        p={1}
                        cursor={isDisabled ? 'not-allowed' : 'pointer'}
                        onClick={() => (isDisabled ? null : setCard(item))}
                        opacity={isDisabled ? '0.5' : '1'}
                      >
                        <CardImageLoader src={item.imageUrl || NO_CARD} />
                        <Box mt={2}>
                          <AvgCapScoreAndBonus
                            item={{
                              ...item,
                              bonus: { bonus: traineeBonus },
                            }}
                          />
                          <TextOneLine
                            value={_.get(item, 'rider.actualTeam.name')}
                            fontSize="xs"
                            fontWeight="bold"
                            textAlign="center"
                            mt={1}
                          />
                        </Box>
                      </Box>
                    );
                  }}
                />
                <Pagination
                  page={page}
                  total={_.get(gameNft, 'total', 0)}
                  limit={FILTER_LIMIT}
                  onChangePage={setPage}
                />
              </Box>
            )}
          </Box>
        </Box>

        <Center gap={2} mt={5}>
          <BaseButton variant="outline" onClick={props.onClose}>
            {t('cancel')}
          </BaseButton>
          <BaseButton
            variant="light"
            isDisabled={disabledChoose || _.isEmpty(card)}
            onClick={handleConfirm}
          >
            {t('confirm')}
          </BaseButton>
        </Center>
      </>
    </BaseModal>
  );
};

export default AddStagiaire;
