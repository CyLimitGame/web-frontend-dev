import _ from 'lodash';

import { API_PATH } from '.';

import request from '@/utils/request';
import {
  ActualTeam,
  CreateTeam,
  GameConfig,
  GameModel,
  GameRankingScoring,
  GameRankingTeamsScore,
  GameRequest,
  GetActualTeam,
  GetGameNftsRequest,
  GetGameRankingsRequest,
  GetGameScoringParams,
  GetMyTeam,
  GetRaceInfo,
  GetRankingPosition,
  GetRewardPoolParams,
  MyTeam,
  Reward,
  RuleTemplate,
} from '@/typings/game';
import { ListResponse } from '@/typings/common';
import { FILTER_LIMIT } from '@/constants/filter';
import { CardItem } from '@/typings/card';
import { sanitizeCreateTeam, sanitizeUpdateTeam } from '@/utils/sanitize';
import { getTemplatePath } from '@/utils/string';

export const getGames = async (
  params?: GameRequest
): Promise<ListResponse<GameModel>> => {
  return request.get(API_PATH.GET_GAMES, {
    params: { limit: FILTER_LIMIT, ...params },
  });
};

export const getGameController = async (id: string): Promise<GameModel> => {
  return request.get(`${API_PATH.GET_GAME_CONTROLLER}/${id}`);
};

export const getGameNfts = ({
  gameId,
  ...params
}: GetGameNftsRequest): Promise<ListResponse<CardItem>> => {
  return request.get(`${API_PATH.GET_NFTS_TO_CREATE_GAME}/${gameId}/my-nfts`, {
    params: { ...params, status: status || undefined },
  });
};

export const getFreeCards = ({
  gameId,
  ...params
}: GetGameNftsRequest): Promise<ListResponse<CardItem>> => {
  return request.get(`${API_PATH.GET_FREE_CARDS}/${gameId}/my-free-cards`, {
    params: { ...params, status: status || undefined },
  });
};

export const getGameNaCards = ({
  gameId,
  ...params
}: GetGameNftsRequest): Promise<ListResponse<CardItem>> => {
  return request.get(`${API_PATH.GET_GAME_NA_CARDS}/${gameId}/my-na-cards`, {
    params: { ...params, status: status || undefined },
  });
};

export const createTeam = (data: CreateTeam) => {
  return request.post(
    `${API_PATH.CREATE_TEAM}/${data.id}/teams`,
    sanitizeCreateTeam(data)
  );
};

export const deleteTeam = (teamId: string) => {
  return request.delete(getTemplatePath(API_PATH.DELETE_TEAM, { teamId }));
};

export const updateTeam = (data: CreateTeam) => {
  return request.put(
    `${API_PATH.CREATE_TEAM}/${data.id}/teams/${data.teamId}`,
    sanitizeUpdateTeam(data)
  );
};

export const getGameConfig = (): Promise<GameConfig> => {
  return request.get(API_PATH.GET_GAME_CONFIG);
};

export const getGameTeams = (id: string): Promise<CardItem[]> => {
  return request.get(`${API_PATH.GET_GAME_TEAMS}/${id}/teams`);
};

// TODO change any
export const getCountGameTeams = (id: string): Promise<any> => {
  return request.get(`${API_PATH.GET_COUNT_TEAMS}/${id}/teams/count`);
};

export const getActualTeams = (
  params: GetActualTeam
): Promise<ActualTeam[]> => {
  const requestParams = { ...params };
  if (_.includes(params.rarity, 'white')) {
    requestParams.rarity = [
      ...(_.get(requestParams, 'rarity', []) as string[]),
      'na',
    ];
  }

  return request.get(API_PATH.GET_ACTUAL_TEAMS, {
    params: { ...requestParams, page: 1, limit: 3000 },
  });
};

export const getGameRankings = ({
  gameId,
  divisionId,
  ...params
}: GetGameRankingsRequest): Promise<ListResponse<GameRankingTeamsScore>> => {
  return request.get(
    `${API_PATH.GET_GAME_RANKINGS}/${gameId}/rankings/${divisionId}`,
    { params }
  );
};

export const getGameRankingTeamsScore = (
  teamId: string
): Promise<GameRankingTeamsScore> => {
  return request.get(`${API_PATH.GET_RANKING_TEAM_SCORE}/${teamId}`);
};

export const getMyReward = (gameId: string): Promise<Reward[]> => {
  const URL = getTemplatePath(API_PATH.GET_MY_REWARD, { gameId });
  return request.get(URL);
};

export const claimReward = (gameId: string) => {
  const URL = getTemplatePath(API_PATH.CLAIM_REWARD, { gameId });
  return request.post(URL);
};

export const getRewardStatus = (
  gameId: string
): Promise<{ status: string }> => {
  const URL = getTemplatePath(API_PATH.GET_REWARD_STATUS, { gameId });
  return request.get(URL);
};

export const getRankingPosition = ({
  gameId,
  divisionId,
  isFriend,
}: GetRankingPosition) => {
  const URL = getTemplatePath(API_PATH.GET_RANKING_POSITION, {
    gameId,
    divisionId,
  });
  return request.get(URL, { params: { isFriend } });
};

export const getTemplateRule = (gameId: string): Promise<RuleTemplate> => {
  const URL = getTemplatePath(API_PATH.GET_TEMPLATE_RULE, { gameId });
  return request.get(URL);
};

export const getMyGameTeam = (
  params: GetMyTeam = {}
): Promise<ListResponse<MyTeam>> => {
  return request.get(API_PATH.GET_MY_GAME_TEAM, { params });
};

export const getRiderResults = ({
  gameId,
  isAcquired,
}: {
  gameId: string;
  isAcquired: boolean;
}) => {
  return request.get(getTemplatePath(API_PATH.GET_RIDER_RESULTS, { gameId }), {
    params: { page: 1, limit: Number.MAX_SAFE_INTEGER, isAcquired },
  });
};

export const getRewardPool = ({ gameId, rarity }: GetRewardPoolParams) => {
  return request.get(getTemplatePath(API_PATH.GET_REWARD_POOL, { gameId }), {
    params: { page: 1, limit: Number.MAX_SAFE_INTEGER, rarity },
  });
};

export const getGameScoring = ({
  id,
  raceId,
  rankingTemplateId,
  isGameComing,
}: GetGameScoringParams): Promise<GameRankingScoring> => {
  return request.get(
    getTemplatePath(API_PATH.GET_GAME_SCORING, { gameId: id }),
    { params: { raceId, rankingTemplateId, isGameComing } }
  );
};

export const getRaceInfo = ({ gameId, raceId }: GetRaceInfo) => {
  return request.get(getTemplatePath(API_PATH.GET_RACE_INFO, { gameId }), {
    params: { raceId },
  });
};
