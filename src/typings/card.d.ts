import { Owner, User } from './auction';
import {
  FilterBy,
  MarketType,
  OrderBy,
  SortBy,
  TransferStatus,
  RoleCard,
} from './card.enum';
import { OrderByType, Option } from './common.d';

import { PaymentMethod } from '@/queries/usePayment';

export type ScoreRole = {
  name: RoleCard;
  value: number;
};

export type Score = {
  name: string;
  startDate: string;
  endDate: string;
  roles: ScoreRole[];
};

export interface RacesScore {
  pcsRaceId: string;
  score: Score;
}

export type FilterCards = {
  gameId?: string;
  page?: number;
  limit?: number;
  teamId?: string[];
  marketType?: MarketType | MarketType[];
  nationality?: string[];
  fromScore?: number;
  toScore?: number;
  fromAge?: number;
  toAge?: number;
  status?: string[];
  rarity?: string[];
  yearOfEdition?: string[];
  typeOfCard?: string[];
  filterBy?: FilterBy;
  score?: number[];
  age?: number[];
  sortBy?: SortBy;
  firstSerialNumber?: number;
  orderBy?: OrderBy;
  search?: string;
  isMyFavorite?: boolean;
};

type FilterItem = {
  value: string;
  label: string;
};

export type FilterCardParams = {
  teams: FilterItem[];
  nationalities: FilterItem[];
  statuses: FilterItem[];
  rarities: FilterItem[];
  yearOfEditions: FilterItem[];
  typeOfCard: FilterItem[];
};

export type CardItem = {
  ownerId: string;
  age: number;
  gender: string;
  auctionCurrency: string;
  auctionStartPrice: number;
  chainId: number;
  cid: string;
  contractAddress: string;
  createdAt: string;
  firstSerialNumber: string;
  id: string;
  imageUrl: string;
  lastSerialNumber: string;
  marketType: MarketType;
  name: string;
  nationality: string;
  rarity: string;
  score: number;
  status: string;
  teamId: string;
  tokenId: number;
  typeOfCard: string;
  updatedAt: string;
  yearOfEdition: number;
  fixedPrice: number;
  auctionEndDate: string;
  auctionStartDate: string;
  owner: Owner;
  team: Team;
  sales: SaleHistoryItem[];
  fixedEndDate: string;
  stripeFee: number;
  stripeTotalAmount: number;
  fee: number;
  totalAmount: number;
  rampFee: number;
  rampTotalAmount: number;
  isLocked: boolean;
  transferStatus: TransferStatus;
  index?: number;
  role?: string;
  rider?: Rider;
  _id: string;
  level: number;
  totalXpToNextLevel: number;
  riderAverageCapScore: number;
  riderId: string;
  bonus: Bonus;
  capScore: any;
};

export type MyCardItem = Omit<CardItem, 'sales'> & {
  sales: Sale[];
};

export type FilterType = {
  label: string;
  value: MarketType;
  filterBy: FilterBy;
};

export type Team = {
  name: string;
  id: string;
};

export type CardBundleItem = {
  id: string;
  auctionCurrency: string;
  auctionStartPrice: number;
  auctionStepMinPrice: 0;
  nfts: CardItem[];
  createdAt: string;
  name: string;
};

export type SaleHistoryItem = {
  id: string;
  amount: number;
  toUser: User;
  fromUser: User;
  marketType: MarketType;
  createdAt: string;
};

export type Nft = {
  id: string;
  _id: string;
  name: string;
  nationality: string;
  serialNumber: string;
  imageUrl: string;
  tokenId: number;
  contractAddress: string;
};

export type Sale = {
  amount: number;
  createdAt: string;
  id: string;
  _id: string;
  paymentMethod: PaymentMethod;
  transferStatus: TransferStatus;
  marketType: MarketType;
  fromUser: User;
  toUser: User;
  nft: Nft;
};

export type ActualTeam = {
  class: string;
  name: string;
  season: number;
};

export type Rider = {
  id: string;
  name: string;
  status: string;
  actualTeam: ActualTeam;
  raceScores: RacesScore[];
};

export type MySaleHistoryItem = {
  id: string;
  amount: number;
  fromUser: User;
  toUser: User;
  nft: CardItem;
  nftId: string;
};

export type TransferXpToNft = {
  nftId: string;
  xp: number;
};

export type TakeFreeCard = {
  freeCardCapScoreId: string;
  riderId: string;
};

export type TransferFreeCardRequest = {
  id: string;
  riderId: string;
};

export type TransferFreeCard = {
  riderId: {
    averageCapScore: number;
    freeCard: CardItem;
    id: string;
  };
};

export type Bonus = {
  id: string;
  bonus: number;
};

export type GetBonusParams = {
  naCardIds?: string[];
  nftIds?: string[];
  gameTeamId?: string;
};

export type GetAverageCapScoreParams = {
  riderIds?: string[];
};

export type RequestFilter = {
  marketType?: MarketType | MarketType[];
  ownerId?: string;
  riderId?: string;
};

export type NfrBidRequestParams = {
  page?: number;
  limit?: number;
  nftId: string;
};

export type NfrSaleRequestParams = {
  page?: number;
  limit?: number;
  name?: string;
  sortBy?: string;
  orderBy?: OrderByType;
  dateFrom?: string;
  dateTo?: string;
  page: number;
  limit: number;
  transferStatus?: string;
  paymentMethod?: string;
  marketType?: string;
  rarity?: string[];
  riderId: string;
};

type StartListOfRiderOption = Option & {
  riderIds: string[];
};
type FilterCardOption = {
  currentTeams: Option[];
  teamCards: Option[];
  nationalities: Option[];
  yearOfEditions: Option[];
  typeOfCard: Option[];
  startListOfRiders: StartListOfRiderOption[];
  statuses: Option[];
  rarities: Option[];
};

export type CountByRariry = {
  pink: number;
  yellow: number;
  blue: number;
  white: number;
};
