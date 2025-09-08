import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';

import { FilterContext } from '.';

import { DropdownCollapse } from '@/components/Common';
import { CheckBoxGroupInput } from '@/components/Inputs';

const InStartlistOf = () => {
  const { startListOfRiders, control } = useContext(FilterContext);
  return (
    <DropdownCollapse header="in_start_list_of" defaultOpen={false}>
      <Controller
        control={control}
        name="inStartlistOf"
        render={({ field }) => {
          return <CheckBoxGroupInput choices={startListOfRiders} {...field} />;
        }}
      />
    </DropdownCollapse>
  );
};

export default InStartlistOf;
