import React, { useEffect, useState } from 'react';
import {
  Box,
  Collapse,
  Flex,
  Stack,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FaCaretDown } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

import SwitchModeScore from './SwitchModeScore';

import { BaseModal } from '@/components/Modal';
import { Text } from '@/components/Common';
import { BaseModalProps } from '@/components/Modal/BaseModal';
import { fixedNumber } from '@/utils/common';
import { MatrixRole } from '@/typings/game.enum';

type Props = Omit<BaseModalProps, 'children'> & {
  item: any;
  defaultIsAcquired: boolean;
  isUsingLiveRanking: boolean;
  isGameInprogress: boolean;
};

type CollapseItemProps = {
  title: string;
  value: number | string;
  children: React.ReactElement;
};

const CollapseItem = ({ title, value, children }: CollapseItemProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box border="1px solid white" borderRadius="2xl">
      <Flex
        cursor="pointer"
        onClick={onToggle}
        fontWeight="bold"
        justifyContent="space-between"
        p={4}
        _hover={{ opacity: 0.5 }}
        userSelect="none"
      >
        <Flex alignItems="center" gap={2}>
          <Icon
            as={FaCaretDown}
            transform={isOpen ? 'rotate(180deg)' : 'rotate(0)'}
            transition="transform .2s"
          />
          <Text translateText={title} />
        </Flex>
        <Text color="yellow.500">{value}</Text>
      </Flex>
      <Collapse in={isOpen}>
        <Box p={4} pt={0}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};
const ViewScoreModal = ({
  item,
  defaultIsAcquired,
  isUsingLiveRanking,
  isGameInprogress,
  ...props
}: Props) => {
  const [isAcquired, setIsAcquired] = useState(defaultIsAcquired);
  const { t } = useTranslation();
  const cardId = _.get(item, 'card.id');
  const results = _.get(item, isAcquired ? 'acquiredResults' : 'results');
  const result = _.find(results, (elm) => elm.id === cardId);

  const points = _.get(result, 'points');
  const scores = _.filter(points, (elm) => !elm.isBonusType);
  const bonusScores = _.filter(points, (elm) => elm.isBonusType);

  const scoreByWinner = _.get(
    _.find(scores, (elm) => elm.type === MatrixRole.WINNER_OF_STAGE),
    'point',
    0
  );

  const scoreWithoutWinner = _.sumBy(
    _.filter(scores, (elm) => elm.type !== MatrixRole.WINNER_OF_STAGE),
    'point'
  );

  const score = _.min([100, _.max([scoreByWinner, scoreWithoutWinner])]);

  useEffect(() => {
    setIsAcquired(defaultIsAcquired);
  }, [defaultIsAcquired]);

  return (
    <BaseModal
      title={t('card_score_value', {
        value: fixedNumber(_.sumBy(bonusScores, 'point') + score),
      })}
      size="2xl"
      closeable
      {...props}
    >
      {isUsingLiveRanking && isGameInprogress && (
        <Box display="inline-flex" mb={5}>
          <SwitchModeScore isAcquired={isAcquired} onChange={setIsAcquired} />
        </Box>
      )}
      <Stack spacing={2}>
        <CollapseItem title="score" value={fixedNumber(score, 2)}>
          <Stack spacing={1}>
            {_.map(scores, (elm, index) => (
              <Flex key={index} justifyContent="space-between">
                <Text translateText={elm.type} />
                <Text>{fixedNumber(elm.point, 2)}</Text>
              </Flex>
            ))}
          </Stack>
        </CollapseItem>
        <CollapseItem
          title={t('bonus_score_value', {
            value: `${fixedNumber(_.sumBy(bonusScores, 'percent'), 1)}%`,
          })}
          value={fixedNumber(_.sumBy(bonusScores, 'point'), 2)}
        >
          <Stack spacing={1}>
            {_.map(bonusScores, (elm, index) => (
              <Flex key={index} justifyContent="space-between">
                <Flex gap={2}>
                  <Text translateText={elm.type} />
                  <Text>{`(${elm.percent || 0}%)`}</Text>
                </Flex>
                <Text>{fixedNumber(elm.point, 2)}</Text>
              </Flex>
            ))}
          </Stack>
        </CollapseItem>
      </Stack>
    </BaseModal>
  );
};

export default ViewScoreModal;
