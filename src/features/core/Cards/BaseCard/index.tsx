import { Box, BoxProps, Tooltip } from '@chakra-ui/react';
import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import { AvgCapScoreAndBonus, CardImageLoader } from '@/components/Common';
import { NO_CARD } from '@/constants/images';

type Props = BoxProps & {
  data: any;
  isShowPrice?: boolean;
};

const BaseCard = ({ data, isShowPrice, ...props }: Props) => {
  const { t } = useTranslation();
  const rarity = _.get(data, 'rarity');
  const imageUrl = _.get(
    data,
    rarity === 'na' ? 'rider.imageUrl' : 'imageUrl',
    NO_CARD
  );
  const fixedPrice = _.get(data, 'fixedPrice', 0);
  return (
    <Box {...props}>
      <Tooltip
        label={isShowPrice ? t('price_value', { value: fixedPrice }) : null}
      >
        <span>
          <CardImageLoader src={imageUrl} />
        </span>
      </Tooltip>
      <Box mt={2}>
        <AvgCapScoreAndBonus item={data} />
      </Box>
    </Box>
  );
};

export default BaseCard;
