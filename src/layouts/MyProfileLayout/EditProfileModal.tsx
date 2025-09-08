import React, { useEffect, useState } from 'react';
import { Box, Center, Flex } from '@chakra-ui/react';
import { ModalProps } from '@chakra-ui/modal';
import { useTranslation } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import EditJerseyModal from './EditJerseyModal';

import { BaseModal } from '@/components/Modal';
import { DatePickerInput, TextInput } from '@/components/Inputs';
import { BaseButton } from '@/components/Button';
import { useUpdateUserProfile } from '@/queries/useUser';
import { EditProfileForm, UserProfileForm } from '@/typings/user';
import editProfileSchema from '@/features/EditProfile/validate';
import { sanitizeEditProfile } from '@/utils/sanitize';
import { Jersey, Sponsor } from '@/typings/user.enum';
import ChangeYourPasswordModal from '@/features/core/Modal/ChangeYourPasswordModal';
import LinkDiscordButton from '@/features/core/User/LinkDiscordButton';
import LinkTwitterButton from '@/features/core/User/LinkTwitterButton';
import { JerseyWithSponsor } from '@/components/Common';

type Props = Omit<ModalProps, 'children'> & {
  data?: UserProfileForm;
};

const EditProfileModal = ({ data, ...rest }: Props) => {
  const { t } = useTranslation();
  const [visibleModalChangePassword, setVisibleModalChangePassword] =
    useState(false);
  const [visibleModalEditJersey, setVisibleModalEditJersey] = useState(false);

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

  const handleSubmitForm = async (values: EditProfileForm) => {
    await mutateProfile(sanitizeEditProfile(values));
    rest.onClose();
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  if (visibleModalEditJersey) {
    return (
      <EditJerseyModal
        data={data}
        isOpen={visibleModalEditJersey}
        onClose={() => setVisibleModalEditJersey(false)}
      />
    );
  }

  if (visibleModalChangePassword) {
    return (
      <ChangeYourPasswordModal
        isOpen={visibleModalChangePassword}
        onClose={() => setVisibleModalChangePassword(false)}
      />
    );
  }

  return (
    <>
      <BaseModal
        closeable
        title="edit_profile"
        isUseDrawerForMobile
        size="3xl"
        modalContentProps={{
          sx: { overflow: 'visible' },
        }}
        {...rest}
      >
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Box maxWidth="724px" margin="auto">
            <Center mb={2}>
              <JerseyWithSponsor
                width="110px"
                height="110px"
                jersey={data?.jersey || Jersey.DEFAULT1}
                primaryColor={data?.primaryColor || 'white'}
                secondaryColor={data?.secondaryColor || 'white'}
                sponsor={data?.sponsor as Sponsor}
              />
            </Center>

            <BaseButton
              variant="outline"
              display="block"
              mx="auto"
              mb="30px"
              size={['sm', 'sm', 'md', 'lg']}
              onClick={() => setVisibleModalEditJersey(true)}
            >
              {t('my_jersey')}
            </BaseButton>
            <Flex
              gap="8px"
              flexDirection={['column', 'column', 'column', 'row']}
              mb="8px"
            >
              <Flex flex="1" flexDirection="column" gap="8px">
                <TextInput
                  errors={errors}
                  maxLength={20}
                  h="50px"
                  placeholder="nickname"
                  {...register('nickName')}
                />
                <TextInput
                  errors={errors}
                  maxLength={20}
                  h="50px"
                  placeholder="first_name"
                  {...register('firstName')}
                />
                <TextInput
                  errors={errors}
                  maxLength={20}
                  h="50px"
                  placeholder="last_name"
                  {...register('lastName')}
                />
                <Flex
                  alignItems="center"
                  backgroundColor="whiteAlpha.160"
                  borderRadius="md"
                  height="50px"
                  px="1rem"
                  display={['none', 'none', 'none', 'flex']}
                >
                  <LinkDiscordButton />
                </Flex>
              </Flex>
              <Flex flex="1" flexDirection="column" gap="8px">
                <TextInput {...register('email', { disabled: true })} />
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field: { onChange, value } }) => (
                    <DatePickerInput
                      name="dateOfBirth"
                      onChange={onChange}
                      value={value as string}
                      errors={errors}
                    />
                  )}
                />
                <Flex
                  display={['flex', 'flex', 'flex', 'none']}
                  alignItems="center"
                  backgroundColor="whiteAlpha.160"
                  borderRadius="md"
                  height="50px"
                  px="1rem"
                >
                  <LinkDiscordButton
                    boxUnlinkProps={{
                      maxW: '300px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  />
                </Flex>
                <Flex
                  alignItems="center"
                  backgroundColor="whiteAlpha.160"
                  borderRadius="md"
                  height="50px"
                  px="1rem"
                >
                  <LinkTwitterButton />
                </Flex>
              </Flex>
            </Flex>
            <Box mt={10}>
              <Flex
                width="fit-content"
                mx="auto"
                flexDirection="column"
                gap="10px"
              >
                <BaseButton
                  size={['sm', 'sm', 'md', 'lg']}
                  variant="outline"
                  fontWeight="bold"
                  onClick={() => setVisibleModalChangePassword(true)}
                >
                  {t('change_your_password')}
                </BaseButton>
                <BaseButton
                  isLoading={isLoading}
                  size={['sm', 'sm', 'md', 'lg']}
                  variant="secondaryLight"
                  type="submit"
                >
                  {t('save_changes')}
                </BaseButton>
              </Flex>
            </Box>
          </Box>
        </form>
      </BaseModal>
    </>
  );
};

export default EditProfileModal;
