import { MarketType } from '@/typings/card.enum';

export const MAP_TEXT_MARKET_TYPE = {
  [MarketType.REWARD]: 'Reward',
  [MarketType.AUCTION]: 'Primary',
  [MarketType.FIXED]: 'Secondary',
  [MarketType.NONE]: 'None',
  [MarketType.OWNER]: 'Owner',
  [MarketType.AUCTION_COLLECTION]: 'Bundle',
};
