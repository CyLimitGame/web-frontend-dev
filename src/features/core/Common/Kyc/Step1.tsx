import React, { useEffect } from 'react';
import { Box, Center, Stack } from '@chakra-ui/react';
import { TFunction, useTranslation } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';
import moment from 'moment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from '@/components/Common';
import { DatePickerInput, SelectInput, TextInput } from '@/components/Inputs';
import { BaseButton } from '@/components/Button';
import { KycPersonalInfo } from '@/typings/user';

import COUNTRIES from '~/public/json/countries.json';
import COUNTRIES_FR from '~/public/json/countries-fr.json';
import { useGetKycDetails, useKycPersonalInfo } from '@/queries/useUser';

type Props = {
  onSubmit: () => void;
};

const schema = (t: TFunction) => {
  return yup.object().shape({
    firstName: yup.string().required(t('message:required')),
    lastName: yup.string().required(t('message:required')),
    nationality: yup.string().required(t('message:required')),
    dateOfBirth: yup.string().nullable().required(t('message:required')),
  });
};

const Step1 = ({ onSubmit }: Props) => {
  const { t, i18n } = useTranslation();

  const { data: kycInfo } = useGetKycDetails();
  const { mutateAsync, isLoading } = useKycPersonalInfo();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KycPersonalInfo>({
    resolver: yupResolver(schema(t)),
    defaultValues: { nationality: 'FR' },
  });

  const NATIONS = _.map(
    i18n.language === 'en' ? COUNTRIES : COUNTRIES_FR,
    ({ code, name }) => ({
      label: name,
      value: code,
      id: code,
    })
  );

  const handleSubmitForm = async (values: KycPersonalInfo) => {
    const birthday = moment(values.dateOfBirth).format('YYYY-MM-DD');
    const dateOfBirth = moment(birthday)
      .add(moment().utcOffset(), 'm')
      .format();

    await mutateAsync({
      ...values,
      dateOfBirth: dateOfBirth,
    });
    onSubmit();
  };

  useEffect(() => {
    if (kycInfo) {
      const [dateOfBirth, nationality, firstName, lastName] = [
        _.get(kycInfo, 'dateOfBirth', ''),
        _.get(kycInfo, 'nationality', ''),
        _.get(kycInfo, 'firstName', ''),
        _.get(kycInfo, 'lastName', ''),
      ];
      reset({ dateOfBirth, nationality, firstName, lastName });
    }
  }, [kycInfo]);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Box>
        <Text fontWeight="bold" translateText="before_adding_your_id" />
        <Text
          mt={2}
          fontSize="xs"
          translateText="please_review_the_info_below"
        />
        <Stack spacing={3} mt={4}>
          <TextInput
            label="first_name"
            errors={errors}
            {...register('firstName')}
          />
          <TextInput
            label="last_name"
            errors={errors}
            {...register('lastName')}
          />
          <div style={{ position: 'relative', zIndex: '99999999' }}>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <DatePickerInput
                  name="dateOfBirth"
                  onChange={onChange}
                  value={value as string}
                  label={t('date_of_birth')}
                  errors={errors}
                />
              )}
            />
          </div>
          <SelectInput
            label="nationality"
            choices={NATIONS}
            size="lg"
            errors={errors}
            defaultValue="FR"
            {...register('nationality')}
          />
        </Stack>
        <Center mt={4}>
          <BaseButton variant="light" type="submit" isLoading={isLoading}>
            {t('next')}
          </BaseButton>
        </Center>
      </Box>
    </form>
  );
};

export default Step1;
