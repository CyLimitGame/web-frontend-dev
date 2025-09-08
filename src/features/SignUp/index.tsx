import React, { useState } from 'react';
import { Box, Center, Checkbox, Flex, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import signUpSchema from './validate';
import JerseyComplete from './JerseyComplete';
import ViewCheckEmail from './ViewCheckEmail';

import ShowInfoAndContinue from './ShowInfoAndContinue';

import {
  TextInput,
  PasswordInput,
  SelectImageInput,
  ColorPickerInput,
  SingleCheckboxInput,
} from '@/components/Inputs';
import { BaseButton } from '@/components/Button';
import { useSignUp } from '@/queries/useAuth';
import { SignUpForm } from '@/typings/user';
import { getInviteCodeCookie } from '@/utils/cookies';
import { CylimitLogo, Text } from '@/components/Common';
import { Jersey, Sponsor } from '@/typings/user.enum';
import { JERSEYS, SPONSORS } from '@/constants/select';
import { PATH } from '@/constants/path';
import { AuthLayout } from '@/layouts';

const defaultValues = {
  primaryColor: '#fff',
  secondaryColor: '#000',
  jersey: Jersey.DEFAULT1,
  sponsor: Sponsor.CYLIMIT_BLACK,
};

const Signup = () => {
  const { t } = useTranslation();
  const [isViewCheckEmail, setIsViewCheckEmail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpForm>({
    resolver: yupResolver(signUpSchema(t)),
    defaultValues: {
      refInvitationCode: getInviteCodeCookie(),
      ...defaultValues,
    },
  });

  const { mutateAsync, isLoading, isSuccess } = useSignUp();

  const handleSubmitForm = async (values: SignUpForm) => {
    await mutateAsync(values);
  };

  const nickName = watch('nickName');
  const jersey = watch('jersey');
  const sponsor = watch('sponsor');
  const primaryColor = watch('primaryColor');
  const secondaryColor = watch('secondaryColor');
  const is18YearOld = watch('is18YearOld');
  const isReadTermsAndConditions = watch('isReadTermsAndConditions');

  const renderSuccess = () => {
    if (!isViewCheckEmail) {
      return (
        <ShowInfoAndContinue
          nickName={nickName}
          jersey={jersey}
          sponsor={sponsor}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          onNext={() => setIsViewCheckEmail(true)}
        />
      );
    }
    return (
      <ViewCheckEmail
        nickName={nickName}
        jersey={jersey}
        sponsor={sponsor}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    );
  };

  return (
    <AuthLayout>
      <Box>
        {isSuccess ? (
          <>{renderSuccess()}</>
        ) : (
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Center mb={5}>
              <CylimitLogo />
            </Center>
            <Flex display={['none', 'none', 'flex']} mb={2}>
              <Text
                flex={1}
                translateText="create_your_account_by_filling_in_the_following_fields"
              />
              <Text flex={1} translateText="personalize_your_team_jersey" />
            </Flex>
            <Flex gap={[3]} direction={['column', 'row']}>
              <Flex
                justifyContent="end"
                p={2}
                border="1px solid"
                borderColor="border"
                borderRadius="md"
                flex={1}
              >
                <Box w="100%">
                  <Stack spacing={3}>
                    <TextInput
                      errors={errors}
                      maxLength={100}
                      placeholder="teamName"
                      {...register('nickName')}
                    />
                    <TextInput
                      errors={errors}
                      maxLength={100}
                      placeholder="email"
                      {...register('email')}
                    />
                    <PasswordInput
                      errors={errors}
                      maxLength={50}
                      placeholder="password"
                      {...register('password')}
                    />
                    <PasswordInput
                      errors={errors}
                      maxLength={50}
                      placeholder="confirm_password"
                      {...register('passwordToConfirm')}
                    />
                    <TextInput
                      errors={errors}
                      maxLength={10}
                      placeholder="invitation_code"
                      {...register('refInvitationCode')}
                    />
                  </Stack>
                </Box>
              </Flex>
              <Flex
                p={2}
                border="1px solid"
                borderColor="border"
                borderRadius="md"
                flex={1}
              >
                <Box w="100%">
                  <Stack spacing={3}>
                    <SelectImageInput
                      label="JERSEY"
                      value={jersey}
                      options={JERSEYS}
                      imageProps={{ width: '40px', height: '40px' }}
                      {...register('jersey')}
                    />
                    <ColorPickerInput
                      label="primary_color"
                      value={primaryColor}
                      {...register('primaryColor')}
                    />
                    <ColorPickerInput
                      label="secondary_color"
                      value={secondaryColor}
                      {...register('secondaryColor')}
                    />
                    <SelectImageInput
                      label="SPONSOR"
                      value={sponsor}
                      options={SPONSORS}
                      imageProps={{ width: '100px', height: '40px' }}
                      {...register('sponsor')}
                    />
                  </Stack>
                </Box>
              </Flex>
            </Flex>
            <Center mt={4}>
              <Box
                pos="relative"
                display="inline-block"
                p={4}
                border="1px solid"
                borderColor="border"
                borderRadius="md"
              >
                <JerseyComplete
                  jersey={jersey}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  sponsor={sponsor}
                />
              </Box>
            </Center>
            <Center flexDirection="column" mt={5}>
              <Stack>
                <SingleCheckboxInput
                  textContent="i_certify_that_i_am_18_years_of_age_or_older"
                  {...register('is18YearOld')}
                />
                <Checkbox
                  onChange={(event) =>
                    setValue('isReadTermsAndConditions', event.target.checked)
                  }
                >
                  <Text
                    onClick={() => window.open(PATH.TERMS_OF_SERVICE, '_blank')}
                    translateText="i_have_read_and_accept_the_terms_and_conditions"
                    _hover={{ textDecoration: 'underline' }}
                  />
                </Checkbox>
              </Stack>
            </Center>
            <Center mt={4}>
              <BaseButton
                type="submit"
                isLoading={isLoading}
                w="210px"
                variant="light"
                isDisabled={!(is18YearOld && isReadTermsAndConditions)}
              >
                {t('continue')}
              </BaseButton>
            </Center>
          </form>
        )}
      </Box>
    </AuthLayout>
  );
};

export default Signup;
