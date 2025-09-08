import React, { ReactNode } from 'react';
import {
  Table,
  TableContainer,
  Tbody,
  Tr,
  Td,
  TableCellProps,
  TableContainerProps,
  FlexProps,
  Flex,
  Box,
} from '@chakra-ui/react';

import Title from '../Common/Title';

import { ArrayElement } from '@/typings/common';
import Translate from '@/components/Translate';
import {
  LoaderWithBackdrop,
  Pagination,
  PaginationProps,
} from '@/components/Common';

type Option = {
  label: string | ReactNode;
  value: string | ReactNode;
};

export const BaseColumns: Cell<Option>[] = [
  {
    cellProps: {
      color: 'whiteAlpha.280',
      textTransform: 'uppercase',
    },
    Cell: (option) =>
      typeof option.label === 'string' ? (
        <Translate text={option.label} />
      ) : (
        option.label
      ),
  },
  {
    cellProps: {
      textTransform: 'uppercase',
    },
    Cell: (option) => option?.value,
  },
];

export type Cell<T extends any> = {
  cellProps?: TableCellProps;
  Cell: (item: T, index: number, metaData: any) => ReactNode | string;
};

type Props<T extends readonly unknown[] = Array<any>> = FlexProps & {
  formatCell?: Cell<ArrayElement<T>>[];
  data: T;
  title?: string;
  tableContainerProps?: TableContainerProps;
  metaData?: any;
  isLoading?: boolean;
  pagination?: PaginationProps;
};

const TableInfo = ({
  data = [],
  formatCell = BaseColumns,
  title,
  tableContainerProps = {},
  metaData = {},
  pagination,
  isLoading,
  ...rest
}: Props) => {
  if ((!isLoading && !data) || data.length === 0) return null;

  return (
    <Flex flexDirection="column" gap="8px" {...rest}>
      {title ? <Title title={title} /> : null}

      <TableContainer
        position="relative"
        border="2px solid"
        borderColor="white"
        borderRadius="20px"
        px="20px"
        flex="1"
        {...tableContainerProps}
      >
        <LoaderWithBackdrop isLoading={isLoading} />
        <Table variant="secondary">
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                {formatCell.map(({ Cell, cellProps }, indexChild) => (
                  <Td key={indexChild} {...cellProps}>
                    {Cell(item, index, metaData)}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        {pagination && (
          <Box mb="10px">
            <Pagination
              page={pagination.page}
              total={pagination.total}
              limit={pagination.limit}
              onChangePage={(currentPage) =>
                pagination.onChangePage(currentPage)
              }
            />
          </Box>
        )}
      </TableContainer>
    </Flex>
  );
};

export default TableInfo;
