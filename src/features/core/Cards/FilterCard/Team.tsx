import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';

import { FilterContext } from '.';

import { DropdownCollapse } from '@/components/Common';
import { CheckBoxGroupInput } from '@/components/Inputs';

const Team = () => {
  const { control, teamCards } = useContext(FilterContext);
  return (
    <DropdownCollapse header="team_card" defaultOpen={false}>
      <Controller
        control={control}
        name="team"
        render={({ field }) => {
          return <CheckBoxGroupInput choices={teamCards} {...field} />;
        }}
      />
    </DropdownCollapse>
  );
};

export default Team;
