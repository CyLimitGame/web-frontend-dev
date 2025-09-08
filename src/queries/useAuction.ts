import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  API_PATH,
  bid,
  claim,
  getDetailCard,
  getAvgCapScoreAndBonus,
  getBestBidNfts,
  getLostBidNfts,
  getNftsWining,
} from '@/apis';
import { UseGetBidNftsProps } from '@/typings/auction';

type Props = {
  id: string;
};

export const useGetDetailCard = ({ id }: Props) => {
  return useQuery(
    [API_PATH.GET_CARD, id],
    async () => {
      const res = await getDetailCard(id);
      const items = await getAvgCapScoreAndBonus({ items: [res] });
      return items[0];
    },
    { enabled: !!id }
  );
};

export const useBidItem = () => {
  return useMutation(bid);
};

export const useGetNftsWining = () => {
  return useQuery([API_PATH.GET_NFTS_WINING], async () => {
    const res = await getNftsWining();
    const items = await getAvgCapScoreAndBonus({ items: res });
    return items;
  });
};

export const useClaim = () => {
  const queryClient = useQueryClient();

  return useMutation(claim, {
    onSuccess: () => {
      queryClient.invalidateQueries([API_PATH.GET_NFTS_WINING]);
      queryClient.invalidateQueries([API_PATH.GET_MY_NFTS]);
    },
  });
};

export const useGetBestBidNfts = ({ userId }: UseGetBidNftsProps) => {
  return useQuery(
    [API_PATH.GET_BIDS, userId, 'best-bid'],
    async () => {
      const res = await getBestBidNfts({ userId });
      const items = await getAvgCapScoreAndBonus({ items: res });
      return items;
    },
    { enabled: !!userId }
  );
};

export const useGetLostBidNfts = ({ userId }: UseGetBidNftsProps) => {
  return useQuery(
    [API_PATH.GET_BIDS, userId, 'lost-bid'],
    async () => {
      const res = await getLostBidNfts({ userId });
      const items = await getAvgCapScoreAndBonus({ items: res });
      return items;
    },
    { enabled: !!userId }
  );
};
