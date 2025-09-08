import {
  ComponentWithAs,
  Flex,
  FlexProps,
  Icon,
  IconProps,
} from '@chakra-ui/react';

import League1Icon from '@/icons/MyTeam/League1';
import League4Icon from '@/icons/MyTeam/League4';
import League3Icon from '@/icons/MyTeam/League3';
import League2Icon from '@/icons/MyTeam/League2';
import { ObjectType } from '@/typings/common';
import { Text } from '@/components/Common';

const Leagues: ObjectType<{
  color: string;
  Icon: ComponentWithAs<'svg', IconProps>;
}> = {
  league_1: {
    color: 'linear-gradient(90deg, #FFAE63 0%, #FCFF63 100%)',
    Icon: League1Icon,
  },
  league_2: {
    color: 'linear-gradient(90deg, #F25A6D 0%, #E1954E 100%)',
    Icon: League2Icon,
  },
  league_3: {
    color: 'linear-gradient(90deg, #1767C8 0%, #4CCFDD 100%)',
    Icon: League3Icon,
  },
  league_4: {
    color: 'linear-gradient(90deg, #A6A6A6 0%, #FFF 100%)',
    Icon: League4Icon,
  },
};

type Props = FlexProps & {
  league: string;
};

const League = ({ league, ...rest }: Props) => {
  const key = league.trim().toLowerCase().replaceAll(/\s+/g, '_');
  const data = Leagues[key] || Leagues.league_4;

  return (
    <Flex
      borderRadius="md"
      textTransform="uppercase"
      fontSize={['12px', '14px']}
      verticalAlign="middle"
      backgroundImage={data.color}
      py={['4px', '6px']}
      px={['8px', '12px']}
      display="inline-flex"
      {...rest}
    >
      <Text whiteSpace="nowrap">{league}</Text>
      <Icon as={data.Icon} ml="8px" w={['16px', '20px']} h={['16px', '20px']} />
    </Flex>
  );
};

export default League;
