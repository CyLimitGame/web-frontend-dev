import { TableContainer, Table as ChakraTable } from '@chakra-ui/react';
import React from 'react';
import { usePagination, useTable, UseTableOptions } from 'react-table';

import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';

import colors from '@/theme/foundations/colors';

type Props = {
  columns: UseTableOptions<object>['columns'];
  data: UseTableOptions<object>['data'];
};

const TableData = ({ columns, data }: Props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <React.Fragment>
      <TableContainer
        border={`1px solid ${colors.gray[100]}`}
        borderRadius="xl"
      >
        <ChakraTable {...getTableProps()} size="lg">
          <TableHeader headerGroups={headerGroups} />
          <TableBody
            getTableBodyProps={getTableBodyProps}
            page={page}
            prepareRow={prepareRow}
          />
        </ChakraTable>
      </TableContainer>
      <TablePagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageSize={pageSize}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        nextPage={nextPage}
        setPageSize={setPageSize}
        pageCount={pageCount}
      />
    </React.Fragment>
  );
};

const TableMomorize = React.memo(TableData);

const Table = ({ columns, data }: Props) => {
  return <TableMomorize columns={columns} data={data} />;
};

export default React.memo(Table);
