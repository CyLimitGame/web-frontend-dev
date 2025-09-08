import React from 'react';
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import {
  Box,
  CheckboxGroupProps,
  Collapse,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

import { Text } from '@/components/Common';
import CheckBoxGroupInput from '@/components/Inputs/CheckBoxGroupInput';
import { Option } from '@/typings/common';

type Props = CheckboxGroupProps & {
  choices: Option[];
  label: string;
  name: string;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  defaultIsOpen?: boolean;
};

const CheckboxWithCollapse = ({
  choices,
  label,
  setValue,
  getValues,
  name,
  defaultIsOpen = true,
  ...props
}: Props) => {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen,
  });

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={onToggle}
        pb={2}
      >
        <Text translateText={label} color="gray.400" />
        {isOpen ? (
          <MdExpandLess fontSize="2xl" />
        ) : (
          <MdExpandMore fontSize="2xl" />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <CheckBoxGroupInput
          choices={choices}
          value={getValues(name)}
          onChange={(value) => setValue(name, value)}
          {...props}
        />
      </Collapse>
    </Box>
  );
};

export default CheckboxWithCollapse;
