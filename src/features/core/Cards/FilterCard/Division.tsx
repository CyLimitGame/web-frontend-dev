import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';

import { FilterContext } from '.';

import { DropdownCollapse } from '@/components/Common';
import { CheckBoxGroupInput } from '@/components/Inputs';

const Division = () => {
  const { typeOfCard, control } = useContext(FilterContext);
  return (
    <DropdownCollapse header="division_field" defaultOpen={false}>
      <Controller
        control={control}
        name="typeOfCard"
        render={({ field }) => {
          return <CheckBoxGroupInput choices={typeOfCard} {...field} />;
        }}
      />
    </DropdownCollapse>
  );
};

export default Division;
