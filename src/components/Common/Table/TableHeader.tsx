import React from 'react';
import { Th, Thead, Tr } from '@chakra-ui/react';
import { HeaderGroup } from 'react-table';

type TableHeaderProps = {
  headerGroups: HeaderGroup[];
};

const TableHeader = ({ headerGroups }: TableHeaderProps) => {
  return (
    <Thead>
      {headerGroups.map((headerGroup, i) => (
        <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
          {headerGroup.headers.map((column, index) => (
            <Th {...column.getHeaderProps()} key={index} color="gray.400">
              {column.render('Header')}
            </Th>
          ))}
        </Tr>
      ))}
    </Thead>
  );
};

export default TableHeader;
