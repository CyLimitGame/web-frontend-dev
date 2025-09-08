import React from 'react';
import { useTranslation } from 'next-i18next';
import { Box } from '@chakra-ui/react';

import { BaseButton } from '@/components/Button';
import { CardItem as CardItemProps } from '@/typings/card';
import { useClaim } from '@/queries/useAuction';
import {
  AvgCapScoreAndBonus,
  CardAnimation,
  TextOneLine,
} from '@/components/Common';
import CardImageLoader from '@/components/Common/CardImageLoader';

type Props = {
  item: CardItemProps;
};

const AuctionWinningCard = ({ item }: Props) => {
  const { t } = useTranslation();

  const { mutate, isLoading } = useClaim();

  const handleClaim = () => {
    mutate(item.id);
  };

  return (
    <CardAnimation>
      <Box bg="gray.100" p={[2, 2, 3]} borderRadius="xl" transition="all .2s">
        <CardImageLoader src={item?.imageUrl} />
        <TextOneLine
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
          color="gray.900"
          maxW="200px"
          mt={4}
          value={item?.name}
        />
        <AvgCapScoreAndBonus item={item} />
        <Box textAlign="center" pt={4}>
          <BaseButton
            isLoading={isLoading}
            width="100%"
            variant="light"
            onClick={handleClaim}
          >
            {t('claim')}
          </BaseButton>
        </Box>
      </Box>
    </CardAnimation>
  );
};

export default AuctionWinningCard;
