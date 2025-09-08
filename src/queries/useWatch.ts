import { useQuery } from 'react-query';

import { API_PATH, getTeamRankings, getTeamScores } from '@/apis';

export const useGetTeamRankings = () => {
  return useQuery([API_PATH.GET_TEAM_RANKING], getTeamRankings);
};

export const useGetTeamScores = () => {
  return useQuery([API_PATH.GET_TEAM_SCORE], getTeamScores);
};
