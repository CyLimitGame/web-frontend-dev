export type RewardsItem = {
  id: string;
  rank?: number;
  rankLabel?: string;
  point?: string;
  items: {
    [key: string]: any;
  };
};
