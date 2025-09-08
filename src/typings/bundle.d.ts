import { AuctionBid } from './auction';
import { CardItem } from './card';

export type BundleCard = {
  id: string;
  name: string;
  auctionStartPrice: number;
  auctionStepMinPrice: number;
  auctionBestBid: AuctionBid;
  auctionBids: AuctionBid[];
  auctionEndDate: string;
  nfts: CardItem[];
};

export type BundleBid = {
  bundleId: string;
  amount: number;
};
