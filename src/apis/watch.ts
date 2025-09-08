import { WATCH_RANKINGS } from '@/features/Ranking/mock';
import {
  ListTeamRankingResponse,
  ListTeamScoreResponse,
} from '@/typings/response';

export const getTeamRankings = async (): Promise<ListTeamRankingResponse> => {
  // TODO: MOCK DATA, This will delete when Implement API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: WATCH_RANKINGS,
        total: 100,
      });
    }, 0);
  });
};

export const getTeamScores = async (): Promise<ListTeamScoreResponse> => {
  // TODO: MOCK DATA, This will delete when Implement API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: WATCH_RANKINGS,
        total: 100,
      });
    }, 2000);
  });
};
