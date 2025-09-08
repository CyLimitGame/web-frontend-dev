import { Box, Flex, Switch } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useContext } from 'react';
import _ from 'lodash';
import { Controller } from 'react-hook-form';

import { FilterContext } from '.';

import { DropdownCollapse, Text } from '@/components/Common';
import { BLUE_CARD, RED_CARD, YELLOW_CARD } from '@/constants/images';

const rarityOptions = [
  { image: BLUE_CARD, value: 'blue' },
  { image: RED_CARD, value: 'pink' },
  { image: YELLOW_CARD, value: 'yellow' },
];

type Props = {
  options?: any[];
  title?: string;
};

const Rarity = ({ options = rarityOptions, title }: Props) => {
  const { control } = useContext(FilterContext);
  return (
    <DropdownCollapse
      header={
        title || (
          <Flex justifyContent="space-between" w="100%">
            <Text translateText="only_my_favorite" textTransform="uppercase" />
            <Controller
              name="isFavorite"
              control={control}
              render={({ field }) => (
                <Switch {...field} isChecked={field.value} />
              )}
            />
          </Flex>
        )
      }
    >
      <>
        <Controller
          name="rarity"
          control={control}
          render={({ field: { onChange, name, value = [] } }) => (
            <Flex gap={2}>
              {_.map(options, ({ image, value: itemValue }) => (
                <Box
                  p={1}
                  border="1px solid"
                  borderColor={
                    _.includes(value, itemValue) ? 'white' : 'transparent'
                  }
                  borderRadius="md"
                  key={itemValue}
                  transition="border-color .2s"
                >
                  <Box
                    pos="relative"
                    width="26px"
                    height="40px"
                    overflow="hidden"
                    borderRadius="sm"
                    cursor="pointer"
                    onClick={() => {
                      const result = _.includes(value, itemValue)
                        ? _.filter(value, (item) => item !== itemValue)
                        : [...value, itemValue];
                      onChange({ target: { value: result, name } });
                    }}
                  >
                    <Image src={image} layout="fill" />
                  </Box>
                </Box>
              ))}
            </Flex>
          )}
        />
      </>
    </DropdownCollapse>
  );
};

export default Rarity;
