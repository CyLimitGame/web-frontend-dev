import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { ImArrowLeft2 } from 'react-icons/im';

import { navigateToGoBack } from '@/utils/navigation';

type Item = {
  id: string;
  label: string;
  to?: string;
};

type Props = {
  data: Item[];
};

const Breadcrumbs = ({ data }: Props) => {
  const { t } = useTranslation();

  return (
    <Flex>
      <Icon
        as={ImArrowLeft2}
        fontSize="2xl"
        mr={7.5}
        cursor="pointer"
        onClick={navigateToGoBack}
      />
      <Breadcrumb
        spacing="8px"
        separator={
          <Icon as={MdKeyboardArrowRight} color="gray.400" fontSize="2xl" />
        }
      >
        {data.map((item) => (
          <BreadcrumbItem key={item.id} alignItems="start">
            <BreadcrumbLink href={item.to} color="gray.400">
              {t(item.label)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Flex>
  );
};

export default Breadcrumbs;
