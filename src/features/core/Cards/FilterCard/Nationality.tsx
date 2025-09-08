import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';

import { FilterContext } from '.';

import { DropdownCollapse } from '@/components/Common';
import { CheckBoxGroupInput } from '@/components/Inputs';

const Nationality = () => {
  const { nationalities, control } = useContext(FilterContext);
  return (
    <DropdownCollapse header="nationality" defaultOpen={false}>
      <Controller
        control={control}
        name="nationality"
        render={({ field }) => {
          return <CheckBoxGroupInput choices={nationalities} {...field} />;
        }}
      />
    </DropdownCollapse>
  );
};

export default Nationality;
