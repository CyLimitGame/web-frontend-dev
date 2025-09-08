import React, { forwardRef } from 'react';
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  TextProps,
  Tooltip,
} from '@chakra-ui/react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { FieldValues } from 'react-hook-form';

import { Text } from '@/components/Common';

type Props = CheckboxProps & {
  name: string;
  label?: string;
  errors?: FieldValues;
  textContent: string;
  formControlProps?: FormControlProps;
  textContentProps?: TextProps;
  tooltipText?: string;
};

const SingleCheckboxInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      tooltipText,
      errors,
      textContent,
      formControlProps,
      textContentProps,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();
    return (
      <FormControl isInvalid={!!_.get(errors, name)} {...formControlProps}>
        {label && (
          <Tooltip label={tooltipText ? t(tooltipText) : ''}>
            <FormLabel htmlFor={name}>{t(label)}</FormLabel>
          </Tooltip>
        )}
        <Checkbox name={name} ref={ref} {...props}>
          <Text {...textContentProps}>{t(textContent)}</Text>
        </Checkbox>
        <FormErrorMessage>
          {`${_.get(errors, `${name}.message`)}`}
        </FormErrorMessage>
      </FormControl>
    );
  }
);

export default SingleCheckboxInput;
