import React, { forwardRef } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput as NumberInputUI,
  NumberInputField,
  NumberInputProps,
} from '@chakra-ui/react';
import { get } from 'lodash';
import { FieldValues, RegisterOptions } from 'react-hook-form';

type Props = NumberInputProps & {
  name: string;
  label?: string;
  validate?: RegisterOptions<FieldValues>;
  errors?: FieldValues;
};

const NumberInput = forwardRef<HTMLInputElement, Props>(
  ({ errors, label, ...props }, ref) => {
    const { name } = props;

    return (
      <FormControl isInvalid={!!get(errors, name)}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        {/* <Input size="lg" id={name} ref={ref} {...props} /> */}
        <NumberInputUI
          size="lg"
          defaultValue={15}
          precision={2}
          step={0.2}
          ref={ref}
          {...props}
        >
          <NumberInputField />
          {/* <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper> */}
        </NumberInputUI>
        <FormErrorMessage>
          {`${get(errors, `${name}.message`)}`}
        </FormErrorMessage>
      </FormControl>
    );
  }
);

export default NumberInput;
