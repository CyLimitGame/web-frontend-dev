import React from 'react';
import { Divider, Flex, IconButton, Select } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from 'react-icons/hi';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Text } from '@/components/Common';

type Props = {
  canPreviousPage: boolean;
  canNextPage: boolean;
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
  previousPage: () => void;
  nextPage: () => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  pageCount: number;
  pageIndex: number;
  pageOptions: number[];
};

const TablePagination = ({
  canPreviousPage,
  canNextPage,
  gotoPage,
  previousPage,
  nextPage,
  setPageSize,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Flex py={4} alignItems="center" justifyContent="flex-end">
      <IconButton
        mr={2}
        aria-label="first"
        onClick={() => gotoPage(0)}
        isDisabled={!canPreviousPage}
        isRound
      >
        <HiOutlineChevronDoubleLeft />
      </IconButton>
      <IconButton
        mr={2}
        isRound
        aria-label="pre"
        onClick={() => previousPage()}
        isDisabled={!canPreviousPage}
      >
        <MdChevronLeft />
      </IconButton>
      <IconButton
        mr={2}
        isRound
        aria-label="next"
        onClick={() => nextPage()}
        isDisabled={!canNextPage}
      >
        <MdChevronRight />
      </IconButton>
      <IconButton
        mr={2}
        isRound
        aria-label="last"
        onClick={() => gotoPage(pageCount - 1)}
        isDisabled={!canNextPage}
      >
        <HiOutlineChevronDoubleRight />
      </IconButton>
      <Text>
        {t('page_of', { page: pageIndex + 1, totalPage: pageOptions.length })}
      </Text>
      <Divider orientation="vertical" height="30px" mx={2} />
      <Select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
        width="80px"
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default TablePagination;
