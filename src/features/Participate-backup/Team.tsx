import React, { ReactElement } from 'react';
import {
  Box,
  Flex,
  Icon,
  Image,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { BsPersonPlusFill } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import _ from 'lodash';

import { CardItem } from '@/typings/card';
import { DataGridWithFlex, Text } from '@/components/Common';
import { NO_CARD } from '@/constants/images';
import { MAP_ROLES } from '@/constants/common';
import colors from '@/theme/foundations/colors';

type Props = {
  data: CardItem[];
  onRemove: (id: string) => void;
  indexSelected: number;
  onClick: (index: number) => void;
  footer: () => ReactElement;
};

type InfoProps = {
  item: CardItem;
  children: any;
};

const Info = ({ item, children }: InfoProps) => {
  return (
    <Tooltip
      label={
        <Box>
          <Text translateText={item.name} />
          {item.status && (
            <Text
              translateText={
                MAP_ROLES[_.get(item, 'role', '') as keyof typeof MAP_ROLES]
              }
            />
          )}
        </Box>
      }
    >
      {children}
    </Tooltip>
  );
};

const Team = ({ data, onRemove, indexSelected, onClick, footer }: Props) => {
  const gap = useBreakpointValue({
    base: '8px',
    sm: '8px',
    md: '12px',
  });

  return (
    <Box
      pos="fixed"
      bg="white"
      shadow="-2px -8px 35px 1px rgba(167,167,167,0.36)"
      bottom={0}
      left={0}
      right={0}
      zIndex="dropdown"
      borderTopLeftRadius="2xl"
      borderTopRightRadius="2xl"
      p={4}
      borderBottom="none"
    >
      <Flex
        justifyContent="space-between"
        flexDirection="column"
        maxW="400px"
        mx="auto"
      >
        <Box>
          <DataGridWithFlex
            columns={_.size(data)}
            spacing={gap as string}
            data={data}
            renderItem={(item, index) => (
              <Info item={item}>
                <Box
                  sx={{ aspectRatio: '1' }}
                  bg="gray.300"
                  borderRadius="xl"
                  cursor="pointer"
                  pos="relative"
                  boxShadow={`0 0 0 2px ${
                    indexSelected === index
                      ? colors.success['500']
                      : 'transparent'
                  }`}
                  _hover={{
                    boxShadow: `0 0 0 2px ${colors.success['500']}`,
                  }}
                  onClick={() => onClick(index)}
                >
                  <Icon
                    as={TiDelete}
                    fontSize="2xl"
                    pos="absolute"
                    background="white"
                    borderRadius="2xl"
                    p={0}
                    right={-2}
                    top={-2}
                    className="delete-icon"
                    display={item.status ? 'block' : 'none'}
                    cursor="pointer"
                    onClick={() => onRemove(item.id as string)}
                  />
                  {item.status ? (
                    <Box
                      overflow="hidden"
                      w="100%"
                      h="100%"
                      borderRadius="xl"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src={item.imageUrl || NO_CARD}
                        objectFit="cover"
                        w="100%"
                        maxH="100%"
                        margin="auto"
                      />
                    </Box>
                  ) : (
                    <Flex
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      h="100%"
                    >
                      <Icon
                        as={BsPersonPlusFill}
                        color="gray.500"
                        fontSize="2xl"
                      />
                      <Text
                        fontSize={['xs', 'xs', 'sm']}
                        fontWeight="bold"
                        color="gray.500"
                        textAlign="center"
                      >
                        {item.acronym}
                      </Text>
                    </Flex>
                  )}
                </Box>
              </Info>
            )}
          />
        </Box>
        <Box>{footer()}</Box>
      </Flex>
    </Box>
  );
};

export default Team;
