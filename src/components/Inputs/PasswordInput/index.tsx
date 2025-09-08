import React, { forwardRef, useState } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { FieldValues } from 'react-hook-form';
import { get } from 'lodash';
import { useTranslation } from 'next-i18next';

type Props = InputProps & {
  name: string;
  label?: string;
  errors?: FieldValues;
};

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ name, label, errors, placeholder, ...props }, ref) => {
    const [visiblePassword, setVisiblePassword] = useState(false);
    const { t } = useTranslation();

    return (
      <FormControl isInvalid={!!get(errors, name)}>
        {label && <FormLabel>{label}</FormLabel>}
        <InputGroup size="lg">
          <Input
            type={visiblePassword ? 'text' : 'password'}
            ref={ref}
            name={name}
            label={label}
            placeholder={t(placeholder || '')}
            {...props}
          />
          <InputRightElement width="40px" top="0" pr={2}>
            <Icon
              as={visiblePassword ? RiEyeLine : RiEyeCloseLine}
              width="24px"
              height="24px"
              color="gray.400"
              cursor="pointer"
              onClick={() => setVisiblePassword(!visiblePassword)}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{`${get(
          errors,
          `${name}.message`
        )}`}</FormErrorMessage>
      </FormControl>
    );
  }
);

export default PasswordInput;
