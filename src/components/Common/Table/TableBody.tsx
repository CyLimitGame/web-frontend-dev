import React from 'react';
import { Tbody, Td, Tr } from '@chakra-ui/react';
import { UsePaginationInstanceProps, UseTableInstanceProps } from 'react-table';

type Props = {
  getTableBodyProps: UseTableInstanceProps<object>['getTableBodyProps'];
  page: UsePaginationInstanceProps<object>['page'];
  prepareRow: UseTableInstanceProps<object>['prepareRow'];
};

const TableBody = ({ getTableBodyProps, page, prepareRow }: Props) => {
  return (
    <Tbody {...getTableBodyProps()}>
      {page.map((row, i) => {
        prepareRow(row);
        return (
          <Tr {...row.getRowProps()} key={i}>
            {row.cells.map((cell, index) => (
              <Td {...cell.getCellProps()} key={index}>
                {cell.render('Cell')}
              </Td>
            ))}
          </Tr>
        );
      })}
    </Tbody>
  );
};

export default TableBody;
