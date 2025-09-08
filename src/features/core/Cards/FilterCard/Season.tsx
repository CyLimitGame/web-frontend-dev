import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';

import { FilterContext } from '.';

import { DropdownCollapse } from '@/components/Common';
import { CheckBoxGroupInput } from '@/components/Inputs';

const Season = () => {
  const { control, yearOfEditions } = useContext(FilterContext);
  return (
    <DropdownCollapse header="season" defaultOpen={false}>
      <Controller
        control={control}
        name="season"
        render={({ field }) => {
          return <CheckBoxGroupInput choices={yearOfEditions} {...field} />;
        }}
      />
    </DropdownCollapse>
  );
};

export default Season;
