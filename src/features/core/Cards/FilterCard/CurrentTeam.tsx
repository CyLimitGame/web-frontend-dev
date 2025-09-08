import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';

import { FilterContext } from '.';

import { DropdownCollapse } from '@/components/Common';
import { CheckBoxGroupInput } from '@/components/Inputs';

const CurrentTeam = () => {
  const { currentTeams, control } = useContext(FilterContext);
  return (
    <DropdownCollapse header="current_team" defaultOpen={false}>
      <Controller
        control={control}
        name="currentTeam"
        render={({ field }) => {
          return <CheckBoxGroupInput choices={currentTeams} {...field} />;
        }}
      />
    </DropdownCollapse>
  );
};

export default CurrentTeam;
