import React from 'react';
import { Box, Flex, useDisclosure, Icon, Collapse } from '@chakra-ui/react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import _ from 'lodash';

import { Text } from '@/components/Common';

type Option = {
  value?: string;
  src: string;
};

type Props = {
  options: Option[];
  label: string;
  value?: string;
  isIgNoreCollapse?: boolean;
  name: string;
  onChange: (e: any) => void;
  imageProps: {
    width: string;
    height: string;
  };
};

const SelectImageInput = ({
  options,
  label,
  onChange,
  name,
  value,
  imageProps,
  isIgNoreCollapse,
}: Props) => {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useDisclosure();
  const openCollapse = isIgNoreCollapse || isOpen;
  return (
    <Box bg="input" borderRadius="md">
      <Flex
        height="48px"
        alignItems="center"
        px={4}
        cursor="pointer"
        onClick={onToggle}
        justifyContent="space-between"
      >
        <Text textTransform="uppercase">{t(label)}</Text>
        {!isIgNoreCollapse && (
          <Icon as={isOpen ? MdKeyboardArrowUp : MdKeyboardArrowDown} />
        )}
      </Flex>
      <Collapse in={openCollapse} animateOpacity>
        <Box px={4} pb={4}>
          <Flex gap={1}>
            {_.map(options, (item) => (
              <Box
                key={item.value}
                cursor="pointer"
                border="1px solid"
                borderColor={item.value === value ? 'white' : 'transparent'}
                borderRadius="md"
                onClick={() =>
                  onChange({ target: { value: item.value, name } })
                }
                p={1}
                transition="border-color .2s"
              >
                <Image {...imageProps} src={item.src} />
              </Box>
            ))}
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};

export default SelectImageInput;
