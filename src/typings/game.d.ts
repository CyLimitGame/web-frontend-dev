import { CardItem } from './card';
import { Pagination } from './common';
import {
  GameRewardStatusEnum,
  GameStatus,
  MultiRaceTypeEnum,
  Role,
  GameMode,
  MatrixRole,
} from './game.enum';
import { User } from './user';

export type Race = {
  id: string;
  stage_type: number;
};

export type GameModel = {
  createdAt: string;
  endDate: string;
  id: string;
  imageUrl: string;
  name: string;
  pcsRaceId: string;
  startDate: string;
  updatedAt: string;
  race: Race;
  teamIds: string[];
  rankingUrl: string;
  isUsingRankingTemplate: boolean;
  isUsingLiveRanking: boolean;
  isRewardConfirmed: boolean;
  isMultiRaces: boolean;
  ruleUrl: string;
  externalUrl: string;
  raceType: MultiRaceTypeEnum;
  rule: GameRule;
};

export type GameRequest = Pagination & {
  status: GameStatus;
  gameMode?: 'global' | 'cap';
};

export type GetGameNftsRequest = Pagination & {
  userId?: string;
  gameId: string;
  name?: string;
  includedTeamId?: string;
  isUsedStartList?: boolean;
  rarity?: string[];
  typeOfCard?: string;
  fromAverageCapScore?: numnber;
  toAverageCapScore?: numnber;
  actualTeam?: string[];
};

export type CreateTeam = {
  id: string;
  teamId?: string;
  nfts: CardItem[];
  captainId?: string;
  divisionId: string;
};

export type Division = {
  id: string;
  name: string;
  rule: {
    blue: number[];
    pink: number[];
    yellow: number[];
    white: number[];
  };
};

export type GameConfig = {
  divisions: Division[];
};

export type TypeOfCard = 'nft' | 'na' | 'white';

export type ActualTeam = {
  id: string;
  name: string;
};

export type GetGameRankingsRequest = Pagination & {
  gameId: string;
  divisionId: string;
  isFriend?: boolean;
};

export type GameRankingTeamsScore = {
  id: string;
  gameId: string;
  freeCards: CardItem[];
  naCards: CardItem[];
  nfts: CardItem[];
  totalPoint: number;
  createdBy: User;
  globalPosition: number;
  results: {
    id: string;
    point: number;
    isCaptain: boolean;
  }[];
};

export type Reward = {
  id: string;
  gameId: string;
  nfts: CardItem;
  status: GameRewardStatusEnum;
  usdcRewards: { value: number }[];
  jackpotReward: number;
  xpReward: number;
};

export type GameRule = {
  name: string;
  roles: {
    role: Role;
    index: number;
  }[];
  leagues: {
    divisionId: string;
    division: {
      id: string;
      name: string;
    };
    options: {
      na: number[];
      blue: number[];
      pink: number[];
      yellow: number[];
      white: number[];
    };
    usdcReward: number;
    numberOfTeams: number;
  }[];
};

export type GetRankingPosition = {
  gameId: string;
  divisionId: string;
  isFriend?: boolean;
};

export type GetActualTeam = {
  rarity?: string[] | string;
  isUsedStartList?: boolean;
  gameId: string;
};

export type RankingPackage = {
  usdcReward: number;
  rankingFrom: number;
  rankingTo: number;
  nftRewardTemplates: {
    rarity: string;
    riderStar: number;
  }[];
};

export type RewardJackpotLeague = {
  divisionId: string;
  scoreCondition: string;
  minScore: number;
  usdcReward: number;
};

export type GetMyTeam = {
  page?: string | number;
  limit?: string | number;
  status?: GameStatus[];
};

export type Game = {
  _id: string;
  name: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  id: string;
  gameMode?: GameMode;
};

export type MyTeam = {
  _id: string;
  gameId: string;
  totalPoint: number;
  divisionId: string;
  createdAt: string;
  division: Division;
  game: Game;
  id: string;
  ranking: number;
  numberOfTeams: number;
};

export type RuleTemplate = {
  id: string;
  imageUrl: string;
  name: string;
};

export type GetRewardPoolParams = {
  gameId: string;
  rarity: string;
};

export type GetGameScoringParams = {
  id: string;
  raceId: string;
  rankingTemplateId: string;
  isGameComing: boolean;
  isDisabled: boolean;
};

export type GameRankingScoring = {
  criteriasPoints: any[];
  scoreByRankingRulesWithPoints: {
    isExtended: boolean;
    name: MatrixRole;
    point: number;
    rankingExtendedPoints: number;
    rankingPoints: number;
    type: string;
    value: number;
  }[];
  info: {
    stageNumber: number;
    totalRiders: number;
  };
};

export type GetRaceInfo = {
  gameId;
  raceId;
};
