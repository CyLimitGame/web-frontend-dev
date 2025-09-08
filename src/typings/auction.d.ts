import { CardItem, Team } from './card';
import { Sale } from './card';
import { Jersey, Sponsor } from './user.enum';

export type AuctionCard = CardItem & {
  currency: string;
  description: string;
  gender: string;
  ownerId: string;
  tokenId: string;
  auctionBestBid: AuctionBid;
  auctionBids: AuctionBid[];
  auctionStepMinPrice: number;
  owner: Bidder;
  team: Team;
  sales: Sale[];
};

export type Bid = {
  nftId: string;
  amount: number;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  nickName?: string;
  jersey?: Jersey;
  primaryColor?: string;
  secondaryColor?: string;
  sponsor?: Sponsor;
};

export type Bidder = User;
export type Owner = User;

export type AuctionBid = {
  id: string;
  amount: number;
  bidder: Bidder;
  status: PaymentStatus;
  createdAt: string;
};

export type UseGetBidNftsProps = {
  userId: string;
};

export type NftUserAuction = {
  contractAddress: string;
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  ownerId: stringl;
  tokenId: string;
  auctionBestBid: AuctionBid;
};

export type NftBid = {
  _id: string;
  amount: amount;
  status: PaymentStatus;
  createdAt: string;
  bidder: Bidder;
  id: string;
};

export type AuctionBestBid = AuctionBid;
