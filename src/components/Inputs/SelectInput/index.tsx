import React, { forwardRef, useRef } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  SelectProps,
} from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';
import { MdArrowDropDown, MdCheck, MdClose } from 'react-icons/md';
import { useSize } from '@chakra-ui/react-use-size';

import { TextOneLine } from '@/components/Common';
import colors from '@/theme/foundations/colors';

type Choice = {
  id: string | number;
  label: string | number;
  value: string | number;
};

type Props = SelectProps & {
  name: string;
  label?: string;
  errors?: FieldValues;
  choices: Choice[];
  formControlProps?: FormControlProps;
  showEmptyOption?: boolean;
  lableProps?: FormLabelProps;
  emptyLabel?: string;
};

const SelectInput = forwardRef<any, Props>(
  (
    {
      name,
      label,
      errors,
      choices,
      formControlProps,
      showEmptyOption,
      lableProps,
      emptyLabel = 'select_an_option',
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();
    return (
      <FormControl isInvalid={!!_.get(errors, name)} {...formControlProps}>
        {label && (
          <FormLabel htmlFor={name} {...lableProps}>
            {t(label)}
          </FormLabel>
        )}
        <Select
          variant="filled"
          ref={ref}
          name={name}
          bg="input !important"
          {...props}
        >
          {showEmptyOption && <option value="">{t(emptyLabel)}</option>}
          {choices.map((item) => (
            <option key={item.id} value={item.value}>
              {t(_.get(item, 'label', '') as string)}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {`${t(_.get(errors, `${name}.message`))}`}
        </FormErrorMessage>
      </FormControl>
    );
  }
);

// TODO Beta version
type CustomSelectProps = {
  formControlProps?: FormControlProps;
  label?: string;
  lableProps?: FormLabelProps;
  name: string;
  isMulti?: boolean;
  isRequire?: boolean;
  value: string | string[];
  onChange: (event: any) => void;
  options: Choice[];
  emptyLabel?: string;
  isClear?: boolean;
};

export const CustomSelect = ({
  formControlProps,
  label,
  lableProps,
  name,
  isMulti = false,
  isRequire,
  onChange,
  value,
  options,
  emptyLabel = 'select_an_option',
  isClear,
}: CustomSelectProps) => {
  const elementRef = useRef<any>();
  const size = useSize(elementRef);

  const { t } = useTranslation();

  const handleChange = (v: string) => {
    if (!isMulti) {
      onChange({ target: { value: v, name } });
    }

    if (isMulti) {
      if (isRequire && _.size(value) === 1 && _.includes(value, v)) {
        return;
      }
      onChange({
        target: {
          value: _.includes(value, v)
            ? _.filter(value, (item) => item !== v)
            : [...(value as string[]), v],
          name,
        },
      });
    }
  };

  const getLabelValue = () => {
    if (_.isEmpty(value)) {
      return emptyLabel;
    }
    return typeof value === 'string'
      ? value
      : _.join(
          _.map(value, (text) => t(text)),
          ', '
        );
  };

  return (
    <FormControl {...formControlProps} ref={elementRef}>
      {label && (
        <FormLabel htmlFor={name} {...lableProps}>
          {t(label)}
        </FormLabel>
      )}
      <Menu closeOnSelect={!isMulti}>
        <MenuButton
          as={Button}
          rightIcon={
            <Flex>
              {isClear && (
                <Icon
                  as={MdClose}
                  onClick={() => onChange({ target: { value: [], name } })}
                  _hover={{ color: 'error.500' }}
                />
              )}
              <MdArrowDropDown />
            </Flex>
          }
          fontWeight="normal"
          fontSize="sm"
          w={formControlProps?.w || '100%'}
          textAlign="left"
          bg="input"
        >
          <TextOneLine value={getLabelValue()} />
        </MenuButton>
        <MenuList
          w={size?.width}
          maxHeight="300px"
          overflow="auto"
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: colors.gray[300],
              borderRadius: '24px',
            },
          }}
          zIndex="dropdown"
        >
          {_.map(options, (option, index) => {
            const getOpacity = () => {
              if (isMulti) {
                return _.includes(value, option.value) ? 1 : 0;
              }
              return value === option.value ? 1 : 0;
            };
            return (
              <MenuItem
                display="flex"
                key={index}
                onClick={() => handleChange(option.value as any)}
                alignItems="start"
                fontSize="sm"
                fontWeight="medium"
              >
                <Icon as={MdCheck} mr={1} pt={1} opacity={getOpacity()} />
                <TextOneLine value={option.label as any} />
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </FormControl>
  );
};

export default SelectInput;
