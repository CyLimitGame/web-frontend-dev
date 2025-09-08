export enum GameStatus {
  PAST = 'past',
  INPROGRESS = 'in_progress',
  COMMING = 'comming',
}

export enum Role {
  LEADER = 'leader',
  CLIMBER = 'climber',
  SPRINTER = 'sprinter',
  FREE_ELECTRON = 'free_electron',
  DOMESTIC = 'domestic',
}

export enum MultiRaceTypeEnum {
  MULTI_RACE = 'multi_race',
  MULTI_TOUR = 'multi_tour',
}

export enum GameRewardStatusEnum {
  NONE = 'none',
  PENDING = 'pending',
  WAITING_TO_CLAIM = 'waiting_to_claim',
  CLAIMED = 'claimed',
  REJECTED = 'rejected',
}

export enum GameMode {
  ACCESS = 'cap',
  EXPERT = 'global',
}

export enum MatrixRole {
  STAGE_RANKING = 'stage_ranking',
  GENERAL_CLASSIFICATION_RANKING = 'general_classification_ranking',
  GENERAL_CLASSIFICATION_JERSEY = 'general_classification_jersey',
  KOM_CLASSIFICATION_JERSEY = 'kom_classification_jersey',
  POINTS_CLASSIFICATION_JERSEY = 'points_classification_jersey',
  STAGE_RANKING_OF_RIDER_TEAM = 'stage_ranking_of_rider_team',
  GENERAL_CLASSIFICATION_RANKING_OF_RIDER_TEAM = 'general_classification_ranking_of_rider_team',
  BETTER_STAGE_RANKING_TEAMMATE = 'better_stage_ranking_teammate',
  BETTER_GENERAL_CLASSIFICATION_RANKING_TEAMMATE = 'better_general_classification_ranking_teammate',
  BREAKAWAY = 'breakaway',
  POINTS = 'points',
  KOM_POINTS = 'kom_points',
  FINISH_STAGE = 'finish_stage',
  INTERMEDIATE_SPRINTS_PRESENCE = 'intermediate_sprints_presence',
  BEST_TEAMMATE_BONUS = 'best_teammate_bonus',
  BEST_TEAMMATE_MALUS = 'best_teammate_malus',
  STARTER = 'starter',
  WINNER_OF_STAGE = 'winner_of_stage',
}
