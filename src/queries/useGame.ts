import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';
import { useRouter } from 'next/router';
import moment from 'moment';

import {
  API_PATH,
  claimReward,
  createTeam,
  deleteTeam,
  getActualTeams,
  getAvgCapScoreAndBonus,
  getCountGameTeams,
  getGameConfig,
  getGameController,
  getGameNfts,
  getGameRankings,
  getGameRankingTeamsScore,
  getGames,
  getGameScoring,
  getGameTeams,
  getMyGameTeam,
  getMyReward,
  getMyTraineeCards,
  getRaceInfo,
  getRankingPosition,
  getRewardPool,
  getRewardStatus,
  getRiderRacesResult,
  getRiderResults,
  getTemplateRule,
  updateTeam,
} from '@/apis';
import {
  GameRequest,
  GetActualTeam,
  GetGameNftsRequest,
  GetGameRankingsRequest,
  GetGameScoringParams,
  GetMyTeam,
  GetRaceInfo,
  GetRankingPosition,
  GetRewardPoolParams,
} from '@/typings/game';
import { useToastMessage } from '@/hooks/useToastMessage';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { CardItem } from '@/typings/card';
import { MAP_ROLE_INFOS } from '@/constants/game';
import { NEXT_PUBLIC_RANKING_LEAGUE_IDS } from '@/config/appConfig';
import { RewardItem, RewardTypeEnum } from '@/features/TakeReward/Card';
import { getTemplatePath } from '@/utils/string';
import { GameStatus } from '@/typings/game.enum';

export const useGetGames = (params?: GameRequest) => {
  return useQuery([API_PATH.GET_GAMES, params], () => getGames(params));
};

export const useGetMyGameTeam = (params?: GetMyTeam, options = {}) =>
  useQuery(
    [API_PATH.GET_MY_GAME_TEAM, params],
    () => getMyGameTeam(params),
    options
  );

export const useGetGameNfts = ({
  typeOfCard,
  ...props
}: GetGameNftsRequest) => {
  const rarity: string[] = _.get(props, 'rarity', []);
  return useQuery(
    [API_PATH.GET_NFTS_TO_CREATE_GAME, { ...props, typeOfCard }],
    async () => {
      if (typeOfCard === 'my_team') {
        const res = await getGameNfts({
          ...props,
          rarity: _.filter(
            _.includes(rarity, 'white') ? [...rarity, 'na'] : rarity,
            (value) => value !== 'trainee'
          ),
        });

        const items = await getAvgCapScoreAndBonus({ items: res.items });

        return {
          ...res,
          items,
        };
      }

      const resTrainee = await getMyTraineeCards({ ...props });
      const resTraineeItems = await getAvgCapScoreAndBonus({
        items: resTrainee.items,
      });

      return {
        ...resTrainee,
        items: resTraineeItems,
      };
    },
    {
      enabled: !!(
        props.gameId &&
        props.limit &&
        (typeOfCard === 'my_team' ? !_.isEmpty(rarity) : true)
      ),
    }
  );
};

export const useCreateTeam = () => {
  const toast = useToastMessage();
  const { t } = useTranslation();
  return useMutation(createTeam, {
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('message:create_team_success'),
        status: 'success',
      });
      navigateTo(PATH.GAME);
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  const toast = useToastMessage();
  const { t } = useTranslation();
  return useMutation(deleteTeam, {
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('message:delete_team_success'),
        status: 'success',
      });
      queryClient.invalidateQueries(['GET_GAMES_TEAM']);
      queryClient.invalidateQueries([API_PATH.GET_MY_GAME_TEAM]);
      queryClient.invalidateQueries([API_PATH.GET_GAMES]);
    },
  });
};

export const useUpdateTeam = () => {
  const toast = useToastMessage();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(updateTeam, {
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('message:update_team_success'),
        status: 'success',
      });
      queryClient.invalidateQueries(['GET_GAMES_TEAM']);
      queryClient.invalidateQueries([API_PATH.GET_NFTS_TO_CREATE_GAME]);
    },
  });
};

type UseGetRuleProps = {
  template: 'RACES' | 'TOURS';
};

// TODO delete when new version is ok
export const useGetRules = ({ template }: UseGetRuleProps) => {
  const TOURS = [
    {
      id: 'leader1',
      name: 'Leader (GC)',
      acronym: 'LD (GC)',
      role: 'leader',
      index: 0,
    },
    {
      id: 'climber',
      name: 'Climber',
      acronym: 'CL',
      role: 'climber',
      index: 1,
    },
    {
      id: 'sprinter',
      name: 'Sprinter',
      acronym: 'SP',
      role: 'sprinter',
      index: 2,
    },
    {
      id: 'domestic',
      name: 'Domestic',
      acronym: 'DM',
      role: 'domestic',
      index: 3,
    },
    {
      id: 'freeElectron',
      name: 'Free Electron',
      acronym: 'FE',
      role: 'freeElectron',
      index: 4,
    },
  ];
  const RACES = [
    {
      id: 'leader1',
      name: 'Leader (GC)',
      acronym: 'LD (GC)',
      role: 'leader',
      index: 0,
    },
    {
      id: 'leader2',
      name: 'Leader (GC)',
      acronym: 'LD (GC)',
      role: 'leader',
      index: 1,
    },
    {
      id: 'freeElectron',
      name: 'Free Electron',
      acronym: 'FE',
      role: 'freeElectron',
      index: 2,
    },
    {
      id: 'domestic1',
      name: 'Domestic',
      acronym: 'DM',
      role: 'domestic',
      index: 3,
    },
    {
      id: 'domestic2',
      name: 'Domestic',
      acronym: 'DM',
      role: 'domestic',
      index: 4,
    },
  ];
  return {
    data: template === 'TOURS' ? TOURS : RACES,
  };
};

export const useGetGameController = (id: string) => {
  const router = useRouter();
  return useQuery(
    ['GET_GAME_CONTROLLER', id],
    async () => {
      const res = await getGameController(id);

      // For case notification game ended
      if (
        router.pathname === `${PATH.PATICIPATE}/[id]` &&
        moment(res.startDate).isBefore(moment())
      ) {
        navigateTo(getTemplatePath(PATH.GAME_RANKING_ID, { id }));
      }

      const { rule } = res;
      return {
        ...res,
        rule: {
          ...rule,
          roles: _.map(rule.roles, (item) =>
            _.assign(item, {
              ..._.get(MAP_ROLE_INFOS, item.role),
              id: `${item.role}-${item.index}`,
            })
          ),
          leagues: _.map(rule.leagues, (item) => ({
            ...item,
            id: item.division.id,
            label: item.division.name,
            value: item.division.id,
            name: item.division.name,
            options: _.get(item.division, 'rarityRules'),
            rarityBonuses: _.get(item.division, 'rarityBonuses'),
          })),
        },
      };
    },
    {
      enabled: !!id,
    }
  );
};

export const useGetGameConfig = () => {
  return useQuery([API_PATH.GET_GAME_CONFIG], async () => {
    const data = await getGameConfig();
    const divisions = _.map(_.get(data, 'divisions', []), (item) => ({
      id: _.get(item, 'id'),
      label: `League ${_.get(item, `name`)}`,
      value: _.get(item, 'id'),
      name: _.get(item, `name`),
    }));
    return {
      divisions: _.filter(divisions, (item) =>
        NEXT_PUBLIC_RANKING_LEAGUE_IDS.includes(item.id)
      ),
    };
  });
};

export const coverFreeElectron = (data: CardItem[]) => {
  return _.map(data, (item) => ({
    ...item,
    role: item.role === 'freeElectron' ? 'free_electron' : item.role,
  }));
};

export const useGetGameTeams = (gameId: string) => {
  return useQuery(
    ['GET_GAMES_TEAM', gameId],
    async () => {
      const res = await getGameTeams(gameId);

      const teams: any = [];
      for (const item of res) {
        const ids = [
          ..._.get(item, 'naCardIds', []),
          ..._.get(item, 'nftIds', []),
        ];

        const gameTeamId = _.get(item, 'id');
        const nfts = await getAvgCapScoreAndBonus({
          items: [
            ..._.get(item, 'nfts', []),
            ..._.get(item, 'naCards', []),
            ..._.get(item, 'freeCards', []),
          ],
          gameTeamId,
        });
        teams.push({
          ...item,
          cards: _.map(nfts, (nft, index) => ({
            ...nft,
            index: _.get(
              _.find(ids, (elm) => _.get(elm, 'id', '') === nft.id),
              'index',
              index
            ),
          })),
        });
      }
      return {
        teams,
        teamDivisionIds: _.map(res, (item: any) => item.divisionId),
      };
    },
    {
      enabled: !!gameId,
    }
  );
};

export const useCheckTeamsAlready = () => {
  return useMutation(getGameTeams);
};

// TODO delete when new version is ok
export const useGetDivisions = () => {
  return useQuery(['GET_DIVISIONS'], async () => {
    const res = await getGameConfig();
    return _.map(_.get(res, 'divisions', []), (item) => ({
      ...item,
      value: item.id,
      label: `League ${item.name}`,
    }));
  });
};

export const useGetCountGameTeams = () => {
  return useMutation(getCountGameTeams);
};

export const getCardsMyTeam = (
  rules: Partial<CardItem>[],
  nfts: Partial<CardItem>[]
) => {
  return _.map(rules, (rule) => {
    const findItem = _.find(nfts, (nft) => nft.index === rule.index);
    return findItem || rule;
  });
};

export const addIndexForNftsByRole = (
  rules: Partial<CardItem>[],
  nfts: Partial<CardItem>[]
) => {
  const ids: string[] = [];
  const result = _.map(rules, (rule, index) => {
    const findItem = _.find(nfts, (nft) => {
      return nft.role === rule.role && !ids.includes(nft.id as string);
    });
    if (findItem) {
      ids.push(findItem.id as string);
    }
    return findItem ? { ...findItem, index } : rule;
  });
  return sortListNftByRole(result as CardItem[]);
};

export const checkRuleDisivion = (rules: any, nfts: Partial<CardItem>[]) => {
  const countByRarity = _.defaults(_.countBy(nfts, 'rarity'), {
    blue: 0,
    yellow: 0,
    pink: 0,
    white: 0,
    na: 0,
    trainee: 0,
  });

  const totalRarity = {
    blue: countByRarity.blue,
    yellow: countByRarity.yellow,
    pink: countByRarity.pink,
    white: countByRarity.white,
    na: countByRarity.na,
    trainee: countByRarity.trainee,
  };

  const isValidRarity = _.every(totalRarity, (value, key) => {
    return (
      value >= _.get(rules, `${key}.[0]`) && value <= _.get(rules, `${key}.[1]`)
    );
  });

  return isValidRarity;
};

export const sortListNftByRarity = (nfts: CardItem[]) => {
  const rarities = ['blue', 'pink', 'yellow', 'white', 'na'];
  const result = _.sortBy(nfts, (o) => rarities.indexOf(o.rarity as string));
  return _.uniqBy(result, 'id');
};

export const sortListNftByRole = (nfts: CardItem[]) => {
  const rarities = [
    'leader',
    'climber',
    'sprinter',
    'freeElectron',
    'free_electron',
    'domestic',
    'cap',
  ];
  const result = _.sortBy(nfts, (o) => rarities.indexOf(o.role as string));
  return _.uniqBy(result, 'id');
};

export const useGetActualTeams = (params: GetActualTeam) => {
  return useQuery(
    [API_PATH.GET_ACTUAL_TEAMS, { ...params }],
    async () => {
      const res = await getActualTeams(params);
      return res.map((item) => ({
        id: item.id,
        label: item.name,
        value: item.name,
      }));
    },
    { enabled: !!params.gameId }
  );
};

export const useGetGameRankings = ({
  gameId,
  divisionId,
  ...params
}: GetGameRankingsRequest) => {
  return useQuery(
    ['GET_GAME_RANKINGS', { gameId, divisionId, ...params }],
    () => getGameRankings({ gameId, divisionId, ...params }),
    { enabled: !!(gameId && divisionId) }
  );
};

export const useGetGameRankingTeamsScore = (gameTeamId: string) => {
  return useQuery(
    [API_PATH.GET_RANKING_TEAM_SCORE, gameTeamId],
    async () => {
      const res = await getGameRankingTeamsScore(gameTeamId);
      const nfts = await getAvgCapScoreAndBonus({ items: res.nfts });

      return {
        ...res,
        nfts,
      };
    },
    { enabled: !!gameTeamId }
  );
};

export const useGetMyReward = (gameId: string) => {
  return useQuery(
    [API_PATH.GET_MY_REWARD, gameId],
    async () => {
      const res = await getMyReward(gameId);

      let result = [] as any;

      _.forEach(res, (reward) => {
        const listNft = [
          ..._.map(_.get(reward, 'nfts', []), (item) => ({
            type: RewardTypeEnum.NFT,
            value: _.get(item, 'imageUrl'),
            rarity: _.get(item, 'rarity'),
          })),
          ..._.map(
            _.filter(_.get(reward, 'usdcRewards', []), (elm) => elm.value > 0),
            (item) => ({
              type: RewardTypeEnum.USDC,
              value: _.get(item, 'value'),
            })
          ),
        ];
        if (reward.xpReward) {
          listNft.push({ type: RewardTypeEnum.XP, value: reward.xpReward });
        }
        if (reward.jackpotReward) {
          listNft.push({
            type: RewardTypeEnum.USDC,
            value: reward.jackpotReward,
          });
        }
        result = [...result, ...listNft];
      });

      return _.shuffle(result) as RewardItem[];
    },
    {
      enabled: !!gameId,
      refetchOnWindowFocus: false,
    }
  );
};

export const useClaimReward = () => {
  const { t } = useTranslation();
  const toast = useToastMessage();
  return useMutation(claimReward, {
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('message:claim_success'),
        status: 'success',
      });
      navigateTo(PATH.GAME);
    },
  });
};

export const useCheckRewardStatus = () => {
  return useMutation(getRewardStatus);
};

export const useGetRewardStatus = (gameId: string) => {
  return useQuery([API_PATH.GET_REWARD_STATUS], () => getRewardStatus(gameId));
};

export const useGetRankingPosition = (params: GetRankingPosition) => {
  return useQuery(
    [API_PATH.GET_RANKING_POSITION, { ...params }],
    () => getRankingPosition(params),
    {
      enabled: !!(params.divisionId && params.gameId),
    }
  );
};

export const useGetRiderRacesResult = (riderId: string) => {
  return useQuery(
    [API_PATH.GET_RIDER_SCORES, riderId],
    () => getRiderRacesResult(riderId),
    { enabled: !!riderId }
  );
};

export const useGetTemplateRule = (gameId: string) => {
  return useQuery(
    [API_PATH.GET_TEMPLATE_RULE, gameId],
    async () => {
      const res = await getTemplateRule(gameId);
      const roles = _.orderBy(_.get(res, 'rule.roles', []), 'index');
      const rule = _.get(res, 'rule', {});
      const leagues = _.get(rule, 'leagues', {});

      return {
        ...res,
        rule: {
          ...rule,
          leagues: _.map(leagues, (league: any) => {
            const rarityRules = _.get(league, 'division.rarityRules', {});

            const minWhite = _.get(rarityRules, 'white[0]', 0);
            const minNa = _.get(rarityRules, 'na[0]', 0);

            const result = {
              blue: _.get(rarityRules, 'blue'),
              pink: _.get(rarityRules, 'pink'),
              yellow: _.get(rarityRules, 'yellow'),
              white: _.get(rarityRules, minNa > minWhite ? 'na' : 'white'),
              trainee: _.get(rarityRules, 'trainee'),
            };

            return {
              ...league,
              division: {
                ..._.get(league, 'division', {}),
                rarityBonuses: {
                  blue: _.get(league, 'division.rarityBonuses.blue'),
                  pink: _.get(league, 'division.rarityBonuses.pink'),
                  yellow: _.get(league, 'division.rarityBonuses.yellow'),
                  white:
                    _.get(league, 'division.rarityBonuses.white', 0) +
                    _.get(league, 'division.rarityBonuses.na', 0),
                  trainee: _.get(league, 'division.rarityBonuses.trainee'),
                },
                rarityRules: result,
                isApplyTrainee: !!_.get(rarityRules, 'trainee[1]', 0),
              },
            };
          }),
          roles,
        },
      };
    },
    { enabled: !!gameId }
  );
};

export const useGetRiderResults = (gameId: string, isAcquired: boolean) => {
  return useQuery(
    [API_PATH.GET_RIDER_RESULTS, gameId, isAcquired],
    () => getRiderResults({ gameId, isAcquired }),
    { enabled: !!gameId }
  );
};

export const useGetRewardPool = (params: GetRewardPoolParams) => {
  return useQuery(
    [API_PATH.GET_REWARD_POOL, { ...params }],
    () => getRewardPool(params),
    {
      enabled: !!params.gameId,
      retry: false,
    }
  );
};

export const useGetGameScoring = (params: GetGameScoringParams) => {
  return useQuery(
    [API_PATH.GET_GAME_SCORING, { ...params }],
    async () => {
      const res = await getGameScoring(params);
      return res;
    },
    {
      enabled:
        !!(params.id && params.raceId && params.rankingTemplateId) &&
        !params.isDisabled,
      retry: false,
    }
  );
};

export const useGetRaceInfo = (params: GetRaceInfo) => {
  return useQuery([API_PATH.GET_RACE_INFO, { ...params }], () =>
    getRaceInfo(params)
  );
};

export const useRedirectGameComming = () => {
  return useMutation(
    () =>
      getGames({
        page: 1,
        limit: 1,
        gameMode: 'cap',
        status: GameStatus.COMMING,
      }),
    {
      onSuccess: (res) => {
        const gameId = _.get(res, 'items[0].id');
        if (gameId) {
          return navigateTo(getTemplatePath(PATH.MAKE_MY_TEAM, { gameId }));
        }
        navigateTo(PATH.MY_TEAM);
      },
    }
  );
};
