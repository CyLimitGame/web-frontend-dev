import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import {
  Box,
  BoxProps,
  Center,
  Divider,
  Flex,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useTranslation } from 'next-i18next';

import Filter, { FilterData } from './Filter';

import {
  AvgCapScoreAndBonus,
  CardImageLoader,
  FilterWithDrawer,
  LoaderContainer,
  NoResultFound,
  Slider,
  Text,
  TextOneLine,
} from '@/components/Common';
import { CardItem } from '@/typings/card';
import { useGetGameNfts, useGetTemplateRule } from '@/queries/useGame';
import useParamsQuery from '@/hooks/useGetParams';
import { useGetUserProfile } from '@/queries/useUser';
import { BaseButton } from '@/components/Button';
import { getCardImage } from '@/utils/string';
import { RiderNotFound } from '@/components/NotFound';

type Props = {
  cardSelectedIds: string[];
  onSelectCard: (value: CardItem) => void;
  riderIds: string[];
  disabledChoose: boolean;
  includedTeamId?: string;
  onClickAddStagiaire?: () => void;
  isAddStagiaire?: boolean;
  activeRarity: string[];
  divisionId: string;
  leagueName: string;
};

const AddStagiaire = ({
  divisionId,
  ...props
}: { divisionId: string } & BoxProps) => {
  const { getParam } = useParamsQuery();
  const gameId = getParam('id');

  const { data } = useGetTemplateRule(gameId);
  const leagues = _.get(data, 'rule.leagues', []);
  const findLeague = _.find(leagues, (item) => item.divisionId === divisionId);
  const bonus = _.get(findLeague, 'division.rarityBonuses.trainee', 0);

  return (
    <Box
      p={2}
      cursor="pointer"
      _hover={{ filter: 'brightness(0.8)' }}
      {...props}
    >
      <Center flexDirection="column">
        <Box sx={{ aspectRatio: '0.65' }} bg="input" w="100%" borderRadius="xl">
          <Center flexDirection="column" h="100%">
            <Icon as={MdAdd} fontSize="4xl" />
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              textAlign="center"
              mt={4}
              translateText="add_stagiaires_to_complete_team"
            />
          </Center>
        </Box>
        <Box mt={2}>
          <AvgCapScoreAndBonus
            item={{
              capScore: { averageCapScore: '?' },
              bonus: { bonus: `${bonus}` },
            }}
          />
        </Box>
      </Center>
    </Box>
  );
};

const ListCardsForCreateTeam = ({
  includedTeamId,
  onSelectCard,
  cardSelectedIds,
  disabledChoose,
  riderIds,
  onClickAddStagiaire,
  activeRarity,
  divisionId,
  isAddStagiaire,
  leagueName,
}: Props) => {
  const { t } = useTranslation();
  const sliderRef = useRef(null);
  const [key, setKey] = useState(0);
  const { data: userProfile } = useGetUserProfile();
  const { getParam } = useParamsQuery();
  const [filterValues, setFilterValues] = useState<FilterData>({
    name: '',
    page: 1,
    isUsedStartList: true,
    actualTeam: [],
    rarity: [],
    typeOfCard: 'my_team',
  });

  const gameId = getParam('id');
  const userId = _.get(userProfile, 'id', '');
  const { data, isFetching } = useGetGameNfts({
    ...filterValues,
    limit: 10000,
    gameId,
    userId,
    includedTeamId: includedTeamId || undefined,
  });

  const gameNfts = data?.items || [];

  const handleFilter = (values: FilterData) => {
    setFilterValues((current) => ({ ...current, ...values, page: 1 }));
  };

  useEffect(() => {
    setKey((current) => current + 1);
  }, [divisionId]);

  const RIGHT_WIDTH = '170px';

  const slidesToShow = useBreakpointValue({
    base: 3,
    xs: 3,
    sm: 3,
    md: 4,
    lg: isAddStagiaire ? 7 : 8,
  });

  const slidesToScroll = useBreakpointValue({
    base: 3,
    xs: 3,
    sm: 3,
    md: 4,
    lg: isAddStagiaire ? 7 : 8,
  });

  const rows = useBreakpointValue({
    base: 3,
    xs: 3,
    sm: 3,
    md: 3,
    lg: 1,
  });

  const getSliderProps = () => {
    return {
      slidesToShow,
      slidesToScroll,
      slidesPerRow: 1,
      rows,
    };
  };

  return (
    <Box>
      {isAddStagiaire && (
        <Flex
          justifyContent="end"
          mb={2}
          display={['flex', 'flex', 'flex', 'none']}
        >
          <BaseButton onClick={onClickAddStagiaire} size="sm" variant="light">
            {t('add_a_stagiaire_30')}
          </BaseButton>
        </Flex>
      )}
      <Box bg="input" borderRadius="xl">
        <Box>
          <Flex flex={1}>
            <Box
              w={
                isAddStagiaire
                  ? ['100%', '100%', '100%', `calc(100% - ${RIGHT_WIDTH})`]
                  : '100%'
              }
            >
              <LoaderContainer
                isLoading={isFetching}
                notFoundComponent={
                  leagueName === 'League 4' && filterValues.isUsedStartList ? (
                    <RiderNotFound />
                  ) : (
                    <Center h="100%" p={4}>
                      <NoResultFound type="common" />
                    </Center>
                  )
                }
                dataFound={gameNfts}
              >
                <Slider
                  data={gameNfts}
                  {...getSliderProps()}
                  infinite={false}
                  key={key}
                  ref={sliderRef}
                  renderItem={(item: any) => {
                    const isDisabled =
                      disabledChoose ||
                      _.includes(cardSelectedIds, item?.id) ||
                      _.includes(riderIds, item?.rider?.id);
                    return (
                      <Box
                        key={item.id}
                        mx={[1, 1, 2]}
                        cursor={isDisabled ? 'not-allowed' : 'pointer'}
                        onClick={() => (isDisabled ? null : onSelectCard(item))}
                        opacity={isDisabled ? '0.5' : '1'}
                      >
                        <CardImageLoader src={getCardImage(item)} />
                        <Box mt={2}>
                          <AvgCapScoreAndBonus item={item} />
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
              </LoaderContainer>
            </Box>
            {isAddStagiaire && (
              <Box w={RIGHT_WIDTH} display={['none', 'none', 'none', 'block']}>
                <AddStagiaire
                  onClick={onClickAddStagiaire}
                  divisionId={divisionId}
                />
              </Box>
            )}
          </Flex>
        </Box>
        <Box display={['none', 'none', 'none', 'block']}>
          <Divider />
        </Box>
        <Box>
          <Box>
            <Flex justifyContent="end">
              <Box display={['none', 'none', 'none', 'block']} p={5}>
                <Filter
                  onFilter={handleFilter}
                  filterValues={filterValues}
                  gameId={gameId}
                  activeRarity={activeRarity}
                />
              </Box>
            </Flex>
            <Box display={['block', 'block', 'block', 'none']}>
              <FilterWithDrawer
                buttonProps={{
                  top: '72px',
                  size: 'sm',
                  left: 'none',
                  right: -10,
                }}
              >
                <Filter
                  onFilter={handleFilter}
                  filterValues={filterValues}
                  gameId={gameId}
                  activeRarity={activeRarity}
                />
              </FilterWithDrawer>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ListCardsForCreateTeam);
