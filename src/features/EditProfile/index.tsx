import React, { useEffect, useState } from 'react';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ChangeYourPasswordModal from '../core/Modal/ChangeYourPasswordModal';

import Avatart from './Avatar';
import editProfileSchema from './validate';
import DeleteMyAccountModal from './DeleteMyAccountModal';

import MainLayout from '@/layouts/MainLayout';
import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import {
  DatePickerInput,
  CountryPhoneInput,
  TextInput,
} from '@/components/Inputs';
import { navigateToViewMyProfile } from '@/utils/navigation';
import { EditProfileForm } from '@/typings/user';
import { useGetUserProfile, useUpdateUserProfile } from '@/queries/useUser';
import { sanitizeEditProfile } from '@/utils/sanitize';

const EditProfile = () => {
  const [visibleModalChangePassword, setVisibleModalChangePassword] =
    useState(false);
  const [visibleModalDeleteMyAccount, setVisibleModalDeleteMyAccount] =
    useState(false);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditProfileForm>({
    resolver: yupResolver(editProfileSchema(t)),
  });

  const { mutate: mutateProfile, isLoading } = useUpdateUserProfile({});
  const { data } = useGetUserProfile();

  const handleSubmitForm = (values: EditProfileForm) => {
    mutateProfile(sanitizeEditProfile(values));
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <MainLayout>
      <Box pt={10} px={2}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Box
            p={[4, 4, 10]}
            pb={20}
            shadow="2xl"
            maxW="3xl"
            borderRadius="xl"
            margin="auto"
          >
            <Avatart />
            <Text
              translateText="infomation"
              fontSize="xl"
              color="gray.900"
              fontWeight="bold"
              my={8}
            />
            <Stack spacing={3}>
              <TextInput
                label={t('nickname')}
                errors={errors}
                maxLength={20}
                {...register('nickName')}
              />
              <TextInput
                label={t('first_name')}
                errors={errors}
                maxLength={20}
                {...register('firstName')}
              />
              <TextInput
                label={t('last_name')}
                errors={errors}
                maxLength={20}
                {...register('lastName')}
              />
              <TextInput
                label={t('email')}
                {...register('email', { disabled: true })}
              />
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

              <CountryPhoneInput
                label={t('phone_number')}
                name="phoneNumber"
                errors={errors}
                control={control}
              />
            </Stack>
            <Text
              translateText="password"
              fontSize="xl"
              color="gray.900"
              fontWeight="bold"
              my={8}
            />
            <BaseButton
              variant="outline"
              width="100%"
              borderColor="gray.900"
              onClick={() => setVisibleModalChangePassword(true)}
            >
              {t('change_your_password')}
            </BaseButton>
            <Text
              translateText="My Account"
              fontSize="xl"
              color="gray.900"
              fontWeight="bold"
              my={8}
            />
            <BaseButton
              variant="outline"
              width="100%"
              borderColor="gray.900"
              onClick={() => setVisibleModalDeleteMyAccount(true)}
            >
              {t('permanently_delete_account')}
            </BaseButton>
          </Box>
          <Flex justifyContent="center" my={10}>
            <BaseButton
              mr={4}
              colorScheme="primary"
              width="200px"
              type="submit"
              isLoading={isLoading}
            >
              {t('save')}
            </BaseButton>
            <BaseButton
              variant="outline-primary"
              width="200px"
              onClick={navigateToViewMyProfile}
            >
              {t('cancel')}
            </BaseButton>
          </Flex>
        </form>
        <ChangeYourPasswordModal
          isOpen={visibleModalChangePassword}
          onClose={() => setVisibleModalChangePassword(false)}
        />
        <DeleteMyAccountModal
          isOpen={visibleModalDeleteMyAccount}
          onClose={() => setVisibleModalDeleteMyAccount(false)}
        />
      </Box>
    </MainLayout>
  );
};

export default EditProfile;
