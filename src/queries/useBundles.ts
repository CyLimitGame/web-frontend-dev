import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  API_PATH,
  bidBundle,
  claimBundle,
  getBundleDetailCard,
  getBundlesWining,
} from '@/apis';

type Props = {
  id: string;
};

export const useGetBundleDetailCard = ({ id }: Props) => {
  return useQuery(
    [API_PATH.GET_BUNDLES_DETAIL, id],
    () => getBundleDetailCard(id),
    { enabled: !!id }
  );
};

export const useBidBundleItem = () => {
  return useMutation(bidBundle);
};

export const useGetBundlesWining = () => {
  return useQuery([API_PATH.GET_BUNDLES_WINING], getBundlesWining);
};

export const useClaimBundle = () => {
  const queryClient = useQueryClient();

  return useMutation(claimBundle, {
    onSuccess: () => {
      queryClient.invalidateQueries([API_PATH.GET_BUNDLES_WINING]);
      queryClient.invalidateQueries([API_PATH.GET_MY_NFTS]);
    },
  });
};
