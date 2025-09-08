import React, { useContext } from 'react';
import { Box, Flex, Input } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import _ from 'lodash';

import { FilterContext } from '.';

import { DropdownCollapse } from '@/components/Common';
import { RangeSliderInput } from '@/components/Inputs';

type Props = {
  min?: number;
};

const extractInteger = (str: string) => {
  const numericStr = _.replace(str, /[^0-9]/g, '');
  const value = parseInt(numericStr, 10) || 0;
  return value > 300 ? 300 : value;
};

const SerialNumber = ({ min = 1 }: Props) => {
  const { control } = useContext(FilterContext);
  const { field } = useController({ control, name: 'serialNumber' });

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
    <DropdownCollapse header="serial_number">
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
          min={min}
          max={300}
          control={control}
          name="serialNumber"
        />
      </Box>
    </DropdownCollapse>
  );
};

export default SerialNumber;
