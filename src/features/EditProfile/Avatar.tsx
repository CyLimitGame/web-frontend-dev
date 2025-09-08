import React, { useEffect, useRef, useState } from 'react';
import { Avatar as ChakraAvatar, Box, Flex, Input } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { Text } from '@/components/Common';
import { useGetUserProfile, useUpdateAvatar } from '@/queries/useUser';
import { BaseButton } from '@/components/Button';
import { useToastMessage } from '@/hooks/useToastMessage';

const Avatar = () => {
  const [avatar, setAvatar] = useState<string | undefined>('');
  const fileRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();
  const toast = useToastMessage();

  const { data } = useGetUserProfile();
  const { mutateAsync: mutateAvatar, isLoading } = useUpdateAvatar();

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileObj = event.target.files ? event.target.files[0] : null;

    const limit = 1048576 * 3;
    if (fileObj && fileObj.size > limit) {
      toast({
        title: t('error'),
        description: t('message:the_size_limit_for_images_and_documents', {
          size: '3.0 MB',
        }),
        status: 'error',
      });
      return;
    }

    if (fileObj) {
      const result = await mutateAvatar(fileObj);
      setAvatar(result.url);
    }
  };

  useEffect(() => {
    setAvatar(data?.avatarUrl);
  }, [data]);

  return (
    <Flex alignItems="center">
      <ChakraAvatar size="xl" src={avatar} />
      <Box ml={6}>
        <Input
          type="file"
          ref={fileRef}
          accept="image/png, image/jpg/, image/jpeg"
          onChange={handleChangeFile}
          display="none"
        />
        <Text
          translateText="your_profile_image"
          fontSize="xl"
          fontWeight="bold"
        />
        <Text translateText="add_your_photo" fontSize="sm" mt={1} />
        <BaseButton
          size="sm"
          colorScheme="primary"
          mt={3}
          onClick={() => fileRef.current?.click()}
          isLoading={isLoading}
        >
          {t('change_image')}
        </BaseButton>
      </Box>
    </Flex>
  );
};

export default Avatar;
