import React from 'react';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { Option } from '@/typings/common';

type Props = Omit<CheckboxGroupProps, 'onChange'> & {
  choices: Option[];
  onChange: (event: any) => void;
  name?: string;
};

const CheckBoxGroupInput = ({ choices, onChange, name, ...props }: Props) => {
  const { t } = useTranslation();
  return (
    <CheckboxGroup
      {...props}
      onChange={(v) => onChange({ target: { value: v, name } })}
    >
      <Stack spacing={[2]} direction={['column']}>
        {choices?.map((item, index) => (
          <Checkbox value={item.value} key={index}>
            {t(item.label)}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
};

export default CheckBoxGroupInput;
