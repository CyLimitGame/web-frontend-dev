import React, { useContext } from 'react';

import { FilterContext } from '.';

import { DropdownCollapse } from '@/components/Common';
import { RangeSliderInput } from '@/components/Inputs';

const Age = () => {
  const { control } = useContext(FilterContext);
  return (
    <DropdownCollapse header="age">
      <RangeSliderInput control={control} name="age" />
    </DropdownCollapse>
  );
};

export default Age;
