import React from 'react';
import { Icon, Tooltip } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import {
  useFavorite,
  useGetFavoriteRiderIds,
  useUnfavorite,
} from '@/queries/useCard';
import { Loader } from '@/components/Common';

type Props = {
  riderId: string;
};

const Favorite = ({ riderId }: Props) => {
  const { t } = useTranslation();
  const { data } = useGetFavoriteRiderIds();

  const { mutate: favorite, isLoading: isLoadingFavorite } = useFavorite();
  const { mutate: unFavorite, isLoading: isLoadingUnFavorite } =
    useUnfavorite();

  const handleFavorite = () => {
    if (_.includes(data, riderId)) {
      return unFavorite(riderId);
    }
    return favorite(riderId);
  };

  if (isLoadingFavorite || isLoadingUnFavorite) {
    return <Loader size="md" />;
  }

  return (
    <Tooltip
      label={t(_.includes(data, riderId) ? 'unfavorite' : 'favorite')}
      hasArrow
    >
      <span>
        <motion.button whileTap={{ scale: 2 }}>
          <Icon
            as={AiFillHeart}
            fontSize="2xl"
            color={_.includes(data, riderId) ? 'cetaceanBlue.800' : 'gray.300'}
            onClick={(e) => {
              e.stopPropagation();
              handleFavorite();
            }}
          />
        </motion.button>
      </span>
    </Tooltip>
  );
};

export default Favorite;
