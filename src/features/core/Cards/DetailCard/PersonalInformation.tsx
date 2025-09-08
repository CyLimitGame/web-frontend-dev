import React from 'react';
import { Box, Flex, Icon, Tooltip } from '@chakra-ui/react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import { MdOutlineInfo } from 'react-icons/md';

import { Text } from '@/components/Common';
import { NationalityField } from '@/features/core/Field';
import { CardItem } from '@/typings/card';
import { formatPrice } from '@/utils/number';

type ItemProps = {
  title: string;
  value: React.ReactNode;
  tooltip?: React.ReactNode;
};

const Item = ({ title, value, tooltip }: ItemProps) => {
  return (
    <Box position="relative">
      <Flex gap={1}>
        <Text
          translateText={title}
          fontSize={['xs', 'sm']}
          fontWeight="bold"
          color="gray.400"
        />
        {tooltip && (
          <Tooltip label={tooltip} hasArrow>
            <span>
              <Icon as={MdOutlineInfo} />
            </span>
          </Tooltip>
        )}
      </Flex>
      <Text textTransform="capitalize" fontSize={['sm', 'md']}>
        {value}
      </Text>
    </Box>
  );
};

type Props = {
  data: CardItem;
};

const PersonalInformation = ({ data }: Props) => {
  const { t } = useTranslation();
  const gender = _.get(data, 'gender', '-');
  const age = _.get(data, 'age', '-');
  const nationality = _.get(data, 'nationality', '-');
  const totalXp = _.get(data, 'totalXp', 0);
  const level = _.get(data, 'level', 0);
  const totalXpToNextLevel = _.get(data, 'totalXpToNextLevel', 0);
  const specialBonus = _.get(data, 'specialBonus.total', 0);
  const specialBonusDetails = _.get(data, 'specialBonus.details', []);

  // TODO refactor when have api get from actual team
  const team = _.get(data, 'team.name', '-');

  return (
    <Flex gap={2} justifyContent="space-between" flexWrap="wrap">
      <Item title="total_xp" value={formatPrice(totalXp)} />
      <Item
        title="level"
        value={level}
        tooltip={t('need_xp_to_level_up', { value: totalXpToNextLevel })}
      />
      <Item
        title="special_bonus"
        value={`${specialBonus}%`}
        tooltip={
          <Box>
            {_.map(specialBonusDetails, (detail, index) => (
              <Text key={index}>
                {`${t(_.get(detail, 'type'))}: ${_.get(detail, 'value')}%`}
              </Text>
            ))}
          </Box>
        }
      />
      <Item title="gender" value={gender} />
      <Item title="age" value={age} />
      <Item
        title="nationality"
        value={<NationalityField code={nationality as string} />}
      />
      <Item title="team" value={team} />
    </Flex>
  );
};

export default PersonalInformation;
