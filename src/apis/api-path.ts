import { NEXT_PUBLIC_API_URL } from '@/config/appConfig';

export const API_PATH = {
  SIGN_IN: '/auth/login',
  SIGN_IN_WITH_GOOGLE: '/auth/google',
  SIGN_IN_WITH_FACEBOOK: '/auth/facebook',
  SIGN_UP: '/auth/register',
  FORGOT_PASSWORD: '/auth/email/password-reset',
  RESET_PASSWORD: '/auth/password/reset',
  USER_PROFILE: '/users/me/profile',
  UPDATE_PASSWORD: '/users/me/password',
  UPDATE_AVATAR: '/users/me/avatar',
  UPDATE_COVER: '/users/me/cover',
  DELETE_MY_ACCOUNT: '/users/me/delete-permanently',
  GET_NFTS_WINING: '/users/me/winning-nft-auctions',
  GET_BUNDLES_WINING: '/users/me/winning-nft-bundle-auctions',
  CLAIM_BUNDLES: '/nft-bundles',
  GET_MY_NFTS: '/users/me/nfts',
  GET_USER_LEVELS: '/users/levels',
  CHECK_EXPIRED_TOKEN: '/auth/check',
  GET_CARD: '/nfts',
  GET_CARD_FILTER_OPTIONS: '/nfts/filter-options',
  GET_START_LIST_COMING_GAMES: '/game-teams/start-list',
  GET_CARD_MY_TEAM: '/nfts/me',
  GET_CARD_SALE: '/nfts/sales',
  GET_CARD_BIDS: '/nfts/:nftId/bids',
  GET_PARAMS_FILTER_CARD: '/filter-cards',
  GET_TEAMS: '/teams',
  GET_NFT_BY_BUNDLES: '/nft-bundles/search-by-nft',
  GET_GAMES: '/games',
  GET_RIDER_RESULTS: '/games/:gameId/start-list-riders',
  GET_REWARD_POOL: '/games/:gameId/rewards-pool',
  GET_TEAM_RANKING: '/team-ranking',
  GET_TEAM_SCORE: '/team-score',
  GET_UNIQUE_RARITY_CARD: '/nfts/filter-by-unique-rarity',
  GET_BUNDLES_DETAIL: '/nft-bundles',
  GET_REFERRALS: '/users/me/referred-users',
  GET_REFERRED_REWARDS: '/users/me/referred-rewards',
  GET_FOLLOWINGS: '/users/me/followings',
  SUBCRIBE_EMAIL: '/email/subscribe',
  GET_BIDS: '/users',
  GET_WHITE_CARDS: '/free-cards',
  RIDERS_SEARCH: '/riders/search',
  USERS_SEARCH: '/users/search',

  // PAYMENT
  LISTEN_PAYMENT: '/sse/orders/created',
  BID: '/payments/nft-auction/pay',
  PAYMENT_INTENTS_AUCTION: '/payments/nft-auction/payment-intents',
  BUNDLES_BID: '/payments/nft-bundle/pay',
  PAYMENT_INTENTS_BUNDLE: '/payments/nft-bundle/payment-intents',
  BUY_NFT: '/payments/nft-fixed/pay',
  PAYMENT_INTENTS_FIXED: '/payments/nft-fixed/payment-intents',
  WITHDRAW: '/withdrawals/request',
  VERIFY_WITHDRAW: '/withdrawals',
  WITHDRAW_HISTORY: '/withdrawals',

  // TRANSFER
  LISTEN_TRANSFER: '/sse/users',

  // OTHER USER
  GET_NFT_BY_USER: '/users',
  GET_PROFILE_BY_USER: '/users',
  FOLLOW_USER: '/users',
  GET_USER_FOLLOWS: '/users/:userId/follows',

  //GAME
  GET_NFTS_TO_CREATE_GAME: '/games',
  CREATE_TEAM: '/games',
  DELETE_TEAM: '/game-teams/:teamId',
  GET_GAME_CONTROLLER: '/games',
  GET_FREE_CARDS: '/games',
  GET_GAME_CONFIG: '/games/configs',
  GET_GAME_TEAMS: '/games',
  GET_GAME_NA_CARDS: '/games',
  GET_COUNT_TEAMS: '/games',
  GET_ACTUAL_TEAMS: '/games/actual-teams',
  GET_MY_TRAINEE_CARDS: '/games/:id/my-trainee-cards',
  GET_GAME_RANKINGS: '/games',
  GET_RANKING_TEAM_SCORE: '/game-teams',
  GET_RIDER_SCORES: '/riders/:riderId',
  GET_TEMPLATE_RULE: '/games/:gameId/template-rule',
  GET_RACE_INFO: '/games/:gameId/race-info',

  // MY TEAM TABS
  COUNT_TOTAL_MY_TEAM_TAB: '/users/me/count',
  GET_MY_NFT_SALES: '/users/me/nft-sales',

  GET_NFTS_BY_RIDER: '/riders/:riderId/nfts',

  // REWARD
  GET_MY_REWARD: '/games/:gameId/my-reward',
  CLAIM_REWARD: '/games/:gameId/my-reward/claim',
  GET_REWARD_STATUS: '/games/:gameId/my-reward/status',

  TRANSFER_XP_TO_NFT: '/game-nfts/:nftId/add-xp',
  GET_RANKING_POSITION: '/games/:gameId/my-ranking/:divisionId',
  LINK_ACCOUNT: '/users/me/link-account',

  CHECK_GAME_NFT_SALES: '/game-nfts/:nftId/check-sales',
  REMOVE_TEAM: '/game-nfts/:nftId/remove',

  GET_RIDER_INFO: '/riders/:id',
  TAKE_REFERRAL_REWARD: '/users/me/referred-rewards/take',
  GET_DETAIL_REFERRED_REWARD: '/users/me/referred-rewards/detail',
  AFFILIATE_CLAIM: '/users/me/referred-rewards/claim',

  GET_AFFILIATE_REWARD_SETTING: '/users/me/reward-setting',
  GET_NOTIFICATIONS: '/announcements',
  GET_NOTIFICATION_DETAILS: '/announcements/:id',
  MARK_READ_NOTIFICATIION: '/announcements/:id/reading',
  MARK_READ_ALL_NOTIFICATIION: '/announcements/seen-all',
  COUNTING_UNREAD_NOTIFICATIONS: '/announcements/counting-unread',
  LISTEN_NOTIFICATION: '/sse/announcements',
  LISTEN_NOTIFICATION_BY_USER: '/sse/users/:id/announcements',
  LISTEN_LEVEL_UP: '/sse/users/:userId/level-up',

  // FREE CARDS
  GET_MY_FREE_CARDS: '/free-cards/my-team',
  GENERATE_MY_FEE_CARDS: '/free-cards/my-team/generate',
  TAKE_FEE_CARD: '/free-cards/my-team/take',
  AUTO_TAKE_FEE_CARDS: '/free-cards/my-team/auto-take',
  CLAIM_FEE_CARDS: '/free-cards/my-team/claim',
  GET_TIMEOUT_TO_TRANSFER_FREE_CARD: '/free-cards/transfers/last',
  GENERATE_TRANSFER_FREE_CARD: '/free-cards/transfers/:nftId',
  TRANSFER_FREE_CARD: '/free-cards/transfers/:id/claim/:riderId',

  // FAVORITE
  FAVORITE_CARD: '/users/me/favorites/:riderId/add',
  UNFAVORITE_CARD: '/users/me/favorites/:riderId/remove',
  GET_MY_FAVORITE_CARDS: '/users/me/favorites',
  GET_FAVORITE_RIDER_IDS: '/users/me/favorites/rider-ids',

  // BONUS
  GET_CARDS_BONUS: '/game-teams/bonus',
  GET_MY_GAME_TEAM: '/game-teams/me',

  // AVG CAPSCORE
  GET_CARDS_AVERAGE_CAP_SCORE: '/riders/average-cap-scores',

  // STRIPE EXCHANGE
  GET_CURRENCY_EXCHANGE: '/withdrawals/currency-exchange',
  SEE_EXCHANGE_RATES: '/sse/exchange-rates',

  COUNT_BY_RATIRY: '/users/me/nfts/count-rarity',

  GET_GAME_SCORING: '/games/:gameId/scoring',

  // AWARDS
  GET_AWARDS_UNDERSTANDING_RULE_CATEGORIES:
    '/awards/understanding-rule-categories',
  GET_AWARDS_UNDERSTANDING_RULES: '/awards/understanding-rules',
  CLAIM_AWARDS_UNDERSTANDING_RULE: '/awards/understanding-rules/:id/claim',
  GET_AWARDS_PROGRESSION_RULES: '/awards/progression-rules',

  // KYC
  GET_KYC_DETAILS: '/kyc/details',
  KYC_PERSONAL_INFO: '/kyc/personal-info',
  KYC_DOCUMENT: '/kyc/document',
  KYC_AUTO_VERIFY: '/kyc/automatic-verify',
};

export const getApiPath = (path: string) => `${NEXT_PUBLIC_API_URL}${path}`;
