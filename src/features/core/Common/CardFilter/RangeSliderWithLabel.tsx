import React, { useEffect, useState } from 'react';
import {
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  RangeSliderProps,
} from '@chakra-ui/react';

import { Text } from '@/components/Common';
import useParamsQuery from '@/hooks/useGetParams';

type Props = RangeSliderProps & {
  label: string;
  name: string;
};

const RangeSliderWithLabel = ({ label, name, ...props }: Props) => {
  const { defaultValue } = props;
  const { getParamsWithLocation } = useParamsQuery();
  const [values, setValues] = useState<number[] | undefined>(defaultValue);

  const handleChange = (values: number[]) => {
    setValues(values);
  };

  useEffect(() => {
    setValues(getParamsWithLocation()[name] || defaultValue);
  }, []);

  return (
    <React.Fragment>
      <Flex justifyContent="space-between" mb={4}>
        <Text translateText={label} color="gray.400" />
        <Text color="gray.400">
          {`${values && values[0]} - ${values && values[1]}`}
        </Text>
      </Flex>
      <RangeSlider
        aria-label={['min', 'max']}
        colorScheme="primary"
        value={values}
        onChange={handleChange}
        {...props}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} bg="primary.500" />
        <RangeSliderThumb index={1} bg="primary.500" />
      </RangeSlider>
    </React.Fragment>
  );
};

export default RangeSliderWithLabel;
