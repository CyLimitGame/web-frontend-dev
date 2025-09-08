import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { Center, Flex, FlexProps, Stack, Tooltip } from '@chakra-ui/react';
import Image from 'next/image';

import Text from '../Text';
import Circle from '../Circle';

import { HEXAGON } from '@/constants/images';
import { fixedNumber } from '@/utils/common';

type Props = FlexProps & {
  item: any;
  isShowBonus?: boolean;
  isShowAvg?: boolean;
  isShowDetail?: boolean;
  type?: 'circle' | 'hexagon';
};

const getColor = (value: number) => {
  if (value > 0) {
    return 'success.500';
  }
  if (value < 0) {
    return 'error.500';
  }
  return 'white';
};

const AvgCapScoreAndBonus = ({
  item,
  isShowBonus = true,
  isShowDetail = true,
  type = 'hexagon',
  isShowAvg = true,
  ...props
}: Props) => {
  const { t } = useTranslation();
  const averageCapScoreValue = _.get(item, 'capScore.averageCapScore', 0);
  const averageCapScore =
    typeof averageCapScoreValue === 'number'
      ? fixedNumber(averageCapScoreValue, 0)
      : averageCapScoreValue;

  const bonusValue = _.get(item, 'bonus.bonus');
  const bonus =
    typeof bonusValue === 'number'
      ? Number(bonusValue || 0).toFixed(1)
      : bonusValue;
  const bonusDetails = _.get(item, 'bonus.details', {});

  return (
    <Flex gap={1} justifyContent="center" alignItems="center" {...props}>
      {isShowAvg && type === 'circle' && <Circle>{averageCapScore}</Circle>}
      {isShowAvg && type === 'hexagon' && (
        <Tooltip label={isShowDetail ? t('avg_cap_score') : null}>
          <Flex pos="relative">
            <Image src={HEXAGON} width="32px" height="32px" />
            <Center pos="absolute" left={0} right={0} top={0} bottom={0}>
              <Text fontWeight="bold">{averageCapScore}</Text>
            </Center>
          </Flex>
        </Tooltip>
      )}
      {isShowBonus && (
        <Tooltip
          label={
            !_.isEmpty(bonusDetails) && isShowDetail ? (
              <Stack spacing={0}>
                {_.map(_.omitBy(bonusDetails, _.isUndefined), (value, key) => (
                  <Flex key={key} gap={2}>
                    <Text>{t(key)}</Text>
                    <Text color={getColor(value)} fontWeight="bold">
                      {`${value >= 0 ? '+' : ''}${value}%`}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            ) : null
          }
        >
          <Text fontWeight="bold" bg="input" px={3} borderRadius="2xl">
            {bonus}%
          </Text>
        </Tooltip>
      )}
    </Flex>
  );
};

export default AvgCapScoreAndBonus;
