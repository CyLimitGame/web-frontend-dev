import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { Box, Center, Checkbox, Flex, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import ShowInfoAndContinue from './ShowInfoAndContinue';

import {
  ColorPickerInput,
  SelectImageInput,
  SingleCheckboxInput,
  TextInput,
} from '@/components/Inputs';
import { CylimitLogo, JerseyWithSponsor, Text } from '@/components/Common';
import {
  CYLIMIT_LOGO_BLACK,
  CYLIMIT_LOGO_BLUE,
  CYLIMIT_LOGO_RED,
  CYLIMIT_LOGO_WHITE,
  CYLIMIT_LOGO_YELLOW,
} from '@/constants/images';
import { BaseButton } from '@/components/Button';
import { useGetUserProfile, useUpdateUserProfile } from '@/queries/useUser';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { JERSEYS, SPONSORS } from '@/constants/select';
import { Jersey, Sponsor } from '@/typings/user.enum';
import { AuthLayout } from '@/layouts';

type FormValues = {
  nickName: string;
  jersey: Jersey;
  primaryColor: string;
  secondaryColor: string;
  sponsor: Sponsor;
  refInvitationCode: string;
  is18YearOld: boolean;
  isReadTermsAndConditions: boolean;
};

export const Logo = {
  [Sponsor.CYLIMIT_WHITE]: CYLIMIT_LOGO_WHITE,
  [Sponsor.CYLIMIT_BLACK]: CYLIMIT_LOGO_BLACK,
  [Sponsor.CYLIMIT_RED]: CYLIMIT_LOGO_RED,
  [Sponsor.CYLIMIT_YELLOW]: CYLIMIT_LOGO_YELLOW,
  [Sponsor.CYLIMIT_BLUE]: CYLIMIT_LOGO_BLUE,
};

const defaultValues = {
  primaryColor: '#fff',
  secondaryColor: '#000',
  jersey: Jersey.DEFAULT1,
  sponsor: Sponsor.CYLIMIT_BLACK,
};

const SetDefaultTeam = () => {
  const { t } = useTranslation();
  const { data } = useGetUserProfile();
  const { register, watch, handleSubmit, reset, setValue } =
    useForm<FormValues>({
      defaultValues: defaultValues,
    });

  const { mutateAsync, isLoading, isSuccess } = useUpdateUserProfile({});

  const jersey = watch('jersey');
  const nickName = watch('nickName');
  const sponsor = watch('sponsor');
  const primaryColor = watch('primaryColor');
  const secondaryColor = watch('secondaryColor');
  const is18YearOld = watch('is18YearOld');
  const isReadTermsAndConditions = watch('isReadTermsAndConditions');

  const handleSubmitForm = async (values: FormValues) => {
    await mutateAsync(values);
  };

  useEffect(() => {
    if (data) {
      reset({ ...defaultValues, ...data } as any);
    }
  }, [data]);

  return (
    <AuthLayout>
      <Center minH="100vh" flexDirection="column" py={4}>
        {isSuccess ? (
          <ShowInfoAndContinue
            nickName={nickName}
            jersey={jersey}
            sponsor={sponsor}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onNext={() => navigateTo(PATH.OPEN_THE_PACK)}
          />
        ) : (
          <>
            <CylimitLogo />
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <Flex
                w="100%"
                gap={4}
                mt={5}
                direction={['column', 'column', 'row']}
              >
                <Flex flex={1} justifyContent={['center', 'center', 'end']}>
                  <Box
                    w={['100%', '400px']}
                    p={4}
                    border="1px solid"
                    borderColor="border"
                    borderRadius="md"
                  >
                    <Stack w="100%">
                      <TextInput
                        placeholder="nickname"
                        {...register('nickName')}
                      />
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
                      {!_.get(data, 'refInvitationCode') && (
                        <TextInput
                          placeholder="invitation_code"
                          {...register('refInvitationCode')}
                        />
                      )}
                    </Stack>
                  </Box>
                </Flex>
                <Flex flex={1} justifyContent={['center', 'center', 'center']}>
                  <Box boxSize={['240px', '320px']}>
                    <JerseyWithSponsor
                      jersey={jersey}
                      primaryColor={primaryColor}
                      secondaryColor={secondaryColor}
                      sponsor={sponsor}
                      width={['240px', '320px']}
                      height={['240px', '320px']}
                      containerProps={{ display: 'block' }}
                    />
                  </Box>
                </Flex>
              </Flex>
              <Center flexDirection="column" mt={5}>
                <Stack>
                  <SingleCheckboxInput
                    textContent="i_certify_that_i_am_18_years_of_age_or_older"
                    textContentProps={{ fontSize: ['xs', 'sm', 'md'] }}
                    {...register('is18YearOld')}
                  />
                  <Checkbox
                    onChange={(event) =>
                      setValue('isReadTermsAndConditions', event.target.checked)
                    }
                  >
                    <Text
                      onClick={() =>
                        window.open(PATH.TERMS_OF_SERVICE, '_blank')
                      }
                      translateText="i_have_read_and_accept_the_terms_and_conditions"
                      _hover={{ textDecoration: 'underline' }}
                      fontSize={['xs', 'sm', 'md']}
                    />
                  </Checkbox>
                </Stack>
              </Center>
              <Center>
                <BaseButton
                  variant="light"
                  type="submit"
                  mt={5}
                  w="210px"
                  isLoading={isLoading}
                  isDisabled={
                    !isReadTermsAndConditions || !is18YearOld || !nickName
                  }
                >
                  {t('continue')}
                </BaseButton>
              </Center>
            </form>
          </>
        )}
      </Center>
    </AuthLayout>
  );
};

export default SetDefaultTeam;
