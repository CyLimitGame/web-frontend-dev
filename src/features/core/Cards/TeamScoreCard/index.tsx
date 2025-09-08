import React from 'react';
import { Box, Flex, Stack, Tooltip, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import {
  ShowAnimation,
  TextOneLine,
  Text,
  Ribon,
  AvgCapScoreAndBonus,
} from '@/components/Common';
import CardImageLoader from '@/components/Common/CardImageLoader';
import { MAP_ROLES } from '@/constants/common';
import { NO_CARD } from '@/constants/images';
import { CardItem } from '@/typings/card';
import { formatPrice } from '@/utils/number';
import { GameRankingTeamsScore } from '@/typings/game';
import { BaseModal } from '@/components/Modal';

type Props = {
  item: CardItem;
  results?: GameRankingTeamsScore['results'];
};

const getItem = (id: string, results?: GameRankingTeamsScore['results']) => {
  const item = _.find(results, (item) => item.id === id);
  return item;
};

const TeamScoreCard = ({ item, results }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const isCaptain = _.get(getItem(item.id, results), 'isCaptain', false);

  const data = getItem(item.id, results);

  return (
    <ShowAnimation>
      <Box
        bg="gray.100"
        p={[2, 2, 3]}
        borderRadius="xl"
        transition="all .2s"
        pos="relative"
        overflow="hidden"
      >
        {isCaptain && <Ribon label="road_captain" />}
        <CardImageLoader src={item?.imageUrl || NO_CARD} />
        <TextOneLine
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
          color="gray.900"
          maxW="200px"
          margin="auto"
          mt={4}
          value={item?.name}
        />
        <AvgCapScoreAndBonus item={item} />
        <Box pos="relative">
          <Tooltip label={t('click_to_show_detail')}>
            <Text
              textAlign="center"
              color="error.400"
              _hover={{ color: 'error.500' }}
              fontWeight="bold"
              cursor="pointer"
              onClick={onOpen}
            >
              {formatPrice(_.get(getItem(item.id, results), 'point', 0))} points
            </Text>
          </Tooltip>
        </Box>
        <Text textAlign="center" fontWeight="bold" color="gray.400">
          {t(_.get(MAP_ROLES, `${item.role}`, ''))}
        </Text>
      </Box>
      <BaseModal
        closeable
        isOpen={isOpen}
        onClose={onClose}
        title={item?.name}
        size="xl"
      >
        <Stack>
          {_.map(_.get(data, 'points', []), (elm, index) => (
            <Flex justifyContent="space-between" key={index}>
              <Text>{t(_.get(elm, 'type'))}</Text>
              <Text>{formatPrice(_.get(elm, 'point', 0))}</Text>
            </Flex>
          ))}
        </Stack>
      </BaseModal>
    </ShowAnimation>
  );
};

export default TeamScoreCard;
