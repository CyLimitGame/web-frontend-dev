import React from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { HexColorPicker } from 'react-colorful';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

type Props = {
  label: string;
  onChange: (event: any) => void;
  value?: string;
  name: string;
};

const ColorPickerInput = ({ label, onChange, value, name }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useDisclosure();

  const handleChange = (value: string) => {
    onChange({ target: { value, name } });
  };

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
        <Icon as={isOpen ? MdKeyboardArrowUp : MdKeyboardArrowDown} />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box px={4} pb={4}>
          <HexColorPicker
            style={{ width: '100%' }}
            color={value}
            onChange={handleChange}
          />
        </Box>
      </Collapse>
    </Box>
  );
};

export default ColorPickerInput;
