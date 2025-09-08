import React from 'react';
import { Flex, Icon, FlexProps } from '@chakra-ui/react';
import { TbChevronsRight } from 'react-icons/tb';

import { Text } from '@/components/Common';
import { navigateToAllCards, navigateToMyTeam } from '@/utils/navigation';
import { FilterCardRequest } from '@/typings/request';

export enum Type {
  MARKET,
  MY_TEAM,
}

type Props = FlexProps & {
  color?: string;
  params?: FilterCardRequest;
  type?: Type;
};

const ViewAll = ({
  type = Type.MARKET,
  params,
  color = 'gray.900',
  ...props
}: Props) => {
  const hanldeClick = () => {
    if (type === Type.MARKET) {
      return navigateToAllCards(params);
    }
    return navigateToMyTeam(params);
  };

  return (
    <Flex alignItems="center" cursor="pointer" onClick={hanldeClick} {...props}>
      <Text color={color} translateText="view_all" fontWeight="medium" />
      <Icon as={TbChevronsRight} color={color} fontSize={24} />
    </Flex>
  );
};

export default ViewAll;
