export enum AwardProgressionCategoriesEnum {
  FRIENDS = 'friends',
  FANTASY_GAMES = 'fantasy-games',
  COLLECTIBLES = 'collectibles',
}

export enum AwardProgressionSubcategoriesEnum {
  FRIENDS__INVITING = 'friends:inviting',
  FRIENDS__FOLLOWING = 'friends:following',
  FRIENDS__SOCIAL_NETWORKS = 'friends:social-networks',

  FANTASY_GAMES__PARTICIPATING = 'fantasy-games:participating',
  FANTASY_GAMES__REWARDS = 'fantasy-games:rewards',
  FANTASY_GAMES__SCORING_RECORDS = 'fantasy-games:scoring-records',

  COLLECTIBLES__MARKETPLACE = 'collectibles:marketplace',
  COLLECTIBLES__LEVELS = 'collectibles:levels',
}

export enum AwardProgressionQuestsEnum {
  FRIENDS__INVITING__INVITE_FRIENDS = 'friends:inviting:invite-friends',
  FRIENDS__INVITING__REFERRED_FRIENDS = 'friends:inviting:referred-friends',

  FRIENDS__FOLLOWING__FOLLOW_FRIENDS = 'friends:following:follow-friends',
  FRIENDS__FOLLOWING__BEING_FOLLOWED = 'friends:following:being-followed',

  FRIENDS__SOCIAL_NETWORKS__TWITTER = 'friends:social-networks:twitter',
  FRIENDS__SOCIAL_NETWORKS__DISCORD = 'friends:social-networks:discord',

  FANTASY_GAMES__PARTICIPATING__FIRST_TEAM_IN_ACCESS_LEAGUE_4 = 'fantasy-games:participating:first-team-in-access-league-4',
  FANTASY_GAMES__PARTICIPATING__FIRST_TEAM_IN_ACCESS_LEAGUE_3 = 'fantasy-games:participating:first-team-in-access-league-3',
  FANTASY_GAMES__PARTICIPATING__FIRST_TEAM_IN_ACCESS_LEAGUE_2 = 'fantasy-games:participating:first-team-in-access-league-2',
  FANTASY_GAMES__PARTICIPATING__FIRST_TEAM_IN_ACCESS_LEAGUE_1 = 'fantasy-games:participating:first-team-in-access-league-1',
  FANTASY_GAMES__PARTICIPATING__FIRST_TEAM_IN_EXPERT_LEAGUE_4 = 'fantasy-games:participating:first-team-in-expert-league-4',
  FANTASY_GAMES__PARTICIPATING__FIRST_TEAM_IN_EXPERT_LEAGUE_3 = 'fantasy-games:participating:first-team-in-expert-league-3',
  FANTASY_GAMES__PARTICIPATING__FIRST_TEAM_IN_EXPERT_LEAGUE_2 = 'fantasy-games:participating:first-team-in-expert-league-2',
  FANTASY_GAMES__PARTICIPATING__FIRST_TEAM_IN_EXPERT_LEAGUE_1 = 'fantasy-games:participating:first-team-in-expert-league-1',

  FANTASY_GAMES__REWARDS__CLAIM_FIRST_REWARDS = 'fantasy-games:rewards:claim-first-rewards',
  FANTASY_GAMES__REWARDS__WIN_JACKPOT = 'fantasy-games:rewards:win-jackpot',
  FANTASY_GAMES__REWARDS__PODIUM_IN_LEAGUE_4 = 'fantasy-games:rewards:podium-in-league-4',
  FANTASY_GAMES__REWARDS__PODIUM_IN_LEAGUE_3 = 'fantasy-games:rewards:podium-in-league-3',
  FANTASY_GAMES__REWARDS__PODIUM_IN_LEAGUE_2 = 'fantasy-games:rewards:podium-in-league-2',
  FANTASY_GAMES__REWARDS__PODIUM_IN_LEAGUE_1 = 'fantasy-games:rewards:podium-in-league-1',
  FANTASY_GAMES__REWARDS__VICTORY_IN_LEAGUE_4 = 'fantasy-games:rewards:victory-in-league-4',
  FANTASY_GAMES__REWARDS__VICTORY_IN_LEAGUE_3 = 'fantasy-games:rewards:victory-in-league-3',
  FANTASY_GAMES__REWARDS__VICTORY_IN_LEAGUE_2 = 'fantasy-games:rewards:victory-in-league-2',
  FANTASY_GAMES__REWARDS__VICTORY_IN_LEAGUE_1 = 'fantasy-games:rewards:victory-in-league-1',

  FANTASY_GAMES__SCORING_RECORDS__CARD_SCORES_50 = 'fantasy-games:scoring-records:card-scores-50',
  FANTASY_GAMES__SCORING_RECORDS__CARD_SCORES_60 = 'fantasy-games:scoring-records:card-scores-60',
  FANTASY_GAMES__SCORING_RECORDS__CARD_SCORES_70 = 'fantasy-games:scoring-records:card-scores-70',
  FANTASY_GAMES__SCORING_RECORDS__CARD_SCORES_80 = 'fantasy-games:scoring-records:card-scores-80',
  FANTASY_GAMES__SCORING_RECORDS__CARD_SCORES_90 = 'fantasy-games:scoring-records:card-scores-90',
  FANTASY_GAMES__SCORING_RECORDS__CARD_SCORES_100 = 'fantasy-games:scoring-records:card-scores-100',
  FANTASY_GAMES__SCORING_RECORDS__CARD_SCORES_100_LEVEL_20 = 'fantasy-games:scoring-records:card-scores-100-level-20',
  FANTASY_GAMES__SCORING_RECORDS__CARD_SCORES_125_CAPTAIN = 'fantasy-games:scoring-records:card-scores-125-captain',
  FANTASY_GAMES__SCORING_RECORDS__TEAM_SCORES_200 = 'fantasy-games:scoring-records:team-scores-200',
  FANTASY_GAMES__SCORING_RECORDS__TEAM_SCORES_250 = 'fantasy-games:scoring-records:team-scores-250',
  FANTASY_GAMES__SCORING_RECORDS__TEAM_SCORES_300 = 'fantasy-games:scoring-records:team-scores-300',
  FANTASY_GAMES__SCORING_RECORDS__TEAM_SCORES_350 = 'fantasy-games:scoring-records:team-scores-350',
  FANTASY_GAMES__SCORING_RECORDS__TEAM_SCORES_400 = 'fantasy-games:scoring-records:team-scores-400',
  FANTASY_GAMES__SCORING_RECORDS__TEAM_SCORES_450 = 'fantasy-games:scoring-records:team-scores-450',
  FANTASY_GAMES__SCORING_RECORDS__TEAM_SCORES_500 = 'fantasy-games:scoring-records:team-scores-500',

  COLLECTIBLES__MARKETPLACE__PRIMARY_MARKET_BUY_BLUE_NFT = 'collectibles:marketplace:primary-market-buy-blue-nft',
  COLLECTIBLES__MARKETPLACE__PRIMARY_MARKET_BUY_PINK_NFT = 'collectibles:marketplace:primary-market-buy-pink-nft',
  COLLECTIBLES__MARKETPLACE__PRIMARY_MARKET_BUY_YELLOW_NFT = 'collectibles:marketplace:primary-market-buy-yellow-nft',
  COLLECTIBLES__MARKETPLACE__SECONDARY_MARKET_BUY_BLUE_NFT = 'collectibles:marketplace:secondary-market-buy-blue-nft',
  COLLECTIBLES__MARKETPLACE__SECONDARY_MARKET_BUY_PINK_NFT = 'collectibles:marketplace:secondary-market-buy-pink-nft',
  COLLECTIBLES__MARKETPLACE__SECONDARY_MARKET_BUY_YELLOW_NFT = 'collectibles:marketplace:secondary-market-buy-yellow-nft',
  COLLECTIBLES__MARKETPLACE__SECONDARY_MARKET_SELL_NFT = 'collectibles:marketplace:secondary-market-sell-nft',
  COLLECTIBLES__MARKETPLACE__PRIMARY_BUY_NFT_SAME_RIDER = 'collectibles:marketplace:primary-buy-nft-same-rider',
  COLLECTIBLES__MARKETPLACE__PRIMARY_BUY_NFT_SAME_TEAM_SEASON = 'collectibles:marketplace:primary-buy-nft-same-team-season',
  COLLECTIBLES__MARKETPLACE__PRIMARY_BUY_BLUE_NFT_FIRST_SERIAL_NUMBER = 'collectibles:marketplace:primary-buy-blue-nft-first-serial-number',
  COLLECTIBLES__MARKETPLACE__PRIMARY_BUY_PINK_NFT_FIRST_SERIAL_NUMBER = 'collectibles:marketplace:primary-buy-pink-nft-first-serial-number',

  COLLECTIBLES__LEVELS__LEVEL_1 = 'collectibles:levels:level-1',
  COLLECTIBLES__LEVELS__LEVEL_2 = 'collectibles:levels:level-2',
  COLLECTIBLES__LEVELS__LEVEL_4 = 'collectibles:levels:level-4',
  COLLECTIBLES__LEVELS__LEVEL_6 = 'collectibles:levels:level-6',
  COLLECTIBLES__LEVELS__LEVEL_8 = 'collectibles:levels:level-8',
  COLLECTIBLES__LEVELS__LEVEL_10 = 'collectibles:levels:level-10',
  COLLECTIBLES__LEVELS__LEVEL_12 = 'collectibles:levels:level-12',
  COLLECTIBLES__LEVELS__LEVEL_14 = 'collectibles:levels:level-14',
  COLLECTIBLES__LEVELS__LEVEL_16 = 'collectibles:levels:level-16',
  COLLECTIBLES__LEVELS__LEVEL_18 = 'collectibles:levels:level-18',
  COLLECTIBLES__LEVELS__LEVEL_20 = 'collectibles:levels:level-20',
}
