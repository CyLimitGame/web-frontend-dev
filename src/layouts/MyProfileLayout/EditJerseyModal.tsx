import React, { useContext, useEffect } from 'react';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { ModalProps } from '@chakra-ui/modal';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import _ from 'lodash';
import Image from 'next/image';
import { HexColorPicker } from 'react-colorful';
import styled from '@emotion/styled';

import { MyProfileContext } from '.';

import { BaseModal } from '@/components/Modal';
import { BaseButton } from '@/components/Button';
import { useUpdateUserProfile } from '@/queries/useUser';
import { EditProfileForm, UserProfileForm } from '@/typings/user';
import { Jersey, Sponsor } from '@/typings/user.enum';
import { JERSEYS, SPONSORS } from '@/constants/select';
import { SelectImageInput } from '@/components/Inputs';
import { JerseyWithSponsor } from '@/components/Common';

type Props = Omit<ModalProps, 'children'> & {
  data?: UserProfileForm;
};

const EditJerseyModal = ({ data, onClose, ...rest }: Props) => {
  const { t } = useTranslation();
  const { changeColor } = useContext(MyProfileContext);

  const { handleSubmit, reset, watch, setValue, getValues, register } = useForm(
    {
      defaultValues: {
        jersey: Jersey.DEFAULT1,
        primaryColor: '#fff',
        secondaryColor: '#fff',
        sponsor: Sponsor.CYLIMIT_BLACK,
      },
    }
  );
  const { mutateAsync: mutateProfile, isLoading } = useUpdateUserProfile({});

  const handleSubmitForm = async (values: EditProfileForm) => {
    await mutateProfile(values);
    onClose();
  };

  useEffect(() => {
    reset({
      jersey: _.get(data, 'jersey', Jersey.DEFAULT1),
      primaryColor: _.get(data, 'primaryColor', '#fff'),
      secondaryColor: _.get(data, 'secondaryColor', '#fff'),
      sponsor: _.get(data, 'sponsor', Sponsor.CYLIMIT_BLACK),
    });
  }, [data]);

  const jersey = watch('jersey');
  const primaryColor = watch('primaryColor');
  const secondaryColor = watch('secondaryColor');
  const sponsor = watch('sponsor');

  return (
    <>
      <BaseModal
        closeable
        title="edit_profile"
        isUseDrawerForMobile
        size="3xl"
        modalContentProps={{
          overflow: 'visible',
        }}
        onClose={() => {
          onClose();
          changeColor('', '');
        }}
        {...rest}
      >
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Box maxWidth="724px" margin="auto">
            <Center>
              <JerseyWithSponsor
                jersey={jersey}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                sponsor={sponsor}
                width="110px"
                height="110px"
              />
            </Center>
            <Flex justifyContent="center" my="30px">
              {_.map(JERSEYS, (item) => (
                <Box
                  key={item.value}
                  cursor="pointer"
                  border="1px solid"
                  borderColor={item.value === jersey ? 'white' : 'transparent'}
                  borderRadius="md"
                  onClick={() => setValue('jersey', item.value)}
                  p="12px"
                  transition="border-color .2s"
                  width="80px"
                  height="80px"
                >
                  <Image src={item.src} width="100%" height="100%" />
                </Box>
              ))}
            </Flex>

            <Flex
              justifyContent="space-between"
              flexDirection={['column', 'column', 'row']}
              gap="10px"
            >
              <Box>
                <Text mb="10px" textTransform="uppercase" textAlign="center">
                  {t('primary_color')}
                </Text>
                <WrapperColorPicker minW={['auto', 'auto', '334px']}>
                  <HexColorPicker
                    style={{ width: '100%' }}
                    color={primaryColor}
                    onChange={(value) => {
                      setValue('primaryColor', value);
                      changeColor(value, getValues('secondaryColor'));
                    }}
                  />
                </WrapperColorPicker>
              </Box>
              <Box>
                <Text mb="10px" textTransform="uppercase" textAlign="center">
                  {t('secondary_color')}
                </Text>
                <WrapperColorPicker minW={['auto', 'auto', '334px']}>
                  <HexColorPicker
                    style={{ width: '100%' }}
                    color={secondaryColor}
                    onChange={(value) => {
                      setValue('secondaryColor', value);
                      changeColor(getValues('primaryColor'), value);
                    }}
                  />
                </WrapperColorPicker>
              </Box>
            </Flex>
            <Box mt={5}>
              <SelectImageInput
                isIgNoreCollapse
                label="SPONSOR"
                value={sponsor}
                options={SPONSORS}
                imageProps={{ width: '100px', height: '40px' }}
                {...register('sponsor')}
              />
            </Box>
            <BaseButton
              display="block"
              mt={10}
              mx="auto"
              isLoading={isLoading}
              size={['sm', 'sm', 'md', 'lg']}
              variant="secondaryLight"
              type="submit"
            >
              {t('save_changes')}
            </BaseButton>
          </Box>
        </form>
      </BaseModal>
    </>
  );
};

const WrapperColorPicker = styled(Box)`
  position: relative;
  height: fit-content;
  padding: 0 14px;

  &:hover {
    & .react-colorful__saturation {
      display: block;
      height: 100px;
    }
    & .react-colorful__saturation-pointer {
      display: block;
    }
  }

  & .react-colorful {
    height: fit-content;
  }

  & .react-colorful__hue {
    border-radius: 20px;
  }

  & .react-colorful__saturation-pointer {
    display: none;
    width: 15px;
    height: 15px;
  }

  & .react-colorful__saturation {
    position: absolute;
    margin-bottom: 0px;
    bottom: 100%;
    left: 0;
    width: 100%;
    height: 0px;
    transition: height 0.2s linear;
    border: 0;
    z-index: 10;
  }
`;

export default EditJerseyModal;
