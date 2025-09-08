import React from 'react';
import { useTranslation } from 'next-i18next';
import { Divider, Flex, IconButton, Select } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Text } from '@/components/Common';

export type PaginationProps = {
  page: number;
  total: number;
  limit: number;
  onChangePage: (page: number) => void;
};

const Pagination = ({
  limit,
  total,
  onChangePage,
  ...props
}: PaginationProps) => {
  const { t } = useTranslation();

  const totalPage = Math.ceil(total / limit);
  const pageOptions = Array.from(Array(totalPage + 1).keys()).splice(
    1,
    totalPage
  );

  const handleChangePage = (page: number) => {
    onChangePage(Number(page));
  };

  const page = Number(props.page);

  if (!total) {
    return null;
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" mt={4}>
      <Text fontSize={['xs', 'sm']} fontWeight="bold" color="gray.400">
        {t('page_of', { page, totalPage })}
      </Text>
      <Flex
        minWidth="260px"
        justifyContent="flex-end"
        alignItems="center"
        gap={[1, 2]}
      >
        <Text fontSize={['xs', 'sm']} fontWeight="bold" color="gray.400">
          {t('youre_on')}
        </Text>
        <Select
          width="70px"
          value={page}
          onChange={(event) => handleChangePage(Number(event.target.value))}
        >
          {pageOptions.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </Select>
        <Divider orientation="vertical" height="34px" mx={2} />
        <IconButton
          isRound
          aria-label=""
          mr={1}
          isDisabled={page < 2}
          onClick={() => handleChangePage(page - 1)}
        >
          <MdChevronLeft />
        </IconButton>
        <IconButton
          isRound
          aria-label=""
          isDisabled={page === totalPage}
          onClick={() => handleChangePage(page + 1)}
        >
          <MdChevronRight />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default Pagination;
