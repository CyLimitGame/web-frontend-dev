import React, { useState } from 'react';
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { Box, CheckboxGroupProps, Collapse, Flex } from '@chakra-ui/react';
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
};

const CheckboxWithCollapse = ({
  choices,
  label,
  setValue,
  getValues,
  name,
  ...props
}: Props) => {
  const [open, setOpen] = useState(true);

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={() => setOpen(!open)}
        pb={2}
      >
        <Text translateText={label} color="gray.400" />
        {open ? (
          <MdExpandLess fontSize="2xl" />
        ) : (
          <MdExpandMore fontSize="2xl" />
        )}
      </Flex>
      <Collapse in={open} animateOpacity>
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
