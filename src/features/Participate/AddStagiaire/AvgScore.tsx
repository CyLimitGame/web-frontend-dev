import React from 'react';
import { useController } from 'react-hook-form';
import { Box, Flex, Input } from '@chakra-ui/react';
import _ from 'lodash';

import { RangeSliderInput } from '@/components/Inputs';

const extractInteger = (str: string) => {
  const numericStr = _.replace(str, /[^0-9]/g, '');
  const value = parseInt(numericStr, 10) || 0;
  return value > 100 ? 100 : value;
};

type Props = {
  control: any;
};

const AvgScore = ({ control }: Props) => {
  const { field } = useController({ control, name: 'avgCapScores' });

  const handleChange = (value: string, type: 'min' | 'max') => {
    const min = _.get(field.value, '[0]', 0);
    const max = _.get(field.value, '[1]', 0);

    if (type === 'min') {
      field.onChange({
        target: {
          value: [
            extractInteger(value) > max ? max : extractInteger(value),
            max,
          ],
        },
      });
    }

    if (type === 'max') {
      field.onChange({
        target: {
          value: [
            min,
            extractInteger(value) < min ? min : extractInteger(value),
          ],
        },
      });
    }
  };

  return (
    <Box>
      <Flex justifyContent="space-between" mb={2}>
        <Input
          style={{ width: 50 }}
          size="xs"
          placeholder="min"
          value={_.get(field.value, '[0]', 0)}
          onChange={(e) => handleChange(e.target.value, 'min')}
        />
        <Input
          style={{ width: 50 }}
          size="xs"
          placeholder="max"
          value={_.get(field.value, '[1]', 0)}
          onChange={(e) => handleChange(e.target.value, 'max')}
        />
      </Flex>
      <RangeSliderInput
        variant="hexagon"
        name="avgCapScores"
        control={control}
        min={0}
        max={100}
      />
    </Box>
  );
};

export default AvgScore;
