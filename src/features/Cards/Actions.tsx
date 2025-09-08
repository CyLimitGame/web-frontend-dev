import React, { ReactNode, useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import _ from 'lodash';

import ActionWrapper from './components/ActionWrapper';
import Owner from './Owner';

import SellCardForm from '@/features/core/Cards/SellCardForm';
import { CancelListingButton, PlaceABidButton } from '@/features/core/Button';
import { AuctionCard } from '@/typings/auction';
import { getPrice } from '@/utils/card';
import { MarketType } from '@/typings/card.enum';
import { BuyButton } from '@/features/core/Button';
import { UserProfileForm } from '@/typings/user';
import { formatPrice } from '@/utils/number';

type Props = {
  item: AuctionCard;
  isDisableBid?: boolean;
  userInfo?: UserProfileForm;
  onSuccess?: () => void;
};

const Actions = ({ item, isDisableBid, userInfo, onSuccess }: Props) => {
  const ownerId = _.get(item, 'ownerId');
  const userId = _.get(userInfo, 'id');

  const actionForm = useMemo(() => {
    if (!item || !userInfo) return null;
    const isOwner = userInfo?.id === item?.ownerId;
    switch (item.marketType) {
      case MarketType.AUCTION:
        return (
          <ActionWrapper title="current_price" tooltip="current_price">
            <Box
              flex="1"
              borderRadius="10px"
              px={[2, 2, 4]}
              py={[2, 2, 4]}
              backgroundColor="whiteAlpha.160"
            >
              {getPrice(item)} $
            </Box>
            <PlaceABidButton
              item={item}
              isDisabled={isDisableBid}
              size={['sm', 'lg']}
            />
          </ActionWrapper>
        );
      case MarketType.FIXED: {
        let button = null;
        if (isOwner) {
          button = (
            <CancelListingButton
              id={item?.id}
              isDisabled={item?.isLocked}
              size={['sm', 'lg']}
              onSuccess={onSuccess}
            />
          );
        } else {
          button = <BuyButton item={item} size={['sm', 'lg']} />;
        }
        return (
          <ActionWrapper title="current_price" tooltip="current_price">
            <Box
              flex="1"
              borderRadius="10px"
              px={[2, 2, 4]}
              py={[2, 2, 4]}
              backgroundColor="whiteAlpha.160"
            >
              {formatPrice(item?.fixedPrice)} $
            </Box>
            {button}
          </ActionWrapper>
        );
      }
      case MarketType.OWNER: {
        if (item.rarity === 'white' || userId !== ownerId) return null;
        return (
          <SellCardForm
            wrapperForm={({ children }: { children: ReactNode }) => (
              <ActionWrapper title="sell_my_card" tooltip="sell_my_card">
                {children}
              </ActionWrapper>
            )}
            id={item?._id}
            transferStatus={item?.transferStatus}
            onSuccess={onSuccess}
            item={item}
          />
        );
      }
      default:
        return null;
    }
  }, [item, userInfo, onSuccess]);

  return (
    <React.Fragment>
      {actionForm}
      <Owner item={item} />
    </React.Fragment>
  );
};

export default Actions;
