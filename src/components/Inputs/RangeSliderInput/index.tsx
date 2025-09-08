import React from 'react';
import {
  Box,
  Flex,
  Icon,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderProps,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react';

import _ from 'lodash';

import { Control, useController } from 'react-hook-form';

import { Text } from '@/components/Common';
import HexagonIcon from '@/icons/HexagonIcon';

type Variant = 'hexagon' | 'rectangle';

export type RangeSliderInputProps = Omit<RangeSliderProps, 'onChange'> & {
  variant?: Variant;
  name: string;
  control: Control;
};

const RangeSliderInput = ({
  variant = 'rectangle',
  name,
  control,
  ...props
}: RangeSliderInputProps) => {
  const { field } = useController({
    control,
    name,
  });
  const { onChange, value } = field;
  const handleChange = (values: number[]) => {
    onChange({ target: { value: values, name } });
  };
  return (
    <Flex gap={4}>
      <Text>{_.get(value, '[0]', 0)}</Text>
      <RangeSlider
        aria-label={['min', 'max']}
        {...props}
        onChange={handleChange}
        value={value}
      >
        <RangeSliderTrack bg="gray.500">
          <RangeSliderFilledTrack bg="error.400" />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} bg="transparent" shadow="none !important">
          {variant === 'hexagon' && <Icon as={HexagonIcon} fontSize="2xl" />}
          {variant === 'rectangle' && (
            <Box
              width="10px"
              height="30px"
              bg="background.default"
              border="1px solid white"
            />
          )}
        </RangeSliderThumb>
        <RangeSliderThumb index={1} bg="transparent" shadow="none !important">
          {variant === 'hexagon' && <Icon as={HexagonIcon} fontSize="2xl" />}
          {variant === 'rectangle' && (
            <Box
              width="10px"
              height="30px"
              bg="background.default"
              border="1px solid white"
            />
          )}
        </RangeSliderThumb>
      </RangeSlider>
      <Text>{_.get(value, '[1]', 0)}</Text>
    </Flex>
  );
};

export default RangeSliderInput;
