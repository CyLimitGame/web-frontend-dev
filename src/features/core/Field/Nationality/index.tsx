import React from 'react';

import nationality from './data.json';

type Props = {
  code: string;
};

type Country = {
  [key in string]: {
    name: string;
    code: string;
  };
};

const Nationality = ({ code }: Props) => {
  return (
    <span>
      {(nationality as Country)[`${code}`.toUpperCase()]?.name || '-'}
    </span>
  );
};

export default Nationality;
