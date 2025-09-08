import React from 'react';
import styled from '@emotion/styled';
import { Box, Flex, BoxProps } from '@chakra-ui/react';

import Loader from '../Loader';

import colors from '@/theme/foundations/colors';

type Props = BoxProps & {
  children: React.ReactNode;
  isLoading?: boolean;
};

const ScrollHorizontal = ({ children, isLoading, ...props }: Props) => {
  return (
    <Wrapper {...props}>
      <Flex p={4} gap={4} float="left" mx="auto">
        {isLoading ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            py={10}
            w="100%"
            height="100%"
            position="absolute"
            top={0}
            bottom={0}
          >
            <Loader />
          </Flex>
        ) : (
          children
        )}
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  position: relative;
  width: 100%;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 8px;
  }

  :hover {
    &::-webkit-scrollbar {
      background: ${colors.gray[300]};
    }
    &::-webkit-scrollbar-thumb {
      background: ${colors.gray[400]};
    }
  }
`;

export default ScrollHorizontal;
