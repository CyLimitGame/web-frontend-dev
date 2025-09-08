import React from 'react';
import { Box, Collapse, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useTranslation } from 'next-i18next';

import { Text } from '@/components/Common';

type Props = {
  children: React.ReactElement;
  header: string | React.ReactElement;
  defaultOpen?: boolean;
};

const DropdownCollapse = ({ children, header, defaultOpen = true }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: defaultOpen });

  return (
    <Box
      borderRadius="md"
      border="1px solid"
      borderColor="border"
      overflow="hidden"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        userSelect="none"
        cursor="pointer"
        py={3}
        px={4}
        _hover={{ bg: 'input' }}
        onClick={onToggle}
      >
        {typeof header === 'string' ? (
          <>
            <Text>{t(header)}</Text>
            <Icon as={isOpen ? MdKeyboardArrowUp : MdKeyboardArrowDown} />
          </>
        ) : (
          <>{header}</>
        )}
      </Flex>
      <Collapse in={isOpen}>
        <Box py={3} px={4}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default DropdownCollapse;
