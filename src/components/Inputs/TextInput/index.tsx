import React, { ReactNode, forwardRef } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputProps,
  InputRightElementProps,
  FormControlProps,
} from '@chakra-ui/react';
import { get } from 'lodash';
import { FieldValues, RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

type Props = InputProps & {
  name: string;
  label?: string;
  validate?: RegisterOptions<FieldValues>;
  errors?: FieldValues;
  leftElement?: string;
  rightElement?: string | ReactNode;
  rightElementProps?: InputRightElementProps;
  formControlProps?: FormControlProps;
};

const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      errors,
      label,
      leftElement,
      rightElement,
      placeholder,
      rightElementProps = {},
      formControlProps = {},
      ...props
    },
    ref
  ) => {
    const { name } = props;
    const { t } = useTranslation();

    return (
      <FormControl isInvalid={!!get(errors, name)} {...formControlProps}>
        {label && <FormLabel htmlFor={name}>{t(label)}</FormLabel>}
        <InputGroup>
          {leftElement && (
            <InputLeftElement color="gray.500" height="100%">
              {leftElement}
            </InputLeftElement>
          )}
          <Input
            size="lg"
            id={name}
            ref={ref}
            placeholder={t(placeholder || '')}
            {...props}
          />
          {rightElement && (
            <InputRightElement
              color="gray.500"
              height="100%"
              {...rightElementProps}
            >
              {rightElement}
            </InputRightElement>
          )}
        </InputGroup>
        <FormErrorMessage>
          {`${get(errors, `${name}.message`)}`}
        </FormErrorMessage>
      </FormControl>
    );
  }
);

export default TextInput;
