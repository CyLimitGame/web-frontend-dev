import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import Card from './Card';

import { BaseButton } from '@/components/Button';
import { useAffiliateClaimReward } from '@/queries/useAffiliate';
import { AffiliateReward } from '@/typings/affiliate';

type Props = {
  data?: AffiliateReward;
};

const NftRewards = ({ data }: Props) => {
  const { t } = useTranslation();
  const [numberFlip, setNumberFlip] = useState(0);
  const [id, setId] = useState('');

  const { mutate, isLoading } = useAffiliateClaimReward();

  const handleFlip = () => {
    setNumberFlip((current) => current + 1);
  };

  const handleClaim = () => {
    mutate({ nftId: id, rewardId: data?.id as string });
  };

  return (
    <Box>
      <Flex gap={4} justifyContent="center" flexWrap="wrap">
        {_.map(data?.rewardNfts, (item, index) => (
          <Card
            item={{
              value: item.imageUrl,
              ...item,
            }}
            onFlip={handleFlip}
            onSelect={() =>
              numberFlip === _.size(data?.rewardNfts)
                ? setId(item._id)
                : undefined
            }
            delay={(index + 1) * 0.1}
            isSelected={id === item._id}
          />
        ))}
      </Flex>
      <Flex justifyContent="center" mt={5}>
        <BaseButton
          isDisabled={!id}
          onClick={handleClaim}
          isLoading={isLoading}
        >
          {t('claim')}
        </BaseButton>
      </Flex>
    </Box>
  );
};

export default NftRewards;
