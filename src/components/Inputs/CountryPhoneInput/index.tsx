import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { get } from 'lodash';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';

import { BoxProps } from '@chakra-ui/react';

import StyledWrapper from './StyledWrapper';

import colors from '@/theme/foundations/colors';

type Props = BoxProps & {
  name: string;
  label?: string;
  control: any;
  errors?: any;
};

const CountryPhoneInput = ({
  label,
  errors,
  control,
  name,
  ...rest
}: Props) => {
  return (
    <StyledWrapper {...rest}>
      <FormControl isInvalid={!!get(errors, name)}>
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="FR"
              value={value}
              onChange={onChange}
              id={name}
              ref={ref}
              style={{
                border: get(errors, name)
                  ? `1px solid ${colors.cinnabar[400]}`
                  : 'none',
                boxShadow: get(errors, name)
                  ? `0 0 0 1px ${colors.cinnabar[400]}`
                  : 'none',
              }}
            />
          )}
        />
        <FormErrorMessage>{`${get(
          errors,
          `${name}.message`
        )}`}</FormErrorMessage>
      </FormControl>
    </StyledWrapper>
  );
};

export default CountryPhoneInput;
