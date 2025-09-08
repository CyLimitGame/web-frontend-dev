import qs from 'qs';
import _ from 'lodash';

import { API_PATH } from './api-path';

import { FilterCardRequest } from '@/typings/request';
import request from '@/utils/request';
import {
  Bonus,
  CardItem,
  GetAverageCapScoreParams,
  GetBonusParams,
  NfrSaleRequestParams,
  NfrBidRequestParams,
  RequestFilter,
  Sale,
  TakeFreeCard,
  TransferFreeCard,
  TransferFreeCardRequest,
  TransferXpToNft,
  CountByRariry,
} from '@/typings/card';
import {
  ListCardResponse,
  ListTeamResponse,
  GetFilterOptionsResponse,
} from '@/typings/response';
import { sanitizeRequestCards } from '@/utils/sanitize';
import { getParamsCardBonus, getRiderIds } from '@/utils/card';
import { MarketType } from '@/typings/card.enum';
import { ListResponse, Pagination } from '@/typings/common';
import { getTemplatePath } from '@/utils/string';
import { GetGameNftsRequest } from '@/typings/game';
import { NftBid } from '@/typings/auction';

export const getCards = (
  values: FilterCardRequest
): Promise<ListCardResponse> => {
  const requestParams = {
    ...values,
  };

  const query = qs.stringify(requestParams, {
    arrayFormat: 'indices',
  });

  return request.get(`${API_PATH.GET_CARD}?${query}`);
};

export const getCardDetail = (
  id: string,
  marketType: MarketType
): Promise<CardItem> => {
  return request.get(`${API_PATH.GET_CARD}/${id}`, {
    params: { marketType },
  });
};

export const getTeams = (): Promise<ListTeamResponse> => {
  return request.get(API_PATH.GET_TEAMS);
};

export const getFilterOptions = (
  params?: RequestFilter
): Promise<GetFilterOptionsResponse> => {
  return request.get(API_PATH.GET_CARD_FILTER_OPTIONS, { params });
};

export const getStartListComingGames = (params?: RequestFilter) => {
  return request.get(API_PATH.GET_START_LIST_COMING_GAMES, { params });
};

export const getCardsMyTeam = (
  values: FilterCardRequest
): Promise<ListCardResponse> => {
  const sanitizeRequest = sanitizeRequestCards(values);
  const query = qs.stringify(sanitizeRequest, {
    arrayFormat: 'indices',
  });

  return request.get(`${API_PATH.GET_CARD_MY_TEAM}?${query}`);
};

export const getUniqueRarityCard = (): Promise<ListCardResponse> => {
  return request.get(API_PATH.GET_UNIQUE_RARITY_CARD);
};

export const getMyNfts = (values: any): Promise<ListCardResponse> => {
  const rarity = _.get(values, 'rarity', []);
  const requestParams = {
    ...values,
    rarity: _.includes(rarity, 'white') ? [...rarity, 'na'] : rarity,
  };

  const query = qs.stringify(requestParams, {
    arrayFormat: 'indices',
  });

  return request.get(`${API_PATH.GET_MY_NFTS}?${query}`);
};

export const getWhiteCards = (
  params: Pagination
): Promise<ListResponse<CardItem>> => {
  return request.get(API_PATH.GET_WHITE_CARDS, {
    params: { ...params, rarity: 'white' },
  });
};

export const getNftsByRider = (
  params: FilterCardRequest & {
    riderId: string;
  }
): Promise<ListResponse<CardItem>> => {
  const URL = getTemplatePath(API_PATH.GET_NFTS_BY_RIDER, {
    riderId: params.riderId,
  });
  return request.get(URL, { params: { ...params } });
};

export const getNftsSale = (
  params: NfrSaleRequestParams
): Promise<ListResponse<Sale>> => {
  const URL = getTemplatePath(API_PATH.GET_CARD_SALE, params);
  return request.get(URL, { params: { ...params } });
};

export const getNftsBids = ({
  nftId,
  ...params
}: NfrBidRequestParams): Promise<ListResponse<NftBid>> => {
  const URL = getTemplatePath(API_PATH.GET_CARD_BIDS, { nftId });
  return request.get(URL, { params });
};

export const transferXpToNft = ({ nftId, xp }: TransferXpToNft) => {
  const URL = getTemplatePath(API_PATH.TRANSFER_XP_TO_NFT, { nftId });
  return request.post(URL, { xp });
};

export const getRiderRacesResult = (riderId: string): Promise<any> => {
  const URL = getTemplatePath(API_PATH.GET_RIDER_SCORES, { riderId });
  return request.get(URL);
};

export const checkGameNftSale = (
  nftId: string
): Promise<{ removeCard: boolean }> => {
  const URL = getTemplatePath(API_PATH.CHECK_GAME_NFT_SALES, { nftId });
  return request.get(URL);
};

export const removeTeam = (nftId: string) => {
  const URL = getTemplatePath(API_PATH.REMOVE_TEAM, { nftId });
  return request.post(URL);
};

export const getRiderInfo = (id: string) => {
  const URL = getTemplatePath(API_PATH.GET_RIDER_INFO, { id });
  return request.get(URL);
};

export const getMyFreeCards = () => {
  return request.get(API_PATH.GET_MY_FREE_CARDS);
};

export const generateMyFreeCards = () => {
  return request.post(API_PATH.GENERATE_MY_FEE_CARDS);
};

export const takeFreeCard = (data: TakeFreeCard) => {
  return request.post(API_PATH.TAKE_FEE_CARD, data);
};

export const claimFreeCards = () => {
  return request.post(API_PATH.CLAIM_FEE_CARDS);
};

export const autoTakeFreeCards = () => {
  return request.post(API_PATH.AUTO_TAKE_FEE_CARDS);
};

export const getTimeoutToTransferFreeCard = () => {
  return request.get(API_PATH.GET_TIMEOUT_TO_TRANSFER_FREE_CARD);
};

export const generateTransferFreeCard = (
  nftId: string
): Promise<{ swapFreeCards: TransferFreeCard[]; id: string }> => {
  const URL = getTemplatePath(API_PATH.GENERATE_TRANSFER_FREE_CARD, { nftId });
  return request.post(URL);
};

export const transferFreeCard = (body: TransferFreeCardRequest) => {
  const URL = getTemplatePath(API_PATH.TRANSFER_FREE_CARD, body);
  return request.post(URL);
};

export const getMyTraineeCards = ({
  gameId,
  ...params
}: GetGameNftsRequest): Promise<ListResponse<CardItem>> => {
  const URL = getTemplatePath(API_PATH.GET_MY_TRAINEE_CARDS, { id: gameId });
  return request.get(URL, {
    params: { ...params, status: status || undefined },
  });
};

export const favoriteCard = (riderId: string) => {
  const URL = getTemplatePath(API_PATH.FAVORITE_CARD, { riderId });
  return request.patch(URL);
};

export const unfavoriteCard = (riderId: string) => {
  const URL = getTemplatePath(API_PATH.UNFAVORITE_CARD, { riderId });
  return request.patch(URL);
};

export const getMyFavoriteCards = (
  params: Pagination
): Promise<ListCardResponse> => {
  return request.get(API_PATH.GET_MY_FAVORITE_CARDS, { params });
};

export const getFavoriteRiderIds = (): Promise<string[]> => {
  return request.get(API_PATH.GET_FAVORITE_RIDER_IDS);
};

export const getCardsBonus = (data: GetBonusParams): Promise<Bonus[]> => {
  return request.post(API_PATH.GET_CARDS_BONUS, data);
};

// TODO chang any
export const getCardsAverageCapScore = (
  data: GetAverageCapScoreParams
): Promise<any[]> => {
  return request.post(API_PATH.GET_CARDS_AVERAGE_CAP_SCORE, data);
};

// TODO chang any
export const getAvgCapScoreAndBonus = async ({
  items,
  gameTeamId,
}: {
  items: any;
  gameTeamId?: string;
}): Promise<any> => {
  const params = getParamsCardBonus(items, gameTeamId);
  const avgCapScoreParams = getRiderIds(items);

  const [cardsBonus, cardsAvgCapScore] = await Promise.all([
    getCardsBonus(params),
    getCardsAverageCapScore(avgCapScoreParams),
  ]);

  return _.map(items, (item) => ({
    ...item,
    bonus: _.find(cardsBonus, (bonus) => bonus.id === item.id),
    capScore: _.find(
      cardsAvgCapScore,
      (capScore) =>
        capScore.id ===
        _.get(item, item.rarity === 'trainee' ? 'id' : 'riderId')
    ),
  }));
};

export const countByRariry = (userId?: string): Promise<CountByRariry> => {
  return request.get(API_PATH.COUNT_BY_RATIRY, { params: { userId } });
};
