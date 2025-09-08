export enum FilterBy {
  NEW_CARD = 'new_cards',
  BUNDLES = 'bundles',
  FIRST_SERIAL_NUMBER = 'first_serial_number',
  BEST_VALUE = 'best_value',
  LASTING_LISTING = 'lasting_listing',
}

export enum SortBy {
  CREATE_AT = 'createdAt',
  AUCTION_END_DATE = 'auctionEndDate',
  FIXED_END_DATE = 'fixedEndDate',
  FIXED_PRICE = 'fixedPrice',
}

export enum MarketType {
  REWARD = 'reward',
  AUCTION = 'auction',
  FIXED = 'fixed',
  OWNER = 'owner',
  NONE = 'none',
  AUCTION_COLLECTION = 'bundle',
}

export enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export enum TransferStatus {
  WAITING = 'waiting',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum FreeCardsTeamStatusEnum {
  NEW = 'new',
  PENDING = 'pending',
  ERROR = 'error',
  CLAIMED = 'claimed',
}

export enum RoleCard {
  LEADER = 'leader',
  CLIMBER = 'climber',
  SPRINTER = 'sprinter',
  DOMESTIC = 'domestic',
  FREE_ELECTRON = 'free_electron',
  CAP = 'cap',
}

export enum RaceType {
  ACCESS = 'ACCESS',
  EXPERT = 'EXPERT',
}
