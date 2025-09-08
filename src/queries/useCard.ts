import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import _ from 'lodash';

import {
  API_PATH,
  autoTakeFreeCards,
  checkGameNftSale,
  claimFreeCards,
  generateMyFreeCards,
  generateTransferFreeCard,
  getCardDetail,
  getCards,
  getFilterOptions,
  getMyFreeCards,
  getMyNfts,
  getNftsByRider,
  getNftsByUser,
  getRiderInfo,
  getTeams,
  getTimeoutToTransferFreeCard,
  getUniqueRarityCard,
  getWhiteCards,
  removeTeam,
  takeFreeCard,
  transferXpToNft,
  transferFreeCard,
  favoriteCard,
  unfavoriteCard,
  getMyFavoriteCards,
  getFavoriteRiderIds,
  getAvgCapScoreAndBonus,
  getStartListComingGames,
  getNftsSale,
  getNftsBids,
  countByRariry,
} from '@/apis';
import { FilterCardRequest } from '@/typings/request';
import { FILTER_LIMIT } from '@/constants/filter';
import { MarketType } from '@/typings/card.enum';
import { cardFilter } from '@/mock/card';
import COUNTRIES from '~/public/json/countries.json';
import COUNTRIES_FR from '~/public/json/countries-fr.json';
import { Pagination } from '@/typings/common';
import { useToastMessage } from '@/hooks/useToastMessage';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import {
  FilterCardOption,
  NfrBidRequestParams,
  NfrSaleRequestParams,
  RequestFilter,
} from '@/typings/card';

export const useGetCards = (
  params?: FilterCardRequest,
  ignoreCapScores = false
) => {
  return useQuery([API_PATH.GET_CARD, params], async () => {
    const res = await getCards({
      page: 1,
      limit: FILTER_LIMIT,
      marketType: MarketType.AUCTION,
      ...params,
    });
    if (ignoreCapScores) return res;
    const items = await getAvgCapScoreAndBonus({ items: res.items });
    return {
      ...res,
      items,
    };
  });
};

export const useGetCardDetail = (
  id: string,
  marketType: MarketType,
  enabled: boolean
) => {
  return useQuery(
    [API_PATH.GET_CARD, id],
    async () => {
      const res = await getCardDetail(id, marketType);
      const items = await getAvgCapScoreAndBonus({ items: [res] });
      return items[0];
    },
    { enabled }
  );
};

export const useGetParamsCardFilter = (params: RequestFilter) => {
  const { locale } = useRouter();

  return useQuery(
    [API_PATH.GET_PARAMS_FILTER_CARD, { ...params }],
    async () => {
      const { items } = await getTeams();
      const filterOptions = await getFilterOptions(params);
      const startListOfRiders = await getStartListComingGames(params);

      const { currentTeams, teamCards: teamCardIds } = filterOptions;
      const teamCards = _.filter(items, (item) =>
        _.includes(teamCardIds, item.id)
      );

      return <FilterCardOption>{
        ...cardFilter,
        currentTeams: _.map(
          _.filter(currentTeams, (team) => !_.isEmpty(team)),
          (item) => ({
            value: item,
            label: item,
          })
        ),
        teamCards: teamCards.map((item) => ({
          value: item.id,
          label: item.name,
        })),
        nationalities: filterOptions.nationalities.map((nationality) => {
          const foundCountry = (
            locale === 'en' ? COUNTRIES : COUNTRIES_FR
          ).find(
            (country) =>
              country.code.toLowerCase() === nationality.toLowerCase()
          );
          return {
            value: nationality,
            label: _.get(foundCountry, 'name', nationality.toUpperCase()),
          };
        }),
        yearOfEditions: filterOptions.yearOfEditions.map((yearOfEdition) => {
          return {
            value: `${yearOfEdition}`,
            label: `${yearOfEdition}`,
          };
        }),
        startListOfRiders: _.map(startListOfRiders, (item) => ({
          label: _.get(item, 'name', ''),
          value: _.get(item, '_id', item.name || ''),
          riderIds: _.get(item, 'riderIds', []),
        })),
      };
    }
  );
};

export const useGetCardsMyTeam = (params?: FilterCardRequest) => {
  return useQuery([API_PATH.GET_MY_NFTS, params], async () => {
    const res = await getMyNfts({
      page: 1,
      limit: Number.MAX_SAFE_INTEGER,
      ...params,
    });

    const items = await getAvgCapScoreAndBonus({ items: res.items });

    return {
      ...res,
      items,
    };
  });
};

export const useGetUniqueRarityCard = () => {
  return useQuery(API_PATH.GET_UNIQUE_RARITY_CARD, getUniqueRarityCard);
};

export const useGetNftsByUser = (
  id: string,
  params?: FilterCardRequest & { marketType?: MarketType[] }
) => {
  const key = 'GET_NFT_BY_USER';
  return useQuery(
    [key, id, { ...params }],
    async () => {
      const res = await getNftsByUser(id, {
        page: 1,
        limit: FILTER_LIMIT,
        ...params,
      });
      const items = await getAvgCapScoreAndBonus({ items: res.items });
      return {
        ...res,
        items,
      };
    },
    {
      enabled: !!id,
    }
  );
};

export const useGetWhiteCards = (params: Pagination) => {
  return useQuery([API_PATH.GET_WHITE_CARDS, { ...params }], () =>
    getWhiteCards(params)
  );
};

export const useGetNftsByRider = (
  params: FilterCardRequest & { riderId: string; marketType?: MarketType[] }
) => {
  return useQuery(
    [API_PATH.GET_NFTS_BY_RIDER, { ...params }],
    async () => {
      const res = await getNftsByRider(params);
      const items = await getAvgCapScoreAndBonus({
        items: _.map(res.items, (item) => ({
          ...item,
          riderId: params.riderId,
          rider: { id: params.riderId },
        })),
      });
      return {
        ...res,
        items,
      };
    },
    { enabled: !!params?.riderId }
  );
};

export const useTransferXpToNft = () => {
  const queryClient = useQueryClient();
  const toast = useToastMessage();
  const { t } = useTranslation();

  return useMutation(transferXpToNft, {
    onSuccess: (res) => {
      toast({
        title: t('success'),
        description: t('message:transfer_xp_success'),
        status: 'success',
      });
      queryClient.invalidateQueries([API_PATH.USER_PROFILE]);
      queryClient.invalidateQueries([API_PATH.GET_MY_NFTS]);
      queryClient.invalidateQueries(['/nfts', _.get(res, 'id')]);
    },
  });
};

export const useCheckGameNftSale = () => {
  return useMutation(checkGameNftSale);
};

export const useRemoveTeam = () => {
  return useMutation(removeTeam);
};

export const useGetRiderInfo = (id: string) => {
  return useQuery([API_PATH.GET_RIDER_INFO, id], () => getRiderInfo(id), {
    enabled: !!id,
  });
};

export const useGetMyFreeCards = () => {
  return useQuery(
    [API_PATH.GET_MY_FREE_CARDS],
    async () => {
      let res = null;
      res = await getMyFreeCards();

      if (_.isEmpty(res)) {
        res = await generateMyFreeCards();
        res = await getMyFreeCards();
      }

      const freeCards = _.map(_.get(res, 'freeCards', []), (item: any) => ({
        ...item,
        pool: _.map(_.get(item, 'pool', []), (card) => ({
          riderId: {
            ..._.get(card, 'riderId'),
            capScore: {
              averageCapScore: _.get(card, 'riderId.averageCapScore'),
            },
            bonus: {
              bonus: 0,
            },
          },
        })),
      }));

      const status = _.get(res, 'status', '');

      return {
        freeCards,
        status,
      };
    },
    { refetchOnWindowFocus: false }
  );
};

export const useTakeFreeCard = () => {
  return useMutation(takeFreeCard);
};

export const useClaimFreeCards = () => {
  const { t } = useTranslation();
  const toast = useToastMessage();
  return useMutation(claimFreeCards, {
    onSuccess: () => {
      toast({
        status: 'success',
        description: t('message:claim_free_cards_success'),
      });
      setTimeout(() => {
        navigateTo(PATH.MY_TEAM);
      }, 2000);
    },
  });
};

export const useAutoTakeFreeCard = () => {
  return useMutation(autoTakeFreeCards);
};

export const useGetTimeoutToTransferFreeCard = () => {
  return useQuery(
    [API_PATH.GET_TIMEOUT_TO_TRANSFER_FREE_CARD],
    getTimeoutToTransferFreeCard
  );
};

export const useGenerateTransferFreeCard = () => {
  return useMutation(generateTransferFreeCard);
};

export const useTransferFreeCard = () => {
  const { t } = useTranslation();
  const toast = useToastMessage();
  return useMutation(transferFreeCard, {
    onSuccess: () => {
      toast({
        status: 'success',
        description: t('message:transfer_card_success'),
      });
      setTimeout(() => {
        navigateTo(PATH.MY_TEAM);
      }, 2000);
    },
  });
};

export const useFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation(favoriteCard, {
    onSuccess: () => {
      queryClient.invalidateQueries([API_PATH.GET_CARD]);
      queryClient.invalidateQueries([API_PATH.GET_MY_FAVORITE_CARDS]);
      queryClient.invalidateQueries([API_PATH.GET_FAVORITE_RIDER_IDS]);
    },
  });
};

export const useUnfavorite = () => {
  const queryClient = useQueryClient();
  return useMutation(unfavoriteCard, {
    onSuccess: () => {
      queryClient.invalidateQueries([API_PATH.GET_CARD]);
      queryClient.invalidateQueries([API_PATH.GET_MY_FAVORITE_CARDS]);
      queryClient.invalidateQueries([API_PATH.GET_FAVORITE_RIDER_IDS]);
    },
  });
};

export const useGetMyFavoriteCards = (params: Pagination) => {
  return useQuery([API_PATH.GET_MY_FAVORITE_CARDS, { ...params }], () =>
    getMyFavoriteCards(params)
  );
};

export const useGetFavoriteRiderIds = () => {
  return useQuery([API_PATH.GET_FAVORITE_RIDER_IDS], getFavoriteRiderIds);
};

export const useGetNftsSale = (params: NfrSaleRequestParams, options = {}) => {
  return useQuery(
    [API_PATH.GET_CARD_SALE, { ...params }],
    async () => await getNftsSale(params),
    { enabled: !!params?.riderId, ...options }
  );
};

export const useGetNftBids = (params: NfrBidRequestParams, options = {}) => {
  return useQuery(
    [API_PATH.GET_CARD_BIDS, { ...params }],
    async () => await getNftsBids(params),
    { enabled: !!params?.nftId, ...options }
  );
};

export const useCountByRarity = (userId?: string) => {
  return useQuery([API_PATH.COUNT_BY_RATIRY, userId], async () => {
    const data = await countByRariry(userId);
    const list = {
      blue: _.get(data, 'blue', 0),
      pink: _.get(data, 'pink', 0),
      yellow: _.get(data, 'yellow', 0),
      white: _.get(data, 'white', 0),
    };

    return list;
  });
};
