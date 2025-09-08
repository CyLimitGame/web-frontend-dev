import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { BaseButton } from '@/components/Button';
import spacing from '@/theme/foundations/space';
import { useClaimBundle } from '@/queries/useBundles';
import { BundleCard } from '@/typings/bundle';
import { CardAnimation, TextOneLine } from '@/components/Common';
import CardImageLoader from '@/components/Common/CardImageLoader';

const SPACING = spacing[3];
const COLUMN = 3;

type Props = {
  item: BundleCard;
};

const BundleWinningCard = ({ item }: Props) => {
  const { t } = useTranslation();

  const { mutate, isLoading } = useClaimBundle();

  const handleClaim = () => {
    mutate(item?.id);
  };

  return (
    <CardAnimation>
      <Box bg="gray.100" p={[2, 2, 3]} borderRadius="xl" transition="all .2s">
        <Flex
          flexWrap="wrap"
          marginLeft={`-${SPACING}`}
          marginTop={`-${SPACING}`}
          justifyContent="center"
          height="250px"
        >
          {item?.nfts?.map((card) => (
            <Box
              key={`bundle-${card?.id}`}
              width={`calc(100% / ${COLUMN} - ${SPACING})`}
              marginLeft={SPACING}
              marginTop={SPACING}
              borderRadius="xl"
              overflow="hidden"
            >
              <CardImageLoader src={card?.imageUrl} />
            </Box>
          ))}
        </Flex>
        <TextOneLine
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
          color="gray.900"
          mt={4}
          maxW="200px"
          value={item?.name}
        />
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

export default BundleWinningCard;
