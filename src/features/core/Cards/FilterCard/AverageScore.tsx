import React, { useContext } from 'react';

import { FilterContext } from '.';

import { DropdownCollapse } from '@/components/Common';
import { RangeSliderInput } from '@/components/Inputs';

const AverageScore = () => {
  const { control } = useContext(FilterContext);
  return (
    <DropdownCollapse header="average_score">
      <RangeSliderInput
        control={control}
        name="averageCore"
        variant="hexagon"
      />
    </DropdownCollapse>
  );
};

export default AverageScore;
