import React from 'react';

import { Text } from '@/components/Common';
import League1Icon from '@/icons/MyTeam/League1';
import League2Icon from '@/icons/MyTeam/League2';
import League3Icon from '@/icons/MyTeam/League3';
import League4Icon from '@/icons/MyTeam/League4';

type LeagueIconProps = {
  name: string;
  isShowText?: boolean;
};

const LeagueIcon = ({ name, isShowText = true }: LeagueIconProps) => {
  switch (name) {
    case 'League 1':
      return <League1Icon boxSize="20px" />;
    case 'League 2':
      return <League2Icon boxSize="20px" />;
    case 'League 3':
      return <League3Icon boxSize="20px" />;
    case 'League 4':
      return <League4Icon boxSize="20px" />;
    default:
      return isShowText ? <Text>{name}</Text> : null;
  }
};

export default LeagueIcon;
