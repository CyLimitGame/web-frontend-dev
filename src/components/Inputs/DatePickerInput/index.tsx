import React from 'react';
import styled from '@emotion/styled';
import {
  Box,
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { FiCalendar } from 'react-icons/fi';
import { FieldValues } from 'react-hook-form';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { get } from 'lodash';

import colors from '@/theme/foundations/colors';
import borderRadius from '@/theme/foundations/borderRadius';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { formatStringToDate } from '@/utils/date';
import shadows from '@/theme/foundations/shadows';

type Props = {
  name: string;
  label?: string | React.ReactNode;
  errors?: FieldValues;
  bg?: string;
  onChange: (value: any) => void;
  value: string;
  format?: string;
  boxProps?: BoxProps;
};

const DatePickerInput = ({
  label,
  errors,
  bg = `${colors.whiteAlpha[160]}`,
  onChange,
  value,
  name,
  format = 'dd/MM/yyyy',
  boxProps = {},
  ...props
}: Props) => {
  const handleChange = (date: Date) => {
    onChange(date);
  };

  return (
    <Wrapper backgroundInput={bg} {...boxProps}>
      <FormControl isInvalid={get(errors, name)}>
        {label && <FormLabel>{label}</FormLabel>}
        <DatePicker
          onChange={handleChange}
          value={formatStringToDate(value)}
          format={format}
          calendarIcon={<FiCalendar fontSize="24px" />}
        />
        <Input type="hidden" {...props} />
        <FormErrorMessage>
          {`${get(errors, `${name}.message`)}`}
        </FormErrorMessage>
      </FormControl>
    </Wrapper>
  );
};

const Wrapper = styled(Box)<{ backgroundInput?: string }>`
  .react-date-picker {
    width: 100%;
  }

  .react-date-picker__wrapper {
    border: none;
    background-color: ${({ backgroundInput }) => backgroundInput};
    height: 50px;
    border-radius: ${borderRadius.md};
    padding: 0 16px;
  }

  .react-date-picker__inputGroup__day,
  .react-date-picker__inputGroup__month,
  .react-date-picker__inputGroup__year {
    outline: none;
  }
  .react-calendar {
    background: ${colors.background.default};
    padding: 5px;
    border-radius: 20px;
    box-shadow: ${shadows.mdBlue};
    & button {
      border-radius: 20px;
    }

    & button:hover {
      background-color: ${colors.cardOverlay};
    }
  }
  .react-date-picker__clear-button {
    & > svg {
      stroke: white;
    }
  }
`;

export default DatePickerInput;
